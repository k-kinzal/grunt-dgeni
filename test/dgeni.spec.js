var path = require('path');

describe('Grunt task:', function() {
	'use strict';
  
  describe('empty configuration', function() {
		it('nothing happens', function(done) {
			runTask({}, function() {
				done();
			});
		});
  });

  describe('empty dgeni configuration', function() {
		it('nothing happens', function(done) {
			runTask({dgeni: {}}, function() {
				done();
			});
		});
  });

  describe('simple configuration', function() {
		it('should be set a readFilesProcessor.basePath', function() {
			var config = {
				dgeni: {
					options: {
						basePath: '/path/to/basePath'
					},
					src: ['/path/to/file']
				}
			};
			runTask(config, function(readFilesProcessor) {
				expect(readFilesProcessor.basePath).toBe(config.dgeni.options.basePath);
			});
			
		});

		it('should be set a readFilesProcessor.basePath from relative path', function() {
			var config = {
				dgeni: {
					options: {
						basePath: '.'
					},
					src: ['/path/to/file']
				}
			};
			runTask(config, function(readFilesProcessor) {
				expect(readFilesProcessor.basePath).toBe(path.resolve(config.dgeni.options.basePath));
			});
			
		});

		it('should be set a readFilesProcessor.sourceFiles from string', function() {
			var config = {
				dgeni: {
					options: {
						basePath: '.'
					},
					src: '/path/to/file'
				}
			};
			runTask(config, function(readFilesProcessor) {
				expect(readFilesProcessor.sourceFiles).toEqual([
					{
						include: config.dgeni.src
					}
				]);
			});
			
		});

		it('should be set a readFilesProcessor.sourceFiles from array string', function() {
			var config = {
				dgeni: {
					options: {
						basePath: '.'
					},
					src: ['/path/to/file1', '/path/to/file2']
				}
			};
			runTask(config, function(readFilesProcessor) {
				expect(readFilesProcessor.sourceFiles).toEqual([
					{
						include: config.dgeni.src[0]
					},
					{
						include: config.dgeni.src[1]
					}
				]);
			});
			
		});

		it('should be set a readFilesProcessor.sourceFiles from object', function() {
			var config = {
				dgeni: {
					options: {
						basePath: '.'
					},
					src: {
						include: '/path/to/file',
						basePath: '/path/to'
					}
				}
			};
			runTask(config, function(readFilesProcessor) {
				expect(readFilesProcessor.sourceFiles).toEqual([config.dgeni.src]);
			});
			
		});

		it('should be set a readFilesProcessor.sourceFiles from array object', function() {
			var config = {
				dgeni: {
					options: {
						basePath: '.'
					},
					src: [{
						include: '/path/to/file',
						basePath: '/path/to'
					}]
				}
			};
			runTask(config, function(readFilesProcessor) {
				expect(readFilesProcessor.sourceFiles).toEqual(config.dgeni.src);
			});
			
		});

		it('should be set a writeFilesProcessor.outputFolder', function() {
			var config = {
				dgeni: {
					dest: '/path/to'
				}
			};
			runTask(config, function(writeFilesProcessor) {
				expect(writeFilesProcessor.outputFolder).toEqual(config.dgeni.dest);
			});
			
		});

		it('should be set a writeFilesProcessor.outputFolder from relative path', function() {
			var config = {
				dgeni: {
					dest: '.'
				}
			};
			runTask(config, function(writeFilesProcessor) {
				expect(writeFilesProcessor.outputFolder).toEqual(path.resolve(config.dgeni.dest));
			});
			
		});

		it('should throw error if not set a basePath', function() {
			var config = {
				dgeni: {
					options: {

					},
					src: ['/path/to/file']
				}
			};
			expect(function() {
				runTask(config, function() {});
			}).toThrow();
		});

  });

  describe('advance configuration', function() {
		it('should be set readFilesProcessor', function() {
			var config = {
				dgeni: {
					options: {
						readFilesProcessor: {
							basePath: '.',
							sourceFiles: [{
								include: '/path/to/file',
								basePath: '/path/to'
							}],
							originalProperty: 1
						}
					}
				}
			};
			runTask(config, function(readFilesProcessor) {
				expect(readFilesProcessor.basePath).toBe(config.dgeni.options.readFilesProcessor.basePath);
				expect(readFilesProcessor.sourceFiles).toEqual(config.dgeni.options.readFilesProcessor.sourceFiles);
				expect(readFilesProcessor.originalProperty).toBe(config.dgeni.options.readFilesProcessor.originalProperty);
			});
		});

		it('should be set writeFilesProcessor', function() {
			var config = {
				dgeni: {
					options: {
						writeFilesProcessor: {
							outputFolder: '/path/to',
							originalProperty: 1
						}
					}
				}
			};
			runTask(config, function(writeFilesProcessor) {
				expect(writeFilesProcessor.outputFolder).toBe(config.dgeni.options.writeFilesProcessor.outputFolder);
				expect(writeFilesProcessor.originalProperty).toBe(config.dgeni.options.writeFilesProcessor.originalProperty);
			});
		});

  });

  describe('use package', function() {
		it('should be set dependencies', function() {
			var config = {
				dgeni: {
					options: {
						packages: ['dgeni-markdown'],
						basePath: '/path/to'
					},
					src: '/path/to/file',
					dest: '/path/to'
				}
			};
			runTask(config, function(readFilesProcessor) {
				expect(_package.dependencies[0]).toEqual(require(config.dgeni.options.packages[0]));
			});
		});

  });

  describe('use configuration file', function() {
		it('should be set dependencies', function() {
			var config = {
				dgeni: {
					options: {
						packages: [path.resolve('./test/config/dgeni.config')],
						basePath: '/path/to'
					},
					src: '/path/to/file',
					dest: '/path/to'
				}
			};
			runTask(config, function(readFilesProcessor) {
				expect(_package.dependencies[0]).toEqual(require(config.dgeni.options.packages[0]));
			});
		});
  });

	// create test double for dgeni, and get packages.
	var _dgeni, _packages, _package, _DgeniMock;
  beforeEach(function () {
  	var Dgeni = require('dgeni');
		_DgeniMock = function(packages) {
			_dgeni = this;
			_packages = packages;
			_package = packages[0];

			Dgeni.apply(this, [packages]);
		};
		_DgeniMock.Package = Dgeni.Package;
		_DgeniMock.prototype = Dgeni.prototype;
		_DgeniMock.prototype.generate = function() {
			return {
				then: function() {}
			};
		};
	});
  // create test double for grunt
  var _grunt;
  beforeEach(function () {
  	_grunt = require('grunt');
  	_grunt.registerTask = function(name, description, callback) {
  		callback.apply({async: function() {}}, []);
  	};
  });
  // create dgeni task
  var _task;
  beforeEach(function() {
  	var proxyquire = require('proxyquire');
  	_task = proxyquire('../tasks/dgeni', {'dgeni': _DgeniMock});
  });
  // run task
  function runTask(config, configFn) {
  	_grunt.initConfig(config);
		_task(_grunt);
		_package.config(configFn);
		_dgeni.configureInjector();
  }

});