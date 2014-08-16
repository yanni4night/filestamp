/**
 * Copyright (C) 2014 yanni4night.com
 * Gruntfile.js
 *
 * changelog
 * 2014-07-21[13:42:27]:authorized
 * 2014-08-16[17:29:47]:test alias for default
 *
 * @author yanni4night@gmail.com
 * @version 0.1.1
 * @since 0.1.0
 */
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      js: ['index.js']
    },
    nodeunit: {
      tests: ['test/*_test.js'],
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('test', ['default']);
};