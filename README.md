filestamp
=========
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Build status][appveyor-image]][appveyor-url] [![Dependency status][david-dm-image]][david-dm-url] [![De vDependency status][david-dm-dev-image]][david-dm-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Built with Grunt][grunt-image]][grunt-url]

Compute the stamp of a file by md5/sha1/sha256/sha512.


usage
=========
    var Stamper = require('filestamp');
    var stamper = new Stamper({encoding:'utf-8',crypto:'md5',baseDir:'.'});
    console.log(stamper.compute('./package.json',"./"));

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