module.exports = {
	name: 'lightbuilder',
	path: {
		build: {
			html: './app/',
			js: './app/js/',
			css: './app/css/',
			images: './app/images/',
			imagesPlaceholder: './app/images/placeholder',
			fonts: './app/fonts/',
			video: './app/video/',
			module: './app/module/'
		},

		src: {
			pug: './src/pages/**/*.pug',
			styles: [
				'./src/assets/css/'
			],
			js: './src/assets/js/',
			svg: './src/**/*.svg',
			images: './src/**/*.{png,jpg,jpeg,gif,svg,webp}',
			assets: './src/assets/',
			fonts: './src/assets/fonts/**/*',
			sprites: './src/assets/sprites/'
		},

		watch: {
			pug: './src/**/*.pug',
			sass: './src/**/*.{scss,sass}',
			js: './src/**/*.js',
			svg: './src/**/*.svg',
			images: './src/**/*.{png,jpg,jpeg,gif,ico,svg,webp}'
		}
	},

	deploy: {
		host:     '77.222.62.218',
		user:     'studentnru_prior',
		password: 'kd74hd90Fsn',
		parallel: 10,
	},

	serverConfig: {
		server: {
			baseDir: './'
		},
		startPath: "/app/index.html",
		host: 'localhost',
		port: '4200',
		reloadDelay: 100,
		timestamps: false,
		notify: false,
		// logPrefix: 'frontend'
		// tunnel: true,
		// tunnel: "slamlight"
	},
};
