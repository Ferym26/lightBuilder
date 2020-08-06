module.exports = function (gulp, options, plugins) {

	//Генерация фавиконок

	return function (cb) {

		// File where the favicon markups are stored
		var FAVICON_DATA_FILE = 'src/assets/favicon/faviconData.json';

		// Generate the icons. This task takes a few seconds to complete.
		// You should run it at least once to create the icons. Then,
		// you should run it whenever RealFaviconGenerator updates its
		// package (see the check-for-favicon-update task below).

		plugins.realFavicon.generateFavicon({
			masterPicture: 'src/assets/favicon/favicon-base.png',
			dest: './app/images/favicon',
			iconsPath: '/',
			design: {
				ios: {
					pictureAspect: 'backgroundAndMargin',
					backgroundColor: '#ffffff',
					margin: '0%',
					assets: {
						ios6AndPriorIcons: false,
						ios7AndLaterIcons: false,
						precomposedIcons: false,
						declareOnlyDefaultIcon: true
					}
				},
				desktopBrowser: {},
				windows: {
					pictureAspect: 'noChange',
					backgroundColor: '#da532c',
					onConflict: 'override',
					assets: {
						windows80Ie10Tile: false,
						windows10Ie11EdgeTiles: {
							small: false,
							medium: true,
							big: false,
							rectangle: false
						}
					}
				},
				androidChrome: {
					pictureAspect: 'backgroundAndMargin',
					margin: '17%',
					backgroundColor: '#ffffff',
					themeColor: '#ffffff',
					manifest: {
						display: 'standalone',
						orientation: 'notSet',
						onConflict: 'override',
						declared: true
					},
					assets: {
						legacyIcon: false,
						lowResolutionIcons: false
					}
				},
				safariPinnedTab: {
					pictureAspect: 'silhouette',
					themeColor: '#5bbad5'
				}
			},
			settings: {
				scalingAlgorithm: 'Mitchell',
				errorOnImageTooSmall: false,
				readmeFile: false,
				htmlCodeFile: false,
				usePathAsIs: false
			},
			markupFile: FAVICON_DATA_FILE
		});

		cb();

	};
};
