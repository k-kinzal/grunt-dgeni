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
	  clean: {
	    server: '.tmp'
	  },
  	watch: {
  		debug: {
  			files: ['tasks/*.js'],
  			tasks: ['jshint', 'dgeni']
  		}
  	},
    shell: {
      gitclone: {
        command: 'git clone https://github.com/angular/angular.js.git .tmp/angular/'
      }
    },
	  jshint: {
	    options: {
	      jshintrc: '.jshintrc',
	      force: true,
		    reporter: require('jshint-stylish')
	    },
	    all: [
	      'tasks/*.js',
	    ]
	  },
	  dgeni: {
	  	options: {
	  		packages: [
	  			require('dgeni-markdown')
	  		],	
	  	},
	  	src: ['.tmp/angular/src/**.js'],
	  	build: '.tmp/build/',
	  }
  });
  // tasks
  grunt.registerTask('init', function() {
  	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.task.run([
      'clean',
      'shell:gitclone'
    ]);
  });
  grunt.registerTask('debug', function() {
    require('./tasks/dgeni')(grunt);
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.renameTask('regarde', 'watch');
    
    grunt.task.run([
      'watch'
    ]);
  });
  grunt.registerTask('test', function() {
  });
};
