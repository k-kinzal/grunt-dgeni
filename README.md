# grunt-dgeni

[![Build Status](https://travis-ci.org/k-kinzal/grunt-dgeni.svg)](https://travis-ci.org/k-kinzal/grunt-dgeni)
[![Dependency Status](https://david-dm.org/k-kinzal/grunt-dgeni.svg)](https://david-dm.org/k-kinzal/grunt-dgeni)
[![devDependency Status](https://david-dm.org/k-kinzal/grunt-dgeni/dev-status.svg)](https://david-dm.org/k-kinzal/grunt-dgeni#info=devDependencies)

> generating documentation for grunt task

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dgeni --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dgeni');
```

## The "dgeni" task

### Overview
In your project's Gruntfile, add a section named `dgeni` to the data object passed into `grunt.initConfig()`.

#### Simple config

```js
grunt.initConfig({
  dgeni: {
    options: {
    	// Specify the base path used when resolving relative paths to source files
      basePath: '/path/to'
    },
    // Process all js files in `src` and its subfolders ...
    src: ['src/*.js'],
    // Specify where write our generated doc files directory
    dest: '/path/to'
  },
})
```

Simple config becomes a minimum setup using Dgeni. 
A document is outputted to the directory which used the dgeni-markdown package and specified the file specified as ````src```` by ````dest````. 

#### Advance config

```js
grunt.initConfig({
	dgeni: {
		options: {
			readFilesProcessor: {
				// Specify the base path used when resolving relative paths to source files
				basePath: '/path/to',
				sourceFiles: [{
					// Process all js files in `src` and its subfolders ...
					include: '*.js',
					basePath: 'src'
				}],
			},
			writeFilesProcessor: {
				// Specify where write our generated doc files directory
				outputFolder: '/path/to',
			}
		}
	}
})
```

Advance config carries out the override of the processor of Dgeni. 
Please check dgeni-packages about processor which can be specified. 

#### Load config file

```js
grunt.initConfig({
	dgeni: {
		options: {
			packages: [path.resolve('./test/config/dgeni.config')],
		}
	}
})
```
A package can be specified. 
Please specify the path or reading module name to a configuration file of a package. 

### Options

#### options.packages
Type: `Array`
Default value: `undefined`

A array string value that is used to path or reading module name.

Example: 

```js
grunt.initConfig({
	dgeni: {
		options: {
			...
			packages: [path.resolve('./node_modules/grunt-dgeni/node_modules/dgeni-packages/ngdoc')],
		}
	}
})
```

#### options.basePath
Type: `String`
Default value: `undefined`

Specify the base path used when resolving relative paths to source files.

#### src
Type: `String` or `Array`
Default value: `undefined`

Process all js files in `src` and its subfolders ...

#### dest
Type: `String`
Default value: `undefined`

Specify where write our generated doc files directory

## License
Copyright (c) 2014 k-kinzal. Licensed under the MIT license.

