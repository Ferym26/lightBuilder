module.exports = function (gulp, options, plugins) {

	//Sprite SVG
	
	return function () {

		return gulp.src(options.path.src.sprites + 'svg/*.svg')
			.pipe(plugins.plumber())
			.pipe(plugins.svgmin({
				js2svg: {
					pretty: true
				}
			}))
			.pipe(plugins.cheerio({
				run: function($) {
					$('[fill]').removeAttr('fill');
					// $('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
				},
				parserOptions: { xmlMode: true }
			}))
			.pipe(plugins.replace('&gt;', '>'))
			.pipe(plugins.svgSprite({
				mode: {
					symbol: {
						sprite: "../sprite.svg"
					}
				}
			}))
			.pipe(plugins.plumber.stop())
			.pipe(gulp.dest(options.path.build.images))
	};
};