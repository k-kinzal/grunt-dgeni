/*
 * grunt-dgeni
 * https://github.com/k-kinzal/grunt-dgeni
 *
 * Copyright (c) 2014 k-kinzal
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
  'use strict';
  // grunt configuration
  grunt.initConfig({
	  clean: {
	    server: '.tmp'
	  },
  	watch: {
  		debug: {
  			files: [
          'tasks/*.js',
          'test/*.js',
          'Gruntfile.js'
        ],
  			tasks: ['test']
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
        'test/*.js',
        'Gruntfile.js'
	    ]
	  },
    'jasmine_node': {
      all: ['test/']
    },
	  dgeni: {
	  	options: {
	  		packages: ['dgeni-markdown'],
  			basePath: '.tmp/angular/src/'
	  	},
	  	src: ['**/*.js'],
	  	dest: '.tmp/build/',
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
    grunt.loadNpmTasks('grunt-regarde');
    grunt.renameTask('regarde', 'watch');
    
    grunt.task.run([
      'watch'
    ]);
  });
  grunt.registerTask('dgeni', function() {
    require('./tasks/dgeni')(grunt);
    grunt.task.run([
      'dgeni'
    ]);
  });
  grunt.registerTask('test', function() {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node'); 
    grunt.task.run([
      'jshint',
      'jasmine_node'
    ]);
  });
};
