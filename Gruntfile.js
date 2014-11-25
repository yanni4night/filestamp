/**
 * Copyright (C) 2014 yanni4night.com
 * Gruntfile.js
 *
 * changelog
 * 2014-07-21[13:42:27]:authorized
 * 2014-08-16[17:29:47]:test alias for default
 * 2014-11-25[16:55:04]:simplify loading grunt tasks
 *
 * @author yanni4night@gmail.com
 * @version 0.1.2
 * @since 0.1.0
 */
module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      js: ['index.js']
    },
    nodeunit: {
      tests: ['test/*_test.js'],
    },
    coveralls: {
      all: {
        src: 'coverage/lcov.info'
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('test', ['default']);
};