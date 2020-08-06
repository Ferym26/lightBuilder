module.exports = function (gulp, options, plugins) {

	return function (cb) {

		const imagesPath = [
			'./src/blocks/**/*.{png,jpg,jpeg,gif,ico,svg,webp}',
			'./src/partials/**/*.{png,jpg,jpeg,gif,ico,svg,webp}',
			'./src/mixins/**/*.{png,jpg,jpeg,gif,ico,svg,webp}',
			'./src/assets/images/**/*.{png,jpg,jpeg,gif,ico,svg,webp}'
		];

		// STYLES
		gulp.watch([
				options.path.watch.sass, 
				'!src/assets/css/critical/critical.scss',
				'!src/assets/css/common/_bootstrap-opts.sass',
				'!src/assets/css/common/_settings.scss',
			], gulp.series(gulp.parallel('sass-styles')))
		
		gulp.watch(['./src/**/_bootstrap-opts.{scss,sass}', './src/**/_settings.scss'], gulp.series('sass-styles', 'sass-crit', 'pug'))
		gulp.watch(['./src/**/critical.{scss,sass}'], gulp.series('sass-crit', 'pug'))

		// PUG
		global.watch = true;
		gulp.watch([options.path.watch.pug], gulp.series('pug-watch'))
			.on('all', function (event, filepath) {
				global.emittyChangedFile = filepath;
			});

		// JS
		gulp.watch('./src/**/*.js', gulp.series('scripts')).on("change", plugins.browserSync.reload);
		gulp.watch('./src/assets/js/vendor/**/*.js', gulp.series('scripts-libs')).on('change', plugins.browserSync.reload);

		// HTML
		gulp.watch(options.path.build.html + '*.html').on('change', plugins.browserSync.reload);

		// PICTURES
		gulp.watch(imagesPath, gulp.series('imagemin'));
		gulp.watch([options.path.src.sprites + '**/*.svg'], gulp.series('svg'));

		// VIDEO
		gulp.watch(['./src/assets/video/*.*'], gulp.series('video'));

		// FONTS
		gulp.watch(['./src/assets/fonts/*.*'], gulp.series('fonts'));

		// MODULE PHP FORM
		gulp.watch(['./src/assets/modulePHPform/*.*'], gulp.series('modulePHPcopy'));

		cb();
	};

};
