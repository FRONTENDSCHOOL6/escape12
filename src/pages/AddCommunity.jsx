import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/Headerback';
import { useState } from 'react';

function AddCommunity() {
  const [content, setContent] = useState('');
  const currentDate = new Date();
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>글 작성</title>
      </Helmet>
      <div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center h-screen m-auto text-lg gap-10">
        <Headerback>글 작성</Headerback>
        <div className='p-3 text-xl'>
          <div className="flex justify-end mb-3">
            <p className="text-lg">작성 날짜: {currentDate.toLocaleDateString()}</p>
          </div>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="글을 입력하세요."
            className="w-80 h-80 p-4 text-ec4 border rounded-lg"
          ></textarea>
        </div>
        <Button path="/mypage" type="submit" bg="bg-ec1" text="text-ec4">등록</Button>
      </div>
      <div className="max-w-[600px] min-w-[320px] m-auto">
        <Nav></Nav>
      </div>
    </>
  );
}

export default AddCommunity;
