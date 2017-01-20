'use strict';

const convict = require('convict');

// Define a schema
const conf = convict({
  app: {
    name: {
      doc: 'The applicaton name.',
      default: 'pmp-fe-api',
      env: 'NODE_APP_NAME'
    }
  },
  bleep: {
    showStart: {
      doc: 'The bleep showStart.',
      default: true
    }
  },
  cache: {
    engine: {
      doc: 'The cache engine.',
      format: ['catbox-redis', 'catbox-memory'],
      default: 'catbox-redis'
    },
    shared: {
      doc: 'The cache shared.',
      default: true
    },
    host: {
      doc: 'The cache host.',
      default: '127.0.0.1',
      env: 'PMP_REDIS_1_PORT_6379_TCP_ADDR'
    },
    password: {
      doc: 'The cache password.',
      default: false,
      env: 'PMP_REDIS_ENV_REDIS_PASS'
    }
  },
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test', 'local'],
    default: 'development',
    env: 'NODE_ENV'
  },
  host: {
    doc: 'The applicaton host.',
    default: 'localhost',
    env: 'VIRTUAL_HOST'
  },
  mongoose: {
    connection_uri: {
      doc: 'The mongoose connection uri.',
      default: '',
      env: 'NODE_PMP_MONGODB_URI'
    },
    options: {
      server: {
        socketOptions: {
          keepAlive: {
            doc: 'The mongoose server socketOptions keepAlive.',
            default: 1
          },
          connectTimeoutMS: {
            doc: 'The mongoose server socketOptions connectTimeoutMS.',
            default: 60000
          }
        }
      },
      replset: {
        socketOptions: {
          keepAlive: {
            doc: 'The mongoose replset socketOptions keepAlive.',
            default: 1
          },
          connectTimeoutMS: {
            doc: 'The mongoose replset socketOptions connectTimeoutMS.',
            default: 60000
          }
        }
      }
    }
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'NODE_PORT'
  },
  squeeze: {
    args: {
      doc: 'The squeeze args.',
      default: [{
        error: '*',
        log: '*',
        ops: '*',
        response: '*'
      }]
    }
  },
	trace: {
		doc: 'The flag ro enable Trace.',
    default: false,
    env: 'NODE_TRACE'
	},
  winston: {
    file: {
      filename: {
        doc: 'The log filename.',
        default: './logs/pmp_fe_api.log',
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
