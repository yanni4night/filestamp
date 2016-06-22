/**
 * Copyright (C) 2016 yanni4night.com
 * test.js
 *
 * changelog
 * 2016-06-16[16:44:40]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
'use strict';

var assert = require('assert');
var t = require('../');
var filestamp = t.filestamp;
var contentstamp = t.contentstamp;

require('colors');

describe('filestamp', function() {
    describe('async', function() {
        it('should return filename after stamped', function(done) {
            filestamp(__dirname + '/test.js', function(err, result) {
                assert.ok(!err);
                console.log(result.filename.green);
                done();
            });
        });
    });
    describe('sync', function() {
        it('should return filename after stamped', function() {
            var result = filestamp.sync(__dirname + '/test.js');
            console.log(result.filename.green);
            assert.ok(!!(result && result.filename));
        });
    });
});

describe('contentstamp', function() {
    describe('async', function(done) {
        it('should return filename after stamped', function(done) {
            contentstamp('var a=1;', 'logo.png', function(err, result) {
                assert.ok(!err);
                console.log(result.filename.green);
                assert.deepEqual(result.filename, '145xwjk.png');
                done();
            });
        });
    });
    describe('sync', function() {
        it('should return filename after stamped', function() {
            var result = contentstamp.sync('var a=1;', 'logo.png');
            console.log(result.filename.green);
            assert.deepEqual(result.filename, '145xwjk.png');
        });
    });

});