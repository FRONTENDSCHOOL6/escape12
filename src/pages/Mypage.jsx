import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Header from '@/components/Header';

function Mypage() {
  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>

      {/* 진짜 페이지 부분 */}
      <div className="w-full max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center h-screen m-auto gap-14">
        <Header>마이페이지</Header>
        <div className='p-3 text-xl'>
          <p className="p-3">아이디| 12조 최고 ~ </p>
          <p className="p-3">비밀번호| ********</p>
          <p className="p-3">닉네임| </p>
        </div>
        <Button>정보수정</Button>
        <div className="border-2 p-6 text-lg rounded-xl">
          <p className="p-3">내가 작성한 기록 12조 최고 ~ </p>
          <p className="p-3">내가 작성한 글 ********</p>
          <p className="p-3">내가 작성한 댓글 </p>
          <p className="p-3">⭐ 즐겨찾기 </p>
        </div>
        <Nav></Nav>
      </div>


    </>
  );
}

export default Mypage;