module.exports = function (gulp, options, plugins) {

	// Хостит файлы

	return function (cb) {
		
		const conn = plugins.ftp.create(options.deploy);
		const globs = [
			'app/**'
		];
		gulp.src(globs, {base: 'app/', buffer: false})
			.pipe(conn.newer('/app')) // only upload newer files
			.pipe(conn.dest(`/${options.name}`));
		
		cb();
	};
};