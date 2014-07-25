/**
 * Copyright (C) 2014 yanni4night.com
 * index.js
 *
 * changelog
 * 2014-07-21[13:28:03]:authorized
 * 2014-07-25[09:23:34]:add ignoreMissing
 *
 * @author yanni4night@gmail.com
 * @version 0.1.1
 * @since 0.1.0
 */
/*jslint node: true */
'use strict';
var crypto = require('crypto');
var fs = require('fs');
var sysPath = require('path');

var native_ownprop = ({}).hasOwnProperty;

function Stamper(options) {
    var opt = {
        encoding: 'utf-8',
        ignoreMissing: false,
        baseDir: '.',
        crypto: 'md5' //'md5', 'sha1', 'sha256', 'sha512'
    };

    if (options) {
        for (var e in options) {
            if (native_ownprop.call(options, e)) {
                opt[e] = options[e];
            }
        }
    }

    this.opt = opt;
    this.stampCache = {};
}

Stamper.prototype = {
    compute: function(path) {
        if (this.stampCache[path]) {
            return this.stampCache[path];
        }
        try {
            var content = fs.readFileSync(sysPath.join(this.opt.baseDir, path), {
                encoding: this.opt.encoding
            });
            var md5 = crypto.createHash(this.opt.crypto).update(content).digest('hex');
            md5 = (parseInt(md5, 16) % 1e6) | 0;
            this.stampCache[path] = md5;
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