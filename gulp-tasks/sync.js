module.exports = function(gulp, options, plugins) {

	return function (cb) {
		plugins.browserSync(options.serverConfig);

		cb();
	}

}; 