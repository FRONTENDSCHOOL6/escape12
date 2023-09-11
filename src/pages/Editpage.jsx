import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/HeaderBack';
import { useNavigate } from 'react-router-dom';

function Editpage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>정보 수정</title>
      </Helmet>
      <div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
        {/* header, headerback 맨 위 고정 */}
        <div className='max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0'>
          <Headerback onClick={() => { navigate('/mypage'); }}>정보 수정</Headerback>
        </div>
        <div className='flex-1 flex flex-col items-center'>
          <div className='text-xl pt-40'>
            <p className='pb-2'>아이디| 12조 최고 ~ </p>
            <p className='pb-2'>비밀번호| ********</p>
            <p className='pb-2'>닉네임| </p>
          </div>
            <Button 
            onClick={() => { navigate('/mypage'); }} bg='bg-ec1' 
            text='text-ec4 mt-4'>저장</Button>
        </div>
      </div>
      <Nav />
    </>
  );
}

export default Editpage;
