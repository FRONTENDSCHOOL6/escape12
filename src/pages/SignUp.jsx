import pb from '@/api/pockethost';
import thumnail from '@/assets/login-thumnail.png';
import Button from '@/components/button/Button';
import KeyLogo from '@/components/KeyLogo';
import FormInput from '@/components/loginsignup/FormInput';
import FormInputValid from '@/components/loginsignup/FormInputValid';
import Sup from '@/components/record/Sup';
import debounce from '@/utils/debounce';
import { ClientResponseError } from 'pocketbase';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const regEmail =
	/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]+$/i;

const regPw =
	/(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

const regNickName =
	/^(?=.*[a-zA-Z0-9가-힣!@#$%^&*])[a-zA-Z0-9가-힣!@#$%^&*]{2,}$/;

function SignUp() {
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
	const photoRef = useRef(null);
	const uploadPhotoRef = useRef(null);
	const navigate = useNavigate();

	const handleIdValidEmail = (e) => {
		setEmail(e.target.value);
		setIsValidEmail(regEmail.test(e.target.value));
	};
	const debounceEmailHandler = debounce((e) => handleIdValidEmail(e));

	const handlePwValid = (e) => {
		setPassword(e.target.value);
		setIsValidPw(regPw.test(e.target.value));
	};
	const debouncePwHandler = debounce((e) => handlePwValid(e));

	const handlePwCheck = (e) => {
		setPasswordConfirm(e.target.value);
	};
	const debouncePwConfirmHandler = debounce((e) => handlePwCheck(e));

	const handleNickName = (e) => {
		setNickName(e.target.value);
	};
	const debounceNickNameHandler = debounce((e) => handleNickName(e));

	const isClickedPwView = () => {
		pwView === false ? setPwView(true) : setPwView(false);
	};

	const isClickedPwConfirmView = () => {
		pwConfirmView === false ? setPwConfirmView(true) : setPwConfirmView(false);
	};

	const handleUploadPhoto = (e) => {
		const photoFile = e.target.files[0];
		const photoUrl = URL.createObjectURL(photoFile);
		uploadPhotoRef.current.setAttribute('src', photoUrl);
	};

	const handleUserData = async (e) => {
		e.preventDefault();
		const data = {
			email,
			password,
			passwordConfirm,
			nickName,
			avatar: photoRef.current.files[0],
			emailVisibility: true,
			admin: false,
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
				toast('존재하는 닉네임 또는 아이디입니다', {
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
		const sameNickName = async () => {
			try {
				const nickNameSameList = await pb.collection('users').getList(1, 10, {
					filter: `(nickName='${nickName}')`,
				});

				if (nickNameSameList.items.length > 0) {
					setIsValidNickName(true);
				} else {
					setIsValidNickName(false);
				}
			} catch (err) {
				if (!(err instanceof ClientResponseError)) {
					console.log(`닉네임 중복검사 에러 내용: ${err}`);
				}
			}
		};

		const sameEmail = async () => {
			try {
				const emailSameList = await pb.collection('users').getList(1, 10, {
					filter: `(email='${email}')`,
				});

				if (emailSameList.items.length > 0) {
					setIsSameEmail(true);
				} else {
					setIsSameEmail(false);
				}
			} catch (err) {
				if (!(err instanceof ClientResponseError)) {
					console.log(`이메일 중복검사 에러 내용: ${err}`);
				}
			}
		};

		const checkDuplicates = async () => {
			if (email.length !== 0 && regEmail.test(email)) {
				await sameEmail();
			}
			if (nickName.length !== 0 && regNickName.test(nickName)) {
				await sameNickName();
			}
		};

		checkDuplicates();
	}, [nickName, email]);

	return (
		<>
			<Helmet>
				<title>회원가입</title>
				<meta name="description" content="방탈러 홈페이지-회원가입" />
				<meta property="og:title" content="방탈러 회원가입" />
				<meta property="og:description" content="방탈러 회원가입 페이지" />
				<meta property="og:url" content="https://escape12.netlify.app/signup" />
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] flex flex-col items-center min-h-screen m-auto bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-lg">
				<KeyLogo path="/loginselete" />
				<form
					onSubmit={handleUserData}
					className="flex flex-col gap-10 items-center my-14 s:px-3"
				>
					<fieldset className="flex flex-col gap-3 dark:text-dark-ec1 text-light-ec4">
						<div role="alert">
							<FormInput
								type="email"
								name="id"
								onChange={debounceEmailHandler}
								defaultValue={email}
								placeholder="example@naver.com"
								aria-invalid={isValidEmail}
								aria-errormessage="emailErr"
							>
								아이디(이메일)
							</FormInput>
							<FormInputValid
								color={
									!isValidEmail || isSameEmail === true
										? 'dark:text-dark-red text-light-red'
										: ''
								}
								id="emailErr"
							>
								{!email
									? ' '
									: !isValidEmail
									? '이메일 형식으로 입력해주세요'
									: isSameEmail === true
									? '존재하는 이메일입니다'
									: ' '}
							</FormInputValid>
						</div>
						<div role="alert">
							<FormInput
								type={pwView ? 'text' : 'password'}
								name="password"
								bg={
									window.localStorage.getItem('theme') === 'dark'
										? pwView
											? 'bg-eyelight'
											: 'bg-eyefalse'
										: pwView
										? 'bg-eyetrue'
										: 'bg-eyefalse'
								}
								onChange={debouncePwHandler}
								onClick={isClickedPwView}
								defaultValue={password}
								placeholder="example123"
								aria-invalid={isValidPw}
								aria-errormessage="pwError"
							>
								비밀번호
							</FormInput>
							<FormInputValid
								color={!isValidPw ? 'dark:text-dark-red text-light-red' : ''}
								id="pwError"
							>
								{!password
									? ''
									: !isValidPw
									? '비밀번호는 대소문자, 특수문자 포함 8자리 이상입니다'
									: ''}
							</FormInputValid>
						</div>
						<div role="alert">
							<FormInput
								type={pwConfirmView ? 'text' : 'password'}
								name="passwordConfirm"
								bg={
									window.localStorage.getItem('theme') === 'dark'
										? pwConfirmView
											? 'bg-eyelight'
											: 'bg-eyefalse'
										: pwConfirmView
										? 'bg-eyetrue'
										: 'bg-eyefalse'
								}
								onChange={debouncePwConfirmHandler}
								onClick={isClickedPwConfirmView}
								defaultValue={passwordConfirm}
								placeholder="example123"
								aria-invalid={password === passwordConfirm}
								aria-errormessage="pwConfirmErr"
							>
								비밀번호 확인
							</FormInput>
							<FormInputValid
								color={
									password === passwordConfirm
										? 'dark:text-dark-googleline text-light-ec4'
										: 'dark:text-dark-red text-light-red'
								}
								id="pwConfirmErr"
							>
								{passwordConfirm.length === 0
									? ''
									: password === passwordConfirm
									? '비밀번호가 일치합니다'
									: '비밀번호가 일치하지 않습니다'}
							</FormInputValid>
						</div>
						<div role="alert">
							<FormInput
								type="text"
								name="nickName"
								onChange={debounceNickNameHandler}
								defaultValue={nickName}
								placeholder="방탈러"
								aria-invalid={isValidNickName}
								aria-errormessage="nickNameErr"
							>
								닉네임
							</FormInput>
							<FormInputValid
								color={
									(nickName.length !== 0 && !regNickName.test(nickName)) ||
									isValidNickName
										? 'dark:text-dark-red text-light-red'
										: ''
								}
								id="nickNameErr"
							>
								{nickName.length !== 0 && !regNickName.test(nickName)
									? '공백 제외 두 자리 이상 입력해주세요'
									: nickName.length !== 0 && isValidNickName === true
									? '존재하는 닉네임입니다'
									: ''}
							</FormInputValid>
							<div className="flex justify-between text-ec1 relative px-2 gap-5">
								<label htmlFor="image" className="whitespace-nowrap">
									<Sup>사진</Sup>
								</label>
								<input
									ref={photoRef}
									onChange={handleUploadPhoto}
									className="cursor-pointer absolute w-full h-full opacity-0 z-10"
									type="file"
									name="image"
									id="image"
									required
									accept="*.jpg,*.png,*.webp,*.avif"
									multiple
								/>
								<div className="h-[140px] min-w-[70%]">
									<img
										ref={uploadPhotoRef}
										className="h-full w-[140px] rounded-full"
										src={thumnail}
										alt="썸네일"
									/>
								</div>
							</div>
						</div>
					</fieldset>
					<div className="flex flex-col justify-center items-center">
						<Button type="submit" bg="bg-ec1 mb-4">
							가입하기
						</Button>
						<Link to="/login" className="text-ec1">
							뒤로가기
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}

export default SignUp;
