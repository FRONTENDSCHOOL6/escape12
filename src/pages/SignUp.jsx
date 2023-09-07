import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import FormInputValid from '@/components/FormInputValid';
import KeyLogo from '@/components/KeyLogo';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

function SignUp() {
	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');
	const [userPwCheck, setUserPwCheck] = useState('');
	const [userNickName, setUserNickName] = useState('');
	const [isValidId, setIsValidId] = useState(false);
	const [isValidPw, setIsValidPw] = useState(false);
	const [isValidPwCheck, setIsValidPwCheck] = useState(false);

	//아이디 정규식 검사
	const handleIdValid = (e) => {
		const target = e.target.value;
		setUserId(target);
		setIsValidId(regId.test(target));
	};

	//비밀번호 정규식 검사
	const handlePwValid = (e) => {
		const target = e.target.value;
		setUserPw(target);
		setIsValidPw(regPw.test(target));
	};

	//비밀번호 일치 검사
	const handlePwCheck = (e) => {
		const target = e.target.value;
		// if (userPw === target) {
		setUserPwCheck(target);
		// setIsValidPwCheck(true);
		// }
	};

	//닉네임 2자 이상
	const handleNickName = (e) => {
		const target = e.target.value;
		setUserNickName(target);
	};

	const handleClick = () => {
		console.log('클릭');
	};

	// 아이디 유효성 검사, 이메일 형식
	const regId = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
	// 비밀번호 유효성 검사, 최소 8자 이상, 최소 1개의 대소문자, 특수문자 포함
	const regPw =
		/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

	return (
		<>
			<Helmet>
				<title>방탈러-회원가입</title>
			</Helmet>
			<div className="text-lg max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center h-screen m-auto">
				<KeyLogo />
				<form className="flex flex-col gap-10 items-center py-20">
					<fieldset className="flex flex-col gap-3">
						<div>
							<FormInput
								type="email"
								name="id"
								onChange={handleIdValid}
								placeholder="example@naver.com"
							>
								아이디(이메일)
							</FormInput>
							{!userId ? (
								<FormInputValid>　　</FormInputValid>
							) : !isValidId ? (
								<FormInputValid color="text-red">
									이메일 형식으로 입력해주세요
								</FormInputValid>
							) : (
								<FormInputValid>　　</FormInputValid>
							)}
						</div>
						<div>
							<FormInput
								type="password"
								name="password"
								onChange={handlePwValid}
								placeholder="example123"
							>
								비밀번호
							</FormInput>
							{!userPw ? (
								<FormInputValid>　　</FormInputValid>
							) : !isValidPw ? (
								<FormInputValid color="text-red">
									비밀번호는 대소문자, 특수문자 포함 8자리 이상입니다
								</FormInputValid>
							) : (
								<FormInputValid>　　</FormInputValid>
							)}
						</div>
						<div>
							<FormInput
								type="password"
								name="password"
								onChange={handlePwCheck}
								placeholder="example123"
							>
								비밀번호 확인
							</FormInput>
							{userPwCheck === '' ? (
								<FormInputValid>　　</FormInputValid>
							) : userPw === userPwCheck ? (
								<FormInputValid color="text-googleline">
									비밀번호가 일치합니다
								</FormInputValid>
							) : (
								<FormInputValid color="text-red">
									비밀번호가 일치하지 않습니다.
								</FormInputValid>
							)}
						</div>
						<div>
							<FormInput
								type="text"
								name="password"
								onChange={handleNickName}
								placeholder="방탈러"
							>
								닉네임
							</FormInput>
							{userNickName === '' ? (
								<FormInputValid>　　</FormInputValid>
							) : userNickName < 2 ? (
								<FormInputValid color="text-red">
									두 자리 이상 입력해주세요
								</FormInputValid>
							) : (
								<FormInputValid>　　</FormInputValid>
							)}
						</div>
					</fieldset>
					<Button type="submit" bg="bg-ec1" onClick={handleClick}>
						가입하기
					</Button>
				</form>
			</div>
		</>
	);
}

export default SignUp;
