import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/HeaderBack';

function Editpage() {
  return (
    <>
      <Helmet>
        <title>정보 수정</title>
      </Helmet>
      <div className="relative w-full max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center h-screen m-auto text-lg gap-10">
        <Headerback>정보 수정</Headerback>
        <div className="flex flex-col items-center h-screen gap-10">
          <div className="text-xl mt-14">
            <p className="p-3">아이디| 12조 최고 ~ </p>
            <p className="p-3">비밀번호| ********</p>
            <p className="p-3">닉네임| </p>
          </div>
          <Button path="/mypage" bg="bg-ec1" text="text-ec4">저장</Button>
        </div>
        <div className="w-full max-w-[600px] min-w-[320px] m-auto">
          <Nav></Nav>
        </div>
      </div>
    </>
  );
}

export default Editpage;
