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
 * Compute the stamp of a file.
 * @param  {String} filepath
 * @param  {String} algorithm
 * @return {String}
 */
function compute(filepath, algorithm) {
    var md5, content = fs.readFileSync(filepath);

    md5 = crypto.createHash(algorithm || 'md5').update(content).digest('hex');
    /*jshint bitwise:false*/
    return (parseInt(md5, 16) % 1e6) | 0;
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
     * @return {String}         Stamp string if file exists,or else null.
     */
    compute: function(path, relative) {
        var filepath, md5;

        try {

            if ('string' !== typeof relative && !(relative instanceof String)) {
                filepath = sysPath.join(this.opt.baseDir, path);
            } else {
                filepath = sysPath.join(relative, path);
            }

            if (this.opt.cache && this.stampCache[filepath]) {
                return this.stampCache[filepath];
            }

            md5 = compute(filepath);

            if (this.opt.cache) {
                this.stampCache[filepath] = md5;
            }

            return md5;
        } catch (e) {
            return null;
        }
    }
};

module.exports = Stamper;