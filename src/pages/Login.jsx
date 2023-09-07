import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import KeyLogo from '@/components/KeyLogo';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Login() {
	// 아이디 유효성 검사, 이메일 형식
	const regId = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
	// 비밀번호 유효성 검사, 최소 8자 이상, 최소 1개의 대소문자, 특수문자 포함
	const regPw =
		/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

	//아이디비밀번호 찾기 안내문구
	const handleFindUserData = () => {
		toast('현재 해당 서비스는 이용불가합니다', {
			icon: '😭',
			style: {
				borderRadius: '10px',
				background: '#fff',
				color: '#352F44',
			},
		});
	};

	return (
		<>
			<Helmet>
				<title>방탈러-로그인</title>
			</Helmet>
			<div className="bg-ec4 flex flex-col items-center h-screen m-auto text-lg gap-10 max-w-[600px] mix-w-[320px]">
				<KeyLogo />
				<form action="" className="flex flex-col gap-10 items-center py-20">
					<fieldset className="flex flex-col gap-8">
						<FormInput type="email" name="id">
							아이디/이메일
						</FormInput>
						<FormInput type="password" name="password">
							비밀번호
						</FormInput>
					</fieldset>
					<Button type="submit" bg="bg-ec1">
						로그인
					</Button>
				</form>
				<div className="flex flex-col items-center gap-5">
					<Link to="" onClick={handleFindUserData} className="text-ec1">
						아이디/비밀번호 찾기
					</Link>
					<Link to="" className="text-ec1">
						회원가입
					</Link>
					<Link to="/loginselete" className="text-ec1">
						다른 방법으로 로그인
					</Link>
				</div>
			</div>
		</>
	);
}

export default Login;
