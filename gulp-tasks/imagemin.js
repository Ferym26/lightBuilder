module.exports = function (gulp, options, plugins) {

	return function (cb) {

		const imagesPath = [
			'./src/blocks/**/img/*.{png,jpg,jpeg,svg}',
			'./src/partials/**/img/*.{png,jpg,jpeg,svg}',
			'./src/mixins/**/img/*.{png,jpg,jpeg,svg}',
			'./src/assets/images/**/*.{png,jpg,jpeg,svg}'
		];

		gulp.src(imagesPath, {
			allowEmpty: true,
		})
			.pipe(plugins.plumber())
			.pipe(plugins.flatten({
				includeParents: 0,
			}))
			.pipe(plugins.newer(options.path.build.images))
			.pipe(plugins.image({
				optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
				pngquant: ['--speed=1', '--force', 256],
				zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
				jpegRecompress: ['--strip', '--quality', 'medium', '--min', 90, '--max', 95],
				mozjpeg: ['-optimize', '-progressive', '-quality', 90],
				// guetzli: ['--quality', 90],
				gifsicle: ['--optimize'],
				svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
			}))
			.pipe(gulp.dest(options.path.build.images))
			// Создайние placeholder
			// .pipe(plugins.tap(file => {
			// 	const file_input_path = file.path;
			// 	const file_dir = plugins.path.dirname(file_input_path);
			// 	const file_name = plugins.path.basename(file_input_path);
			// 	const file_output_path = file_dir + '/placeholder/' + file_name;
			// 	const { exec } = require('child_process');

			// 	!plugins.fs.existsSync(file_dir + '/placeholder') && plugins.fs.mkdirSync(file_dir + '/placeholder');

			// 	const execString = 'magick convert \"' + file_input_path + '\" -quality 20  -filter Gaussian -resize 50% -define filter:sigma=10 -resize 200% \"' + file_output_path + '\"';
			// 	const execStringAdaptive = execString.replace(/\\/g,"/")

			// 	exec(execStringAdaptive);
			// }))
			.pipe(plugins.plumber.stop())
			.pipe(plugins.browserSync.reload({stream: true}));

		// Копирует gif
		gulp.src([
			'./src/blocks/**/*.{gif}',
			'./src/components/**/*.{gif}',
			'./src/partials/**/*.{gif}',
			'./src/mixins/**/*.{gif}',
			'./src/assets/images/**/*.{gif}'
		])
			.pipe(plugins.flatten({
				includeParents: 0,
			}))
			.pipe(plugins.newer(options.path.build.images))
			.pipe(gulp.dest(options.path.build.images));

		// кодирует PNG, JPG в webp
		gulp.src([
			'./src/blocks/**/*.{png,jpg}',
			'./src/components/**/*.{png,jpg}',
			'./src/partials/**/*.{png,jpg}',
			'./src/mixins/**/*.{png,jpg}',
			'./src/assets/images/**/*.{png,jpg}'
		])
			.pipe(plugins.newer(options.path.build.images))
			.pipe(plugins.webp({
				quality: 75,
				method: 6,
			}))
			// .pipe(plugins.rename({
			// 	suffix: '.png'
			// }))
			.pipe(plugins.flatten({
				includeParents: 0,
			}))
			.pipe(gulp.dest(options.path.build.images));

		// кодирует JPG в webp
		// gulp.src([
		// 	'./src/blocks/**/*.{jpg,jpeg}',
		// 	'./src/components/**/*.{jpg,jpeg}',
		// 	'./src/partials/**/*.{jpg,jpeg}',
		// 	'./src/mixins/**/*.{jpg,jpeg}',
		// 	'./src/assets/images/**/*.{jpg,jpeg}'
		// ])
		// 	.pipe(plugins.webp({
		// 		quality: 75,
		// 		method: 6,
		// 	}))
		// 	// .pipe(plugins.rename({
		// 	// 	suffix: '.jpg'
		// 	// }))
		// 	.pipe(plugins.flatten({
		// 		includeParents: 0,
		// 	}))
		// 	.pipe(gulp.dest(options.path.build.images));

		cb();
	}

};
