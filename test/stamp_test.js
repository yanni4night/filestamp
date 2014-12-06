'use strict';

var grunt = require('grunt');
var fs = require('fs');
var path = require('path');
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
    normal: function(test) {
        var s = new Stamper();
        var stamp = s.compute('./package.json', './');
        test.ok(!!stamp, 'Stamp should be computed');
        test.done();
    },
    cache: function(test) {
        var s = new Stamper(),
            file = 'test.cache';
        fs.writeFileSync(file, 'mark-1');
        var stamp = s.compute(file);
        fs.writeFileSync(file, 'mark-2');
        test.deepEqual(stamp, s.compute(file), 'Stamp should be cached');
        test.done();
    },
    nocache: function(test) {
        var s = new Stamper({
                cache: false
            }),
            file = 'test.cache';
        fs.writeFileSync(file, 'mark-1');
        var stamp = s.compute(file);
        fs.writeFileSync(file, 'mark-2');
        test.notEqual(stamp, s.compute(file), 'Stamp should not be cached');
        test.done();
    },
    singleCall: function(test) {
        test.expect(2);
        test.ok(!!Stamper.compute('package.json'), 'Stamp should be computed in relative path');
        test.ok(!!Stamper.compute(path.join(__dirname, '..', 'package.json')), 'Stamp should be computed in absolute path');
        test.done();
    },
    missing: function(test) {
        test.expect(1);
        test.deepEqual(null, Stamper.compute(Date.now()), 'should get null if file missing')
        test.done();
    }
};