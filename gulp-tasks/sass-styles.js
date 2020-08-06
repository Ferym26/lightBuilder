module.exports = function(gulp, options, plugins) {

	return function (cb) {

		gulp.src([options.path.src.styles + 'styles.{scss,sass}'])
			.pipe(plugins.plumber())
			//.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass({
				outputStyle: 'expanded',
				errLogToConsole: true,
				importer: [plugins.globOnce()]
			}))
			.on('error', plugins.notify.onError({
				title: 'SASS error',
				message: '<%= error.message %>'
			}))
			.pipe(plugins.autoprefixer({
				cascade: false,
				grid: 'autoplace',
			}))
			.pipe(plugins.gcmq())
			.pipe(plugins.cleanCss({
				compatibility: 'ie11'
			}))
			//.pipe(plugins.sourcemaps.write())
			.pipe(plugins.rename({
				basename: 'styles',
				suffix: '.min'
			}))
			.pipe(plugins.plumber.stop())
			.pipe(gulp.dest(options.path.build.css))
			.pipe(plugins.browserSync.reload({stream: true}));

		cb();
	}

};
