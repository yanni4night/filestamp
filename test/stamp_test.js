'use strict';

var grunt = require('grunt');
var Stamper = require('../index');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.stamp = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    js: function(test) {
        var s = new Stamper();
        var stamp = s.compute('./package.json');
        grunt.log.ok(stamp);
        test.ok(!!stamp, 'Stamp computed');
        test.done();
    }
};