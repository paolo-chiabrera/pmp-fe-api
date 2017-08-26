'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const restify = require('restify');
const morgan = require('morgan');
const pckg = require('./package');
const config  = require('./config').get();

/*
* define logger
*/
const winston = require('winston');
const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      colorize: true
    })
  ]
});

if (config.env !== 'test') {
  logger.add(winston.transports.File, {
    filename: config.winston.file.filename,
    logstash: true,
    maxFiles: 10,
    maxsize: 2 * 1024 * 1024,
    tailable: true,
    zippedArchive: false
  });
}

/*
* define cache
*/
const redis = require('redis');
let redisClient = null;

if (config.env !== 'test') {
    redisClient = redis.createClient({
        host: config.redis.host,
        password: config.redis.password
    });
}


const apicache = require('apicache');
const cache = apicache.options({
    redisClient
}).middleware;

const {
    getImage,
    getPage
} = require('./handlers');

const appInfo = {
    name: pckg.name,
    version: pckg.version
};

/*
* create server
*/
const bunyanWinstonAdapter = require('bunyan-winston-adapter');
const log = bunyanWinstonAdapter.createAdapter(logger);

const server = restify.createServer({
    name: pckg.name,
    version: pckg.version,
    log
});

/*
* use plugins
*/
const { plugins } = restify;

server.pre(restify.pre.sanitizePath());

server.use(plugins.jsonBodyParser({ mapParams: true }));
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser({ mapParams: true }));
server.use(plugins.fullResponse());
server.use(morgan('short'));

/*
* define routes
*/
server.get('/', (req, res, next) => {
    res.json(appInfo);
    next();
});

server.get('/pages/:page', cache(config.cache.duration), getPage);
server.get('/images/:filename', cache(config.cache.duration), getImage);

/*
* start server
*/
server.listen(config.port, () => {
    const connection = mongoose.connect(config.mongodb.uri, {
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30,
        useMongoClient: true
    });

    const gracefulExit = function() { 
        connection.close(() => {
            logger.warn('mongoose.close');
            process.exit(0);
        });
    }

    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

    connection.on('error', (err) => {
        logger.error('mongoose.error', err);
    });

    connection.on('disconnected', () => {
        logger.warn('mongoose.disconnected');
    });

    connection
        .then(() => {
            logger.info(config);
        })
        .catch((err) => {
            logger.error('mongoose.connect', err);
            process.exit(1);
        });
});

module.exports = server;