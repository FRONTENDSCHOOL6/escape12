import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

function Mypage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <div className="w-full max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center h-screen m-auto text-lg gap-4 min-h-[100vh]">
        <Header>마이페이지</Header>
        <div className="grow flex-1">
          <div className="text-xl">
            <p className="p-2">아이디| 12조 최고 ~ </p>
            <p className="p-2">비밀번호| ********</p>
            <p className="p-2">닉네임| </p>
          </div>
          <div className="text-center">
            <Button onClick={() => { navigate('/editpage'); }} bg="bg-ec1" text="text-ec4">정보수정</Button>
          </div>
          <div className="border-2 m-4 p-8 text-lg rounded-xl">
            <p className="p-2">내가 작성한 기록: n개 </p>
            <p className="p-2">내가 작성한 글: n개</p>
            <p className="p-2">내가 작성한 댓글: n개 </p>
            <p className="p-2">⭐ 즐겨찾기 </p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[600px] min-w-[320px] m-auto fixed bottom-0 left-0 right-0">
      </div>
      <div className="max-w-[600px] min-w-[320px] m-auto fixed bottom-0 left-0 right-0">
        <Nav></Nav>
      </div>
    </>
  );
}

export default Mypage;