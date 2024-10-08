// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const config = {
	typescript: {
		ignoreBuildErrors: true,
	},

	async redirects() {
		return [
			{
				source: '/post/:slug',
				destination: 'https://old.alistair.blog/post/:slug',
				permanent: true,
			},
		];
	},
};

module.exports = config;
