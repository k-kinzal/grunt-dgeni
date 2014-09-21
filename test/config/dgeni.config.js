var Package = require('dgeni').Package;
module.exports = new Package('test-package', [
	require('dgeni-packages/ngdoc')
]);