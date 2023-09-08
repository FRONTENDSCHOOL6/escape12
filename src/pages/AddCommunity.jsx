import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/Headerback';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCommunity() {
  const [content, setContent] = useState('');
  const currentDate = new Date();
  const navigate = useNavigate();
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>글 작성</title>
      </Helmet>
      <div className='w-full max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center h-screen m-auto text-lg gap-4 min-h-[100vh]'>
        {/* header, headerback 맨 위 고정 */}
        <div className='max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0'>
          <Headerback>글 작성</Headerback>
        </div>
        <div className='text-xl pt-28'>
          <div className='flex justify-end mb-3'>
            <p className='text-lg'>작성 날짜: {currentDate.toLocaleDateString()}</p>
          </div>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder='글을 입력하세요.'
            className='w-80 h-80 p-4 text-ec4 border rounded-lg'
          ></textarea>
        </div>
        <div className='text-center pt-4'>
            <Button onClick={() => { navigate('/editpage'); }} bg='bg-ec1' text='text-ec4'>저장</Button>
          </div>
      </div>
      {/* nav 맨 밑 고정 */}
      <div className='max-w-[600px] min-w-[320px] m-auto fixed bottom-0 left-0 right-0'>
        <Nav></Nav>
      </div>
    </>
  );
}

export default AddCommunity;
