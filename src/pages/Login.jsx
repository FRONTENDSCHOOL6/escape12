import pb from '@/api/pockethost';
import Button from '@/components/button/Button';
import KeyLogo from '@/components/KeyLogo';
import FormInput from '@/components/loginsignup/FormInput';
import FormInputValid from '@/components/loginsignup/FormInputValid';
import debounce from '@/utils/debounce';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { useRef } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

// 아이디 유효성 검사, 이메일 형식
const regEmail =
	/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]+$/i;
// 비밀번호 유효성 검사, 최소 8자 이상, 최소 1개의 대소문자, 특수문자 포함
const regPw =
	/(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValidId, setIsValidId] = useState(false);
	const [isValidPw, setIsValidPw] = useState(false);
	const [pwView, setPwView] = useState(false);
	const [open, setOpen] = useState(false);
	const confirmEmailRef = useRef('');

	// 이메일 비밀번호 확인 및 변경 요청 인풋
	const handleEmail = (e) => {
		confirmEmailRef.current = e.target.value;
	};

	// 아이디비밀번호 찾기
	const handleResetPw = async () => {
		toast(`메일이 전송되었습니다`, {
			icon: '✉️',
			duration: 1000,
		});

		handleClose();

		await pb
			.collection('users')
			.requestPasswordReset(`${confirmEmailRef.current}`);

		await pb
			.collection('users')
			.requestVerification(`${confirmEmailRef.current}`);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	//패스워드 보기
	const isClickedPwView = () => {
		pwView === false ? setPwView(true) : setPwView(false);
	};

	//아이디 정규식 검사
	const handleIdValidEmail = (e) => {
		const target = e.target.value;
		setEmail(target);
		setIsValidId(regEmail.test(target));
	};
	const debounceEmailHandler = debounce((e) => handleIdValidEmail(e), 300);

	//비밀번호 정규식 검사
	const handlePwValid = (e) => {
		const target = e.target.value;
		setPassword(target);
		setIsValidPw(regPw.test(target));
	};
	const debouncePwHandler = debounce((e) => handlePwValid(e), 300);

	//로그인 정보 확인 후 이동
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const authData = await pb
				.collection('users')
				.authWithPassword(email, password);

			if (authData) {
				toast(`${authData.record.nickName}님 환영합니다`, {
					icon: '💜',
					duration: 2000,
				});
				navigate('/theme');
			}
		} catch (error) {
			toast(`아이디와 비밀번호를 확인해주세요`, {
				icon: '📢',
				duration: 2000,
			});
		}
	};

	return (
		<>
			<Helmet>
				<title>로그인</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center h-screen m-auto text-lg">
				<KeyLogo />
				<form
					onSubmit={handleLogin}
					className="flex flex-col gap-10 items-center py-32 s:py-16 s:px-3"
				>
					<fieldset className="flex flex-col gap-3">
						<div>
							<FormInput
								type="email"
								name="id"
								onChange={debounceEmailHandler}
								defaultValue={email}
								hidden="text-opacity"
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
						</div>
						<div>
							<FormInput
								type={pwView ? 'text' : 'password'}
								name="password"
								bg={pwView ? 'bg-eyetrue' : 'bg-eyefalse'}
								onChange={debouncePwHandler}
								onClick={isClickedPwView}
								defaultValue={password}
								hidden="text-opacity"
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
					<Link to="" onClick={handleClickOpen}>
						아이디/비밀번호 찾기
					</Link>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>정보 변경</DialogTitle>
						<DialogContent>
							<DialogContentText>
								아이디/비밀번호 확인 메일을 받으실 메일 주소를 작성해주세요
							</DialogContentText>
							<TextField
								ref={confirmEmailRef}
								onChange={handleEmail}
								autoFocus
								margin="dense"
								id="name"
								label="Email Address"
								type="email"
								fullWidth
								variant="standard"
							/>
						</DialogContent>
						<DialogActions>
							<Button text="text-ec4" bg="bg-kakaoline" onClick={handleClose}>
								취소
							</Button>
							<Button text="text-ec4" bg="bg-kakaoline" onClick={handleResetPw}>
								확인
							</Button>
						</DialogActions>
					</Dialog>
					<Link to="/signup">회원가입</Link>
					<Link to="/loginselete">다른 방법으로 로그인</Link>
				</div>
			</div>
		</>
	);
}

export default Login;
