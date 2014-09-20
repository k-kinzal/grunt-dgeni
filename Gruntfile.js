/*
 * grunt-dgeni
 * https://github.com/k-kinzal/grunt-dgeni
 *
 * Copyright (c) 2014 k-kinzal
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // grunt configuration
  grunt.initConfig({
  });
  // debugging
  grunt.registerTask('test', function() {
  });
  grunt.registerTask('doc', function() {
    grunt.warn('Grunt warning test.');
  });
  grunt.registerTask('fatal', function() {
    grunt.fatal('Grunt fatal test.');
  });
};
