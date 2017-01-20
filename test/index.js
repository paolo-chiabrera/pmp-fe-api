'use strict';

const Lab = require('lab');
const expect = require('code').expect;

const server = require('../index');

const lab = exports.lab = Lab.script();

lab.experiment('pmp-manager', () => {

  lab.test('server should be exposed', (done) => {
    expect(server).to.be.an.object();
    done();
  });
});
