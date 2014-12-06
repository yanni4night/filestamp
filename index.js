/**
 * Copyright (C) 2014 yanni4night.com
 * index.js
 *
 * changelog
 * 2014-07-21[13:28:03]:authorized
 * 2014-07-25[09:23:34]:add ignoreMissing
 * 2014-08-15[22:22:43]:support relative path
 * 2014-08-16[17:28:25]:extend
 * 2014-12-06[01:53:08]:add a cache option
 * 2014-12-06[12:52:45]:define the core compute function,remove 'encoding'
 *
 * @author yanni4night@gmail.com
 * @version 0.1.5
 * @since 0.1.0
 */

'use strict';
var crypto = require('crypto');
var fs = require('fs');
var extend = require('extend');
var sysPath = require('path');

/**
 * Get digest from content.
 *
 * @param  {Mixin} content
 * @param  {String} algorithm
 * @return {String}
 * @since 0.1.5
 */
function getDigest(content, algorithm) {
    var digest = crypto.createHash(algorithm).update(content).digest('hex');
    /*jshint bitwise:false*/
    return (parseInt(digest, 16) % 1e6) | 0;
}

/**
 * Compute the stamp of a file.
 * If cb exists as a function,it will be called.
 *
 * @param  {String} filepath
 * @param  {String}[Optional] algorithm
 * @param  {Function} cb
 * @return {String}
 * @since 0.1.5
 */
function compute(filepath, algorithm, cb) {

    if (2 === arguments.length && 'function' === typeof algorithm) {
        cb = algorithm;
        algorithm = null;
    }

    algorithm = algorithm || 'md5';

    //async mode
    if (cb) {
        return fs.readFile(filepath, function(error, content) {
            if (error) {
                return cb(error);
            }

            try {
                cb(null, getDigest(content, algorithm));
            } catch (e) {
                cb(e);
            }
        });
    }
    //sync mode
    return getDigest(fs.readFileSync(filepath), algorithm);
}

/**
 * Stamp with cache
 *
 * @param {Object} options
 * @since 0.1.0
 */
function Stamper(options) {
    var opt = {
        ignoreMissing: false,
        baseDir: '.',
        cache: true,
        crypto: 'md5' //'md5', 'sha1', 'sha256', 'sha512'
    };

    this.opt = extend(opt, options || {});
    this.stampCache = {};
}

Stamper.compute = compute;

Stamper.prototype = {
    /**
     * Compute the stamp of file.
     * If relative if not specified,the baseDir in options is used.
     *
     * @param  {String} path     The file path to be stamped.
     * @param  {String} relative Relative baseDir.
     * @param  {Function} cb
     * @return {String}         Stamp string if file exists,or else null.
     */
    compute: function(path, relative, cb) {
        var filepath, digest;

        if (2 === arguments.length && 'function' === typeof relative) {
            cb = relative;
            relative = null;
        }

        if ('string' !== typeof relative && !(relative instanceof String)) {
            filepath = sysPath.join(this.opt.baseDir, path);
        } else {
            filepath = sysPath.join(relative, path);
        }

        if (this.opt.cache && this.stampCache[filepath]) {
            if (cb) {
                cb(null, this.stampCache[filepath]);
                return;
            } else {
                return this.stampCache[filepath];
            }
        }

        if (cb) {
            compute(filepath, this.opt.crypto || this.opt.algorithm, function(error, digest) {
                if (digest && this.opt.cache) {
                    this.stampCache[filepath] = digest;
                }
                cb.apply(null, arguments);
            }.bind(this));
            return;
        }

        digest = compute(filepath, this.opt.crypto || this.opt.algorithm);

        if (digest && this.opt.cache) {
            this.stampCache[filepath] = digest;
        }

        return digest;

    }
};

module.exports = Stamper;