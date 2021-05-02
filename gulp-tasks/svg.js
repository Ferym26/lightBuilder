module.exports = function (gulp, options, plugins) {

	//Sprite SVG

	return function () {

		var svgArr = [];

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
			.pipe(plugins.tap(file => {
				const file_input_path = file.path;
				const file_dir = plugins.path.dirname(file_input_path);
				const file_name = plugins.path.basename(file_input_path).replace('.svg', '');
				svgArr.push(file_name)
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
			.on('end', function () {
				const svgArr_string = '["' + svgArr.join('", "') + '"]';
				plugins.fs.writeFileSync(options.path.src.sprites + 'svg/svg.pug', "- var $svg = " + svgArr_string)
			});
	};
};
