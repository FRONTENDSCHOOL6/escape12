import { Link } from 'react-router-dom';
import LoginSeleteButton from './../components/LoginSeleteButton';
import KeyLogo from '@/components/KeyLogo';

function LoginSelete() {
	return (
		<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center h-screen m-auto">
			<KeyLogo />
			<div className="flex flex-col gap-7 mt-[20%]">
				<LoginSeleteButton
					line="border-kakaoline"
					text="text-kakaoline"
					img="bg-kakao"
				>
					카카오 로그인
				</LoginSeleteButton>
				<LoginSeleteButton
					line="border-googleline"
					text="text-googleline"
					img="bg-google"
				>
					구글 로그인
				</LoginSeleteButton>
				<Link to="/login">
					<LoginSeleteButton line="border-white" text="text-white" img="bg-key">
						이메일 로그인
					</LoginSeleteButton>
				</Link>
			</div>
		</div>
	);
}

export default LoginSelete;
