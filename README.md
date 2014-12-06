filestamp
=========
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Build status][appveyor-image]][appveyor-url] [![Dependency status][david-dm-image]][david-dm-url] [![De vDependency status][david-dm-dev-image]][david-dm-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Built with Grunt][grunt-image]][grunt-url]

Compute the stamp of a file by md5/sha1/sha256/sha512.


usage
=========
    
    //Create a stamper object
    var Stamper = require('filestamp');
    var stamper = new Stamper({crypto:'md5', baseDir:'.'});
    stamper.compute('./package.json');
    stamper.compute('./stamp_test.js',"./test");
    //Or call compute directly
    Stamper.compute('./package.json','sha1');
    
    //Or under async mode
    stamper.compute('./package.json',[relative,]function(err, digest){})
    Stamper.compute('./package.json',[relative,]function(err, digest){})

options
=========
######baseDir: '.'
File path are relative to if no relative argument exist.

######ignoreError: false

If set to true,no error will be throwed under sync mode.

######cache: true

If cache the digest,which make returning same value calling on a filepath again.

######crypto: 'md5' 
'md5', 'sha1', 'sha256', 'sha512'

######algorithm: 'md5' 

Alias for `crypto`.

[npm-url]: https://npmjs.org/package/filestamp
[downloads-image]: http://img.shields.io/npm/dm/filestamp.svg
[npm-image]: http://img.shields.io/npm/v/filestamp.svg
[travis-url]: https://travis-ci.org/yanni4night/filestamp
[travis-image]: http://img.shields.io/travis/yanni4night/filestamp.svg
[appveyor-image]:https://ci.appveyor.com/api/projects/status/bsu9w9ar8pboc2nj?svg=true
[appveyor-url]:https://ci.appveyor.com/project/yanni4night/filestamp
[david-dm-url]:https://david-dm.org/yanni4night/filestamp
[david-dm-image]:https://david-dm.org/yanni4night/filestamp.svg
[david-dm-dev-url]:https://david-dm.org/yanni4night/filestamp#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/yanni4night/filestamp/dev-status.svg
[coveralls-url]:https://coveralls.io/r/yanni4night/filestamp?branch=master
[coveralls-image]:https://coveralls.io/repos/yanni4night/filestamp/badge.png?branch=master
[grunt-url]:http://gruntjs.com/
[grunt-image]: https://cdn.gruntjs.com/builtwith.png