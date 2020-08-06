module.exports = function(gulp, options, plugins) {

	return function (cd) {
		gulp.src([
			'./src/assets/vendors/**/*.js',
			'!./src/assets/js/main.js',
			'!./src/assets/js/init.js',
		], {
			base: 'src/assets/vendors/'
		})
			.pipe(plugins.uglify())
			.pipe(plugins.rename({
				dirname: '', //убирает путь из имени файла и в dest идут только файлы без вложения в папки
			}))
			.pipe(gulp.dest('./app/js/vendors/'));

		cd();
	}
};