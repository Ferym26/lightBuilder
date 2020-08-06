module.exports = function (gulp, options, plugins) {
	
	// Копирует шрифты
	
	return function (cb) {
		gulp.src(options.path.src.fonts)
			.pipe(plugins.changed(options.path.build.fonts))
			.pipe(gulp.dest(options.path.build.fonts));

		cb();
	};
};
