import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import FormInputValid from '@/components/FormInputValid';
import KeyLogo from '@/components/KeyLogo';
import PocketBase from 'pocketbase';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function SignUp() {
	const pb = new PocketBase('https://refresh.pockethost.io');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [nickName, setNickName] = useState('');
	const [isValidId, setIsValidId] = useState(false);
	const [isValidPw, setIsValidPw] = useState(false);

	const navigate = useNavigate();

	// 아이디 유효성 검사, 이메일 형식
	const regId =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]+$/i;
	// 비밀번호 유효성 검사, 최소 8자 이상, 최소 1개의 대소문자, 특수문자 포함
	const regPw =
		/(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
	// 닉네임 유효성 검사
	const regNickName =
		/^(?=.*[a-zA-Z0-9가-힣!@#$%^&*])[a-zA-Z0-9가-힣!@#$%^&*]{2,}$/;

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

	//비밀번호 일치 검사
	const handlePwCheck = (e) => {
		const target = e.target.value;
		setPasswordConfirm(target);
	};

	//닉네임 정규식 검사
	const handleNickName = (e) => {
		const target = e.target.value;
		setNickName(target);
	};

	//pockethost create
	const handleUserData = async (e) => {
		e.preventDefault();
		const data = {
			email,
			password,
			passwordConfirm,
			nickName,
		};

		try {
			if (
				regId.test(email) &&
				regPw.test(password) &&
				password === passwordConfirm &&
				regNickName.test(nickName)
			) {
				await pb.collection('users').create(data);

				toast('가입되었습니다 :)', {
					icon: '💛',
				});

				navigate('/login');
			} else {
				toast('비밀번호가 일치하지 않습니다.', {
					icon: '🔐',
				});
			}
		} catch (err) {
			toast('통신 오류입니다. 다시 시도해주세요.', {
				icon: '😭',
			});
		}
	};

	return (
		<>
			<Helmet>
				<title>방탈러-회원가입</title>
			</Helmet>
			<div className="text-lg max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center h-screen m-auto">
				<Link to="/loginselete">
					<KeyLogo />
				</Link>
				<form
					onSubmit={handleUserData}
					className="flex flex-col gap-10 items-center py-32 s:py-20"
				>
					<div className="flex flex-col gap-3">
						<>
							<FormInput
								type="email"
								name="id"
								onChange={handleIdValid}
								placeholder="example@naver.com"
							>
								아이디(이메일)
							</FormInput>
							<FormInputValid color={!isValidId ? 'text-red' : ''}>
								{!email
									? ' '
									: !isValidId
									? '이메일 형식으로 입력해주세요'
									: ' '}
							</FormInputValid>
						</>
						<>
							<FormInput
								type="password"
								name="password"
								onChange={handlePwValid}
								placeholder="example123"
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
						</>
						<>
							<FormInput
								type="password"
								name="password"
								onChange={handlePwCheck}
								placeholder="example123"
							>
								비밀번호 확인
							</FormInput>
							<FormInputValid
								color={
									password === passwordConfirm ? 'text-googleline' : 'text-red'
								}
							>
								{passwordConfirm.length === 0
									? ''
									: password === passwordConfirm
									? '비밀번호가 일치합니다'
									: '비밀번호가 일치하지 않습니다.'}
							</FormInputValid>
						</>
						<>
							<FormInput
								type="text"
								name="password"
								onChange={handleNickName}
								placeholder="방탈러"
							>
								닉네임
							</FormInput>
							<FormInputValid
								color={
									nickName.length !== 0 && !regNickName.test(nickName)
										? 'text-red'
										: ''
								}
							>
								{nickName.length !== 0 && !regNickName.test(nickName)
									? '공백 제외 두 자리 이상입력해주세요'
									: ''}
							</FormInputValid>
						</>
					</div>
					<Button type="submit" bg="bg-ec1">
						가입하기
					</Button>
				</form>
			</div>
		</>
	);
}

export default SignUp;
