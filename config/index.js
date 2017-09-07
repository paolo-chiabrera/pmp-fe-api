'use strict';

const convict = require('convict');

// Define a schema
const conf = convict({
  cache: {
    duration: {
      doc: 'The cache duration.',
      default: 3600000,
      env: 'PMP_CACHE_DURATION'
    }
  },
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test', 'local'],
    default: 'development',
    env: 'NODE_ENV'
  },
  mongodb: {
    uri: {
      doc: 'The mongoose connection uri.',
      default: '',
      env: 'NODE_PMP_MONGODB_URI'
    }
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  redis: {
    host: {
      doc: 'The redis host.',
      default: 'redis',
      env: 'PMP_REDIS_HOST'
    },
    password: {
      doc: 'The redis password.',
      default: false,
      env: 'PMP_REDIS_PASS'
    }
  },
	trace: {
		doc: 'The flag to enable Trace.',
    default: false,
    env: 'NODE_TRACE'
	},
  winston: {
    file: {
      filename: {
        doc: 'The log filename.',
        default: '/logs/pmp_fe_api.log',
        env: 'NODE_WINSTON_FILENAME'
      }
    }
  }
});

// Load environment dependent configuration
const env = conf.get('env');
conf.loadFile('./config/' + env + '.json');

// Perform validation
conf.validate({
  strict: true
});

module.exports = conf;