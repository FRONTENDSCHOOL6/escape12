import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

function Mypage() {
  const navigate = useNavigate();
  //user 정보가 들어왔을 때 로그아웃 기능 구현
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/editpage');
  };

  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
        {/* header, headerback 맨 위 고정 */}
        <Header>마이페이지</Header>
        <div className='flex-1 flex flex-col items-center'>
          <div className='text-xl pt-20'>
            <p className='pb-2'>아이디| 12조 최고 ~ </p>
            <p className='pb-2'>비밀번호| ********</p>
            <p className='pb-2'>닉네임| </p>
          </div>
          <Button
            onClick={() => { navigate('/editpage'); }} bg="bg-ec1"
            text="text-ec4 mt-4"
          >정보수정
          </Button>
          <div className="border-2 m-4 p-8 text-xl rounded-xl text-center">
            <p className>내가 작성한 기록: n개 </p>
            <p className>내가 작성한 글: n개</p>
            <p className>내가 작성한 댓글: n개 </p>
            <p className>⭐ 즐겨찾기 </p>
          </div>
          <Button
            onClick={handleLogout}
            bg="bg-ec1 text-center"
            text="text-ec4 mt-4"
          >
            로그아웃
          </Button>
        </div>
      </div>
      <Nav />
    </>
  );
}

export default Mypage;
