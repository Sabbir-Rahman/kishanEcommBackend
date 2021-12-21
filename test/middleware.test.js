const isLoggedIn = require("../middleware/authMiddleware").isLoggedIn;
const isSuperAdmin = require("../middleware/authMiddleware")
var expect = require('chai').expect;
var assert = require('assert');
var chai = require('chai');
var sinon = require('sinon');
chai.use(require('sinon-chai'));


describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });

    describe('request handler creation', function() {
        var mw;
    
        beforeEach(function() {
          mw = isLoggedIn
        });
    
        it('should accept three arguments', function() {
          expect(mw.length).to.equal(3);
        });
      });

  });

