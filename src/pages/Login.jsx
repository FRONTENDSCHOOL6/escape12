import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import KeyLogo from '@/components/KeyLogo';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function Login() {
	return (
		<>
			<Helmet>
				<title>방탈러-로그인</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center h-screen m-auto text-lg gap-10">
				<KeyLogo />
				<form action="" className="flex flex-col gap-10 items-center">
					<fieldset className="flex flex-col gap-8">
						<FormInput type="email" name="id">
							아이디/이메일
						</FormInput>
						<FormInput type="password" name="password">
							비밀번호
						</FormInput>
					</fieldset>
					<Button type="submit" path="/" bg="bg-ec1">
						로그인
					</Button>
				</form>
				<Link to="">
					<button type="button" className="text-ec1">
						아이디/비밀번호 찾기
					</button>
				</Link>
				<Link to="">
					<button type="button" className="text-ec1">
						회원가입
					</button>
				</Link>
				<Link to="/loginselete">
					<button type="button" className="text-ec1">
						뒤로가기
					</button>
				</Link>
			</div>
		</>
	);
}

export default Login;
