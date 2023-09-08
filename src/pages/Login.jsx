import Button from '@/components/Button';
import FormInput from '@/components/loginsignup/FormInput';
import FormInputValid from '@/components/loginsignup/FormInputValid';
import KeyLogo from '@/components/KeyLogo';
import PocketBase from 'pocketbase';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
	const pb = new PocketBase('https://refresh.pockethost.io');
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValidId, setIsValidId] = useState(false);
	const [isValidPw, setIsValidPw] = useState(false);

	// 아이디 유효성 검사, 이메일 형식
	const regId = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
	// 비밀번호 유효성 검사, 최소 8자 이상, 최소 1개의 대소문자, 특수문자 포함
	const regPw =
		/(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

	//아이디비밀번호 찾기 안내문구
	const handleFindUserData = () => {
		toast('현재 해당 서비스는 이용불가합니다', {
			icon: '😭',
		});
	};

	//로그인 정보 확인 후 이동
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const authData = await pb
				.collection('users')
				.authWithPassword(email, password);

			if (authData) {
				toast('로그인 성공', {
					icon: '💜',
				});
				navigate('/');
			}
		} catch (err) {
			toast('아이디와 비밀번호를 확인해주세요', {
				icon: '📢',
			});
		}
	};

	//아이디 정규식 검사
	const handleIdValid = (e) => {
		const target = e.target.value;
		setEmail(target);
		setIsValidId(regId.test(target));
	};

	//비밀번호 정규식 검사
	const handlePwValid = (e) => {
		const target = e.target.value;
		setPassword(target);
		setIsValidPw(regPw.test(target));
	};

	return (
		<>
			<Helmet>
				<title>방탈러-로그인</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center h-screen m-auto">
				<KeyLogo />
				<form
					onSubmit={handleLogin}
					className="flex flex-col gap-10 items-center py-32 s:py-16"
				>
					<fieldset className="flex flex-col gap-3">
						<div>
							<FormInput type="email" name="id" onChange={handleIdValid}>
								아이디(이메일)
							</FormInput>
							<FormInputValid color={!isValidId ? 'text-red' : ''}>
								{!email
									? ' '
									: !isValidId
									? '이메일 형식으로 입력해주세요'
									: ' '}
							</FormInputValid>
						</div>
						<div>
							<FormInput
								type="password"
								name="password"
								onChange={handlePwValid}
							>
								비밀번호
							</FormInput>
							<FormInputValid color={!isValidPw ? 'text-red' : ''}>
								{!password
									? ''
									: !isValidPw
									? '비밀번호는 대소문자, 특수문자 포함 8자리 이상입니다'
									: ''}
							</FormInputValid>
						</div>
					</fieldset>
					<Button type="submit" bg="bg-ec1">
						로그인
					</Button>
				</form>
				<div className="flex flex-col items-center gap-5 flex-1 text-ec1">
					<Link to="" onClick={handleFindUserData}>
						아이디/비밀번호 찾기
					</Link>
					<Link to="/signup">회원가입</Link>
					<Link to="/loginselete">다른 방법으로 로그인</Link>
				</div>
			</div>
		</>
	);
}

export default Login;
