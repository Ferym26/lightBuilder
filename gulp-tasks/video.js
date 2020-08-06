module.exports = function(gulp, options, plugins) {

	return function (cb) {
		gulp.src('./src/assets/video/*.*')
			.pipe(gulp.dest(options.path.build.video));

		cb();
	}

}; 