/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.jsx'],
	theme: {
		fontFamily: {
			hob: ['SDSamliphopangche_Outline'],
		},
		screens: {
			width: { min: '320px', max: '600px' },
		},
		colors: {
			ec1: '#FAF0E6',
			ec2: '#B9B4C7',
			ec3: '#5C5470',
			ec4: '#352F44',
			ec5: '#F8DE22',
			kakaoline: '#FFE895',
			googleline: '#BCF0AB',
		},
		backgroundImage: {
			kakao: 'url("/src/assets/loginselete-kakao.png")',
			google: 'url("/src/assets/loginselete-google.png")',
			key: 'url("/src/assets/loginselete-key.png")',
		},
		extend: {},
	},
	plugins: [],
};
