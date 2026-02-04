/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		colors: {
			primaryLight: '#DEF7E5',
			primaryBase: '#006D44',
			primaryDark: '#004127',
			secondaryLight: '#F7DBBB',
			secondaryBase: '#F1BC69',
			secondaryDark: '#856737',
			white: '#FFFFFF',
			base100: '#F5F5F5',
			base200: '#E6E6E6',
			base300: '#CFCFCF',
			base400: '#909090',
			base500: '#7D7D7D',
			base700: '#4F4F4F',
			base900: '#1A1A1A',
			black: '#000000',
			alert: '#B42318',
			caution: '#E0A800',
			positive: '#2E8B57',
			background: 'rgba(79, 79, 79, 0.3)',
		},
		fontFamily: {
			body: ['Inter'],
		},
		fontSize: {
			titleBase: [
				'1.6rem',
				{
					lineHeight: '2.4rem',
					fontWeight: '600',
				},
			],
			titleMedium: [
				'1.8rem',
				{
					lineHeight: '2.4rem',
					fontWeight: '600',
				},
			],
			titleLarge: [
				'2.4rem',
				{
					lineHeight: '3.2rem',
					fontWeight: '600',
				},
			],
			titleXlarge: [
				'3.2rem',
				{
					lineHeight: '4rem',
					fontWeight: '600',
				},
			],
			title2Xlarge: [
				'4rem',
				{
					lineHeight: '4.8rem',
					fontWeight: '700',
				},
			],
			title3Xlarge: [
				'4.8rem',
				{
					lineHeight: '4rem',
					fontWeight: '700',
				},
			],
			bodyXsmall: [
				'1rem',
				{
					lineHeight: '1.2rem',
					fontWeight: '400',
				},
			],
			bodyCaption: [
				'1.2rem',
				{
					lineHeight: '1.6rem',
					fontWeight: '400',
				},
			],
			bodyBase: [
				'1.6rem',
				{
					lineHeight: '2.4rem',
					fontWeight: '400',
				},
			],
			bodyMedium: [
				'1.8rem',
				{
					lineHeight: '2.4rem',
					fontWeight: '500',
				},
			],
			bodyLarge: [
				'2rem',
				{
					lineHeight: '2.4rem',
					fontWeight: '600',
				},
			],
		},
		spacing: {
			xs: '0.4rem',
			sm: '0.8rem',
			md: '1.2rem',
			lg: '1.6rem',
			xl: '2.4rem',
			'2xl': '3.2rem',
			'3xl': '4.8rem',
			'4xl': '6.4rem',
		},
		borderRadius: {
			xs: '0.4rem',
			sm: '0.8rem',
			md: '1.2rem',
			lg: '1.6rem',
			xl: '2.4rem',
			'2xl': '3.2rem',
			'3xl': '4.8rem',
		},
	},
	plugins: [],
};
