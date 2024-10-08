// @ts-check

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	content: ['./src/**/*.{ts,tsx,css}'],
	darkMode: 'media',
	theme: {
		fontFamily: {
			mono: ['"DM Mono"', 'monospace'],
		},
		fontWeight: {
			light: 300,
			medium: 500,
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
