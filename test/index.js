var path = require('path'),
	fs = require('fs'),
	os = require('os'),
	assert = require('assert'),
	swintAkamaiPurge = require('../lib');

// global.swintVar.printLevel = 5;

describe('Akamai purge', function() {
	this.timeout(20000);
	
	it('Error when no callback', function() {
		assert.throws(function() {
			swintAkamaiPurge({});
		});
	});

	it('Error when dir doesn\'t exist', function(done) {
		swintAkamaiPurge({
			dir: '/this-directory-does-not-exist'
		}, function(err, res) {
			assert.notEqual(err, null);
			done();
		});
	});

	it('Simple case', function(done) {
		var credPath = path.join(process.env.HOME, '.swint', 'swint-akamai-purge-test.json'),
			cred;

		try {
			fs.accessSync(credPath);
			cred = JSON.parse(fs.readFileSync(credPath));
		} catch(e) {
			cred = {
				user: process.env.SWINT_AKAMAI_PURGE_TEST_USER,
				password: process.env.SWINT_AKAMAI_PURGE_TEST_PASSWORD,
				prefix: process.env.SWINT_AKAMAI_PURGE_TEST_PREFIX
			};
		}

		print(cred.user, cred.prefix);

		swintAkamaiPurge({
			dir: path.join(__dirname, '../test_case'),
			urlPrefix: cred.prefix,
			akInfo: {
				user: cred.user,
				password: cred.password
			}
		}, function(err, res) {
			print(err);
			assert.equal(res.httpStatus, 201);
			done();
		});
	});
});
