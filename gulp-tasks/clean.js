module.exports = function (gulp, options, plugins) {

	// Удаляет файлы проекта

	return function (cb) {
		plugins.del(['./app/']);
		plugins.del(['./.gulp/']);

		cb();
	};
};
