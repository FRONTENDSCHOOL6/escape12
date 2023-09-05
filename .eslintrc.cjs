module.exports = {
  root: true, //ESLint가 설정 파일을 프로젝트 루트 디렉토리에서 찾아야 함
  env: { browser: true, es2021: true, node: true }, //프로젝트 환경 설정: 브라우저, ES2021, Node.js 환경 사용
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [ //아래와 같은 파일과 디렉토리 무시하도록 설정
    'dist',
    'pocketbase',
    'src/views',
    '.eslintrc.cjs',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, //파서 옵션
  settings: { react: { version: '18.2' } }, //현재 사용 중인 리액트 버전
  plugins: ['react-refresh'], //현재 사용 중인 플러그인
  rules: {
    'react/prop-types': 'error',
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true },
    ],
  },
};