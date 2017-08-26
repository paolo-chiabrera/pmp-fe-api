'use strict';

const chai = require('chai');

chai.config.includeStack = true;
chai.config.showDiff = true;

global.chai = chai;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.expect = chai.expect;
global.assert = chai.assert;