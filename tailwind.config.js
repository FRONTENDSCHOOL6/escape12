/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.jsx'],
	theme: {
		fontFamily: {
			hob: ['SDSamliphopangche_Outline'],
		},
		screens: {
			s: { min: '320px', max: '600px' },
			m: { min: '601px', max: '1279px' },
			l: { min: '1280px' },
		},
		colors: {
			ec1: '#FAF0E6',
			ec2: '#B9B4C7',
			ec3: '#5C5470',
			ec4: '#352F44',
			ec5: '#F8DE22',
			red: '#FA0000',
			kakaoline: '#FFE895',
			googleline: '#BCF0AB',
		},
		backgroundImage: {
			kakao: 'url("/src/assets/loginselete-kakao.png")',
			google: 'url("/src/assets/loginselete-google.png")',
			key: 'url("/src/assets/loginselete-key.png")',
			eyetrue: 'url("/src/assets/login-eyetrue.png.png")',
			eyefalse: 'url("/src/assets/login-eyefalse.png.png")',
		},
		extend: {},
	},
	plugins: [],
};
