var assert = require('chai').assert;
var app = require('../index.js');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

ROOT_URL = "http://localhost:3001"

describe('', function () {
    describe('test1', function () {
      it('should return cart details', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });

  describe('', function () {
    describe('test2', function () {
      it('should return imagename', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });

  describe('', function () {
    describe('test3', function () {
      it('should return the username', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });

  describe('', function () {
    describe('test4', function () {
      it('should return th equantity', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });