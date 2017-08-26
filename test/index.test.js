'use strict';

const supertest = require('supertest');

const app = require('../index');

describe('Give the pmp-fe-api app', () => {
    describe('When it starts', () => {
        it('should work fine', (done) => {
            supertest(app)
                .get('/')
                .expect(200, done);
        });
    });
});