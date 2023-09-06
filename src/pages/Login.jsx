import Logo from '@/components/Logo';
import { Helmet } from 'react-helmet-async';

function Login() {
	return (
		<>
			<Helmet>
				<title>방탈러-로그인</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col justify-around items-center h-screen m-auto">
				<Logo width={80} />
				<form action="">
					<fieldset>
						<label htmlFor="">아이디/이메일</label>
						<input type="email" />
					</fieldset>
				</form>
			</div>
		</>
	);
}

export default Login;
