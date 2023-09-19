/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.jsx'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			hob: ['SDSamliphopangche_Outline'],
		},
		screens: {
			s: { min: '375px', max: '640px' },
			m: { min: '641px', max: '1279px' },
			l: { min: '1280px' },
		},
		colors: {
			light: {
				ec1: '#FAF0E6',
				ec2: '#B9B4C7',
				ec3: '#5C5470',
				ec4: '#352F44',
				ec5: '#F8DE22',
				red: '#FA0000',
				gray: '#868e96',
				sweetred: '#FFC1C1',
				kakaoline: '#FFE895',
				googleline: '#BCF0AB',
				opacity: 'transparent',
				white: '#FFFFFF',
			},
			dark: {
				ec1: '#FAF0E6',
				ec2: '#B9B4C7',
				ec3: '#5C5470',
				ec4: '#352F44',
				ec5: '#F8DE22',
				green: 'green',
				red: 'red',
				gray: 'gray',
				sweetred: '#FFC1C1',
				kakaoline: '#FFE895',
				googleline: '#BCF0AB',
				opacity: 'transparent',
				white: '#FFFFFF',
			},
		},
		backgroundImage: {
			kakao: 'url("/src/assets/loginselete-kakao.png")',
			google: 'url("/src/assets/loginselete-google.png")',
			key: 'url("/src/assets/loginselete-key.png")',
			eyetrue: 'url("/src/assets/login-eyetrue.png")',
			eyefalse: 'url("/src/assets/login-eyefalse.png")',
			hearttrue: 'url("/src/assets/theme-hearttrue.png")',
			heartfalse: 'url("/src/assets/theme-heartfalse.png")',
			heartlike: 'url("/src/assets/upload-like.png")',
		},
		extend: {
			boxShadow: {
				darkMode:
					'0 10px 15px -3px rgba(0, 0, 0, .5), 0 4px 6px -2px rgba(0, 0, 0,.07)', // 커스텀 그림자 추가
			},
			keyframes: {
				spinner: {
					'0%': { boxShadow: '-200px 0 #fff inset' },
					'20%': { boxShadow: '-100px 0 #fff inset' },
					'50%': { boxShadow: '48px 0 #fff inset' },
					'70%': { boxShadow: '100px 0 #fff inset' },
					'100%': { boxShadow: '150px 0 #fff inset' },
				},
			},
			animation: { moon: 'spinner 2s linear infinite' },
		},
	},
	variants: {
		backgroundColor: ['responsive', 'dark'],
		textColor: ['responsive', 'dark'],
	},
	plugins: [],
};
