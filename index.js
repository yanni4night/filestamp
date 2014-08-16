/**
 * Copyright (C) 2014 yanni4night.com
 * index.js
 *
 * changelog
 * 2014-07-21[13:28:03]:authorized
 * 2014-07-25[09:23:34]:add ignoreMissing
 * 2014-08-15[22:22:43]:support relative path
 * 2014-08-16[17:28:25]:extend
 *
 * @author yanni4night@gmail.com
 * @version 0.1.3
 * @since 0.1.0
 */
/*jslint node: true */
'use strict';
var crypto = require('crypto');
var fs = require('fs');
var extend = require('extend');
var sysPath = require('path');

/**
 * Stamp with cache
 * 
 * @param {Object} options
 * @since 0.1.0
 */
function Stamper(options) {
    var opt = {
        encoding: 'utf-8',
        ignoreMissing: false,
        baseDir: '.',
        crypto: 'md5' //'md5', 'sha1', 'sha256', 'sha512'
    };

    this.opt = extend(opt,options||{});
    this.stampCache = {};
}

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
        var filepath, content, md5;
        
        try {
            
            if ('string' !== typeof relative && !(relative instanceof String)) {
                filepath = sysPath.join(this.opt.baseDir, path);
            } else {
                filepath = sysPath.join(relative, path);
            }

            if (this.stampCache[filepath]) {
                return this.stampCache[filepath];
            }

            content = fs.readFileSync(filepath, {
                encoding: this.opt.encoding
            });

            md5 = crypto.createHash(this.opt.crypto).update(content).digest('hex');
            md5 = (parseInt(md5, 16) % 1e6) | 0;
            
            this.stampCache[filepath] = md5;
            
            return md5;
        } catch (e) {
            if (!this.opt.ignoreMissing) {
                console.warn(e);
            }
            return null;
        }
    }
};

module.exports = Stamper;