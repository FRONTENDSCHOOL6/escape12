import Button from '@/components/Button';
import KeyLogo from '@/components/KeyLogo';
import FormInput from '@/components/loginsignup/FormInput';
import FormInputValid from '@/components/loginsignup/FormInputValid';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
	const pb = new PocketBase('https://refresh.pockethost.io');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [nickName, setNickName] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [isValidPw, setIsValidPw] = useState(false);
	const [isValidNickName, setIsValidNickName] = useState(false);
	const [isSameEmail, setIsSameEmail] = useState(false);
	const [pwView, setPwView] = useState(false);
	const [pwConfirmView, setPwConfirmView] = useState(false);
	const navigate = useNavigate();

	// 아이디 유효성 검사, 이메일 형식
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]+$/i;
	// 비밀번호 유효성 검사, 최소 8자 이상, 최소 1개의 대소문자, 특수문자 포함
	const regPw =
		/(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
	// 닉네임 유효성 검사
	const regNickName =
		/^(?=.*[a-zA-Z0-9가-힣!@#$%^&*])[a-zA-Z0-9가-힣!@#$%^&*]{2,}$/;

	//아이디 정규식 검사
	const handleIdValEmail = (e) => {
		setEmail(e.target.value);
		setIsValidEmail(regEmail.test(e.target.value));
	};

	//비밀번호 정규식 검사
	const handlePwValid = (e) => {
		setPassword(e.target.value);
		setIsValidPw(regPw.test(e.target.value));
	};

	//비밀번호 확인 상태 변경
	const handlePwCheck = (e) => {
		setPasswordConfirm(e.target.value);
	};

	//닉네임 상태 변경
	const handleNickName = (e) => {
		setNickName(e.target.value);
	};

	//패스워드 보기
	const isClickedPwView = () => {
		pwView === false ? setPwView(true) : setPwView(false);
	};

	//패스워드 확인 보기
	const isClickedPwConfirmView = () => {
		pwConfirmView === false ? setPwConfirmView(true) : setPwConfirmView(false);
	};

	// 닉네임 중복검사
	const sameNickName = async () => {
		try {
			const nickNameSameList = await pb.collection('users').getList(1, 10, {
				filter: `nickName = "${nickName}"`,
			});

			if (nickNameSameList.items.length > 0) {
				setIsValidNickName(true);
			} else {
				setIsValidNickName(false);
			}
		} catch (err) {
			console.log(`닉네임 중복검사 에러 내용: ${err}`);
		}
	};

	// 이메일 중복검사
	const sameEmail = async () => {
		try {
			const emailSameList = await pb.collection('users').getList(1, 10, {
				filter: `email = "${email}"`,
			});

			if (emailSameList.items.length > 0) {
				setIsSameEmail(true);
			} else {
				setIsSameEmail(false);
			}
		} catch (err) {
			console.log(`이메일 중복검사 에러 내용: ${err}`);
		}
	};

	//회원가입하기
	const handleUserData = async (e) => {
		e.preventDefault();
		const data = {
			email,
			password,
			passwordConfirm,
			nickName,
			emailVisibility: true,
		};

		try {
			if (
				regEmail.test(email) &&
				regPw.test(password) &&
				password === passwordConfirm &&
				regNickName.test(nickName) &&
				!isValidNickName &&
				!isSameEmail
			) {
				await pb.collection('users').create(data);

				toast('가입되었습니다 :)', {
					icon: '💛',
					duration: 2000,
				});

				navigate('/login');
			} else {
				toast('존재하는 닉네임 또는 아이디입니다.', {
					icon: '💛',
					duration: 2000,
				});
			}
		} catch (err) {
			{
				console.log(`회원가입 에러 내용: ${err}`);
			}
		}
	};

	useEffect(() => {
		//이러면 닉네임 중복검사가 안됨
		// if (nickName.length !== 0 && regNickName.test(nickName)) {
		// 	sameNickName();
		// 	sameEmail();
		// }
		//이것도 닉네임 중복검사가 안됨
		// if (nickName.length !== 0 && regNickName.test(nickName)) {
		// 	sameNickName();
		// }
		// sameEmail();

		//닉네임 작성 후 이메일 작성하면 둘다 검사 되지만 닉네임value 빈값으로 변경하면 '존재하는 닉네임입니다'가 안지워지는 오류 발생
		//이메일 작성 후 닉네임 작성하면 닉네임 검사 안됨
		if (
			email.length !== 0 &&
			regEmail.test(email) &&
			nickName.length !== 0 &&
			regNickName.test(nickName)
		) {
			sameNickName();
			sameEmail();
		} else if (email.length !== 0 && regEmail.test(email)) {
			sameEmail();
		} else if (nickName.length !== 0 && regNickName.test(nickName)) {
			sameNickName();
		}
	}, [nickName, email]);

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
								onChange={handleIdValEmail}
								value={email}
								placeholder="example@naver.com"
							>
								아이디(이메일)
							</FormInput>
							<FormInputValid
								color={!isValidEmail || isSameEmail === true ? 'text-red' : ''}
							>
								{!email
									? ' '
									: !isValidEmail
									? '이메일 형식으로 입력해주세요'
									: isSameEmail === true
									? '존재하는 이메일입니다.'
									: ' '}
							</FormInputValid>
						</>
						<>
							<FormInput
								type={pwView ? 'text' : 'password'}
								name="password"
								bg={pwView ? 'bg-eyetrue' : 'bg-eyefalse'}
								onChange={handlePwValid}
								onClick={isClickedPwView}
								value={password}
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
								type={pwConfirmView ? 'text' : 'password'}
								name="passwordConfirm"
								bg={pwConfirmView ? 'bg-eyetrue' : 'bg-eyefalse'}
								onChange={handlePwCheck}
								onClick={isClickedPwConfirmView}
								value={passwordConfirm}
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
								value={nickName}
								placeholder="방탈러"
							>
								닉네임
							</FormInput>
							<FormInputValid
								color={
									(nickName.length !== 0 && !regNickName.test(nickName)) ||
									isValidNickName
										? 'text-red'
										: ''
								}
							>
								{nickName.length !== 0 && !regNickName.test(nickName)
									? '공백 제외 두 자리 이상입력해주세요'
									: isValidNickName === true
									? '존재하는 닉네임입니다.'
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
