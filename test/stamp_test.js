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
        //sync
        var stamp = s.compute('./package.json', './');
        test.ok(!!stamp, 'Stamp should be computed');
        //async
        s.compute('package.json', function(err, digest) {
            test.deepEqual(digest, stamp, 'Stamp should get the same under async mode');
            test.done();
        });
    },
    cache: function(test) {
        var s = new Stamper(),
            file = 'test.cache';
        fs.writeFileSync(file, 'mark-1');
        var stamp = s.compute(file);
        fs.writeFileSync(file, 'mark-2');
        test.deepEqual(stamp, s.compute(file), 'Stamp should be same even changed bacause of caching');
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
        var ps;
        test.ok(!!(ps = Stamper.compute('package.json', 'sha1')), 'Stamp should be computed in relative path');

        test.deepEqual(ps, Stamper.compute(path.join(__dirname, '..', 'package.json'), 'sha1'), 'Stamp should be computed in absolute path');

        Stamper.compute('package.json', 'sha1', function(err, digest) {
            test.deepEqual(ps, digest, 'should computed in async mode');
            test.done();
        });

    },
    error: function(test) {
        test.expect(1);
        test.throws(function() {
            Stamper.compute(Date.now())
        }, 'should throw error if file missing or something error occured')
        test.done();
    },
    ignoreError: function(test) {
        var s = new Stamper({
            ignoreError: true
        });
        test.doesNotThrow(function() {
            test.deepEqual(null, s.compute(Date.now()), 'Stamp could be null if error ignored');
        },'No error throwing if error ignored');

        test.done();
    }
};