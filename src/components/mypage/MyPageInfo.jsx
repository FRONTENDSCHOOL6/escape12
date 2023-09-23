import { string } from 'prop-types';

MypageInfo.propTypes = {
  email: string,
  nickName: string,
}


function MypageInfo({email, nickName}) {

  return (
    <ul className="s:px-12 p-8 text-xl space-y-4">
      <li aria-label={'아이디 ' + `${email}`} tabIndex="0">
        아이디 | {email}
      </li>
      <li aria-label={'비밀번호 '} tabIndex="0">
        비밀번호 | ********
      </li>
      <li aria-label={'닉네임 ' + `${nickName}`} tabIndex="0">
        닉네임 | {nickName}
      </li>
    </ul>
  );
}

export default MypageInfo;
