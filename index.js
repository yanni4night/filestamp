/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-06-16[16:08:31]:revised
 * 2016-06-16[20:01:46]:replace 62 radix to 36
 *
 * @author yanni4night@gmail.com
 * @version 1.1.0
 * @since 1.0.0
 */
'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var getDigest = function(content) {
    var digest = crypto.createHash('md5').update(content).digest('hex');
    return (parseInt(digest, 16) % 1e10).toString(36);
};

var rename = function(filename, stamp) {
    var ext = path.extname(filename);
    return stamp + ext;
};

var filestamp = exports.filestamp = function(filename, cb) {
    fs.readFile(filename, 'utf-8', function(err, content) {
        if (err) {
            cb(err);
        } else {
            var stamp = getDigest(content);
            cb(null, {
                filename: rename(filename, stamp)
            });
        }
    });
};

filestamp.sync = function(filename) {
    var content = fs.readFileSync(filename, 'utf-8');
    var stamp = getDigest(content);
    return {
        filename: rename(filename, stamp)
    };
};

var contentstamp = exports.contentstamp = function(content, filename, cb) {
    var stamp = getDigest(content);
    cb(null, {
        filename: rename(filename, stamp)
    });
};

contentstamp.sync = function(content, filename) {
    var stamp = getDigest(content);
    return {
        filename: rename(filename, stamp)
    };
};