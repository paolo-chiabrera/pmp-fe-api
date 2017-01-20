'user strict';

const Lab = require('lab');
const expect = require('code').expect;

const lab = exports.lab = Lab.script();

const methods = require('../../../plugins/image/image.method');

lab.experiment('image.method', () => {

  lab.test('it should be an obejct', (done) => {
    expect(methods).to.be.an.object();
    done();
  });

  lab.experiment('getPage', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.getPage).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.getPage({
        page: 1,
        limit: 20
      });

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });
});
