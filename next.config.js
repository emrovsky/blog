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
                permanent: true,
            },
        ];
    },
};

module.exports = config;
