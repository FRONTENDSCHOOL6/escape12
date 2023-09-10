import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/Headerback';
import { useNavigate } from 'react-router-dom';

function AddCommunity() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };


  return (
    <>
      <Helmet>
        <title>클리어</title>
      </Helmet>
      <div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
        {/* header, headerback 맨 위 고정 */}
        <Headerback onClick={() => { navigate('/theme'); }}>클리어</Headerback>
        <div className='flex-1 flex flex-col items-center text-center s:px-12 px-14 w-full'>
          <div className='text-xl pt-28 mb-3'>
            <p className='pb-2'>[테마명]</p>
            <p className='pb-2'>난이도| [난이도]</p>
            <p className='pb-2'>업체명| [업체명]</p>
            <p className='pb-2'>날짜| [00-00-00]</p>
            <p className='pb-2'>평점| [평점]/10 </p>
            <p className='pb-2'>남은시간| [남은시간]LEFT </p>
            <p className='pb-2'>사진| [사진~]</p>
          </div>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder='글을 입력해주세요.'
            className='w-full h-20 p-4 text-ec4 border rounded-lg'
          ></textarea>
          <Button
            onClick={() => { navigate('/editpage'); }}
            bg="bg-ec1 text-center"
            text="text-ec4 mt-4">
            등록
          </Button>
        </div>
      </div>
      <Nav/>
    </>
  );
}

export default AddCommunity;
