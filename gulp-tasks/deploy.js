module.exports = function (gulp, options, plugins, ftpOpts) {

	// Хостит файлы

	return function (cb) {
		
		const conn = plugins.ftp.create(ftpOpts.deploy);
		const globs = [
			'app/**'
		];
		gulp.src(globs, {base: 'app/', buffer: false})
			.pipe(conn.newer('/app')) // only upload newer files
			.pipe(conn.dest(`/${ftpOpts.name}`));
		
		cb();
	};
};