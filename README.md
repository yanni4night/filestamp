filestamp
=========

compute the stamp of a file


usage
=========
    var Stamper = require('filestamp');
    var stamper = new Stamper({encoding:'utf-8',crypto:'md5',baseDir:'.'});
    console.log(stamper.compute('./package.json',"./"));
