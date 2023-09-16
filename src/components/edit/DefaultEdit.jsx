import { string } from 'prop-types';
import FormInput from '../loginsignup/FormInput';

DefaultnickName.propTypes = {
	nickName:string,
  nickNameEvent:string,
};

function DefaultnickName({ nickName, nickNameEvent }) {
	return (
		<>
			<FormInput
				nickName="nickName"
				placeholder="닉네임"
				maxLength="20"
				defaultValue={nickName}
				onChange={nickNameEvent}
			>
				테마명
			</FormInput>
		</>
	);
}

export default DefaultnickName;
