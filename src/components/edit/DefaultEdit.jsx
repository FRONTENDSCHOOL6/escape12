import { string } from 'prop-types';
import FormInput from '../loginsignup/FormInput';

DefaultnickName.propTypes = {
	nickName: string,
	nickNameEvent: string,
	email: string,
	emailEvent: string,
	password: string
};

function DefaultnickName({ nickName, nickNameEvent, email, emailEvent }) {
	return (
		<>
			<FormInput
				name="email"
				palceholder="이메일"
				mxLenght={25}
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
			>비밀번호
			</FormInput>
			<FormInput
				name="nickName"
				placeholder="닉네임"
				maxLength={20}
				defaultValue={nickName}
				onChange={nickNameEvent}
			>
				닉네임
			</FormInput>
		</>
	);
}

export default DefaultnickName;