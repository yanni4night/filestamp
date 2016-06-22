# filestamp

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

Timestamp filename.

```js
import {filestamp, contentstamp} from 'filestamp';

filestamp('./img/logo.png', (err, result) => {
    result//{filename: logo_e65c0a.png}
});

filestamp.sync('./img/logo.png');

contentstamp('var a=1;', 'log0.png', (err, result) => {
    result//{filename: logo_e65c0a.png}
});

contentstamp.sync('var a=1;', 'log0.png');

```

[npm-url]: https://npmjs.org/package/filestamp
[downloads-image]: http://img.shields.io/npm/dm/filestamp.svg
[npm-image]: http://img.shields.io/npm/v/filestamp.svg
[david-dm-url]:https://david-dm.org/yanni4night/filestamp
[david-dm-image]:https://david-dm.org/yanni4night/filestamp.svg
[david-dm-dev-url]:https://david-dm.org/yanni4night/filestamp#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/yanni4night/filestamp/dev-status.svg