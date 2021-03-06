/*
 * grunt-dgeni
 * https://github.com/k-kinzal/grunt-dgeni
 *
 * Copyright (c) 2014 k-kinzal
 * Licensed under the MIT license.
 */

'use strict';

var Dgeni = require('dgeni');
var Package = require('dgeni').Package;
var path = require('path');

// exports
module.exports = function (grunt) {

	var _ = grunt.util._;

	function createPackage(config) {

		// initialize
		var options = config.options || {};
		// create package
		var packages = [];
		(options.packages || []).forEach(function(packageName) {
			packages.push(require(packageName));
		});
		var p = new Package('grunt-dgeni', packages.length ? packages : [require('dgeni-markdown')]);
		// setting processor configuration
		_.forEach(options, function(parameters, serviceName) {
			if (serviceName === 'packages' || serviceName === 'basePath') {
				return;
			}
			_.forEach(parameters, function(value, paramName) {
				/*jslint evil: true */
				p.config(new Function(serviceName, serviceName+'.'+paramName+'='+JSON.stringify(value)+';'));
			});
		});
		// setting readFilesProcessor configuration
		config.src && p.config(function(readFilesProcessor) {
			if (!_.isArray(config.src)) {
				config.src = [config.src];
			}
			readFilesProcessor.basePath = path.resolve(options.basePath);
			readFilesProcessor.sourceFiles = [];
			config.src.forEach(function(sourceInfo) {
				if (_.isString(sourceInfo)) {
					sourceInfo = {
						include: sourceInfo,
					};
				}

				readFilesProcessor.sourceFiles.push(sourceInfo);
			});
		});
		// setting writeFilesProcessor configuration
		config.dest && p.config(function(writeFilesProcessor) {
			writeFilesProcessor.outputFolder = path.resolve(config.dest);
		});

		return p;
	}

	// register task
  grunt.registerTask('dgeni', 'generate markdown document by dgeni.', function () {
  	var p = createPackage(grunt.config('dgeni') || {});

	  var done = this.async();
	  var dgeni = new Dgeni([p]);
	  dgeni.generate().then(done);
  });

};