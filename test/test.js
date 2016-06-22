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

const assert = require('assert');
const {
    filestamp,
    contentstamp
} = require('../');
require('colors');

describe('filestamp', () => {
    describe('async', () => {
        it('should return filename after stamped', done => {
            filestamp(`${__dirname}/test.js`, (err, result) => {
                assert.ok(!err);
                console.log(result.filename.green);
                done();
            });
        });
    });
    describe('sync', () => {
        it('should return filename after stamped', () => {
            const result = filestamp.sync(`${__dirname}/test.js`);
            console.log(result.filename.green);
            assert.ok(!!(result && result.filename));
        });
    });
});

describe('contentstamp', () => {
    describe('async', done => {
        it('should return filename after stamped', done => {
            contentstamp('var a=1;', 'logo.png', (err, result) => {
                assert.ok(!err);
                console.log(result.filename.green);
                done();
            });
        });
    });
    describe('sync', () => {
        it('should return filename after stamped', () => {
            const result = contentstamp.sync('var a=1;', 'logo.png');
            console.log(result.filename.green);
            assert.ok(!!(result && result.filename));
        });
    });

});