'use strict';

const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

exports.register = function (server, options, next) {
	const connectionDB = mongoose.connect(options.connection_uri, options.options);

	const dbName = options.connection_uri.split('/').reverse()[0];

	server.log(['info', 'mongoose'], 'connecting to: ' + dbName);

	function _teardown() {
		connectionDB.disconnect();
	}

	process.on('SIGINT', _teardown);

	server.on('stop', _teardown);

	connectionDB.connection.on('connected', () => {
		server.log(['info', 'mongoose'], 'connected to: ' + dbName);
		next();
	});

	connectionDB.connection.on('error', err => {
		server.log(['error', 'mongoose'], {
			error: err
		});
		next(err);
	});

	connectionDB.connection.on('disconnected', () => {
		server.log(['error', 'mongoose'], 'disconnected from: ' + dbName);
	});
};

exports.register.attributes = {
	name: 'mongoose'
};
