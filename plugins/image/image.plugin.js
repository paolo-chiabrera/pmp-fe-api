'use strict';

const _ = require('lodash');

const routes = require('./image.route');

const methods = require('./image.method');

exports.register = function (server, options, next) {

  server.method({
    name: 'getPage',
    method: (args, next) => {
      methods.getPage(args)
      .then(res => next(null, res))
      .catch(next);
    },
    options: {
      cache: {
        cache: 'mainCache',
        expiresIn: 60 * 60 * 1000,
        generateTimeout: 10000
      },
      generateKey: function (args) {
				return 'page_' + args.pageNum + '_' + args.pageSize;
			}
    }
  });

  // add all the routes exposed by the plugin
  _.each(routes, route => server.route(route));

  next();
};

exports.register.attributes = {
  name: 'pmp-image-api'
};
