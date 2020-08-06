module.exports = function(gulp, options, plugins) {

	return function (cb) {
		gulp.src('./src/assets/modulePHPform/*.*')
			.pipe(gulp.dest(options.path.build.module));

		cb();
	}

}; 