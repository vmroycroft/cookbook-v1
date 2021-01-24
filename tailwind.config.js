const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/**/*.html', './src/**/*.js'],
	darkMode: 'class',
	theme: {
		colors: {
			white: colors.white,
			black: colors.black,
			'blue-gray': colors.blueGray,
			'cool-gray': colors.coolGray,
			gray: colors.gray,
			'true-gray': colors.trueGray,
			'warm-gray': colors.warmGray,
			red: colors.red,
			orange: colors.orange,
			amber: colors.amber,
			yellow: colors.yellow,
			lime: colors.lime,
			green: colors.green,
			emerald: colors.emerald,
			teal: colors.teal,
			cyan: colors.cyan,
			'light-blue': colors.lightBlue,
			blue: colors.blue,
			indigo: colors.indigo,
			violet: colors.violet,
			purple: colors.purple,
			fuchsia: colors.fuchsia,
			pink: colors.pink,
			rose: colors.rose
		},
		fontFamily: {
			sans: ['Open Sans', 'sans-serif'],
			serif: ['Source Serif Pro', 'serif']
		},
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
