'use strict';

module.exports = function (gulp, options, plugins) {

	return function (cb) {

		new Promise(function (resolve, reject) {
			plugins.emitty.scan(global.emittyChangedFile).then(function () {
				gulp.src(options.path.src.pug, {read: true})
					.pipe(plugins.if(global.watch, plugins.emitty.filter(global.emittyChangedFile)))
					.pipe(plugins.pug({
						pretty: '\t',
						plugins: [ plugins.pugIncludeGlob() ],
					}))
					.on('error', plugins.notify.onError({
						title: 'PUG error',
						message: '<%= error.message %>'
					}))
					.pipe(plugins.debug({title: "Emitty: "}))
					.pipe(plugins.inlinesource())
					.pipe(gulp.dest(options.path.build.html))
					.on('end', resolve)
					.on('error', reject);
			});
		});

		cb();
	};
};
