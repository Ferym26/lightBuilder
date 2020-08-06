module.exports = function(gulp, options, plugins, webpackconfig) {

	// 

	return function (cd) {
		gulp.src([
			'./src/assets/js/main.js'
		])
			.pipe(plugins.plumber())
			.pipe(plugins.webpackStream(webpackconfig))
			.pipe(plugins.plumber.stop())
			// .pipe(gulp.dest('./app/js/'))
			.pipe(plugins.uglify())
			.pipe(plugins.rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('./app/js/'));

		cd();
	}
};