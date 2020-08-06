module.exports = function(gulp, options, plugins) {

	return function (cd) {
		gulp.src([
			'./src/assets/vendors/jquery/jquery-3.4.1.min.js',
			'./src/assets/vendors/**/*.js',
			'!./src/assets/js/main.js',
			'!./src/assets/js/init.js',
		], {
			base: 'src/assets/'
		})
			.pipe(plugins.uglify())
			.pipe(plugins.concat('libs.js'))
			.pipe(plugins.rename({
				suffix: '.min',
				dirname: '', //убирает путь из имени файла и в dest идут только файлы без вложения в папки
			}))
			.pipe(gulp.dest('./app/js/'));

		cd();
	}
};