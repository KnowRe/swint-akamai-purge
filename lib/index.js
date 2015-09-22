'use strict';

var path = require('path'),
	swintHelper = require('swint-helper'),
	fs = require('fs'),
	akamai = require('akamai'),
	defaultize = swintHelper.defaultize,
	walk = swintHelper.walk;

module.exports = function(options, callback) {
	defaultize({
		urlPrefix: 'http://www.example.com',
		dir: path.join(path.dirname(require.main.filename), '../out'),
		walkOption: {},
		akInfo: {
			user: 'user',
			password: 'password'
		}
	}, options);

	return proceed(options, callback);
};

var proceed = function(options, callback) {
	if(callback === undefined) {
		var msg = 'swint-akamai-purge function needs callback';
		print(4, msg);
		throw new Error(msg);
	}

	if(!fs.existsSync(options.dir)) {
		callback('swint-akamai-purge: dir doesn\'t exist', false);
		return;
	}

	options.walkOption.dir = options.dir;

	var files = walk(options.walkOption);

	akamai.purge(
		options.akInfo.user,
		options.akInfo.password,
		files.map(function(p) {
			return options.urlPrefix + p.replace(options.dir, '').replace(/\\/g, '/');
		})
	).then(function(response) {
		callback(null, response);
	}).catch(function(err) {
		print(4, err);
		callback(err, false);
	});
};
