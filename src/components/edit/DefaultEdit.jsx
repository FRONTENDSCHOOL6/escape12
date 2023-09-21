import { string, func } from 'prop-types';
import FormInput from '../loginsignup/FormInput';

DefaultnickName.propTypes = {
	nickName: string,
	nickNameEvent: func,
	email: string,
	emailEvent: func,
	password: string,
};

function DefaultnickName({ nickName, nickNameEvent, email, emailEvent }) {
	return (
		<div className="py-12 space-y-10">
			<FormInput
				name="email"
				palceholder="이메일"
				defaultValue={email}
				onChange={emailEvent}
			>
				아이디(이메일)
			</FormInput>
			<FormInput
				type="password"
				name="password"
				placeholder="🥲 비밀번호는 변경할 수 없습니다"
				readOnly
			>
				비밀번호
			</FormInput>
			<FormInput
				name="nickName"
				placeholder="닉네임"
				defaultValue={nickName}
				onChange={nickNameEvent}
			>
				닉네임
			</FormInput>
		</div>
	);
}

export default DefaultnickName;
