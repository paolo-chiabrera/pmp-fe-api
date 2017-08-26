module.exports = {
  'apps' : [{
    'name': 'pmp-fe-api-3000',
    'script'    : 'index.js',
    'instances' : 1,
    'exec_mode' : 'fork',
    'env': {
      'PORT': 3000
    }
  },{
    'name': 'pmp-fe-api-3001',
    'script'    : 'index.js',
    'instances' : 1,
    'exec_mode' : 'fork',
    'env': {
      'PORT': 3001
    }
  }]
};
