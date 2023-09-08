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
      <div className='w-full max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center justify-center h-screen m-auto text-lg gap-4 min-h-[100vh]'>
        {/* header, headerback 맨 위 고정 */}
        <div className='max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0'>
          <Header>마이페이지</Header>
        </div>
        <div className='flex-1 flex flex-col items-center'>
          <div className='text-xl pt-40'>
            <p className='pb-2'>아이디| 12조 최고 ~ </p>
            <p className='pb-2'>비밀번호| ********</p>
            <p className='pb-2'>닉네임| </p>
          </div>
          <div className='text-center pt-4'>
            <Button onClick={() => { navigate('/editpage'); }} bg="bg-ec1" text="text-ec4">정보수정</Button>
          </div>
          <div className='border-2 m-4 p-8 text-lg rounded-xl text-center'>
            <p className>내가 작성한 기록: n개 </p>
            <p className>내가 작성한 글: n개</p>
            <p className>내가 작성한 댓글: n개 </p>
            <p className>⭐ 즐겨찾기 </p>
          </div>
          <div className='text-center pt-4'>
            <Button onClick={handleLogout} bg='bg-ec1' text='text-ec4'>
              로그아웃
            </Button>
          </div>
        </div>
      </div>
      {/* nav 맨 밑 고정 */}
      <div className='max-w-[600px] min-w-[320px] m-auto fixed bottom-0 left-0 right-0'>
        <Nav></Nav>
      </div>
    </>
  );
}

export default Mypage;
