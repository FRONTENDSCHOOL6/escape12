import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/Headerback';
import { useNavigate } from 'react-router-dom';

function AddCommunity() {
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const currentDate = new Date();
  const navigate = useNavigate();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  
  const handleSaveClick = () => {
    // 선택한 파일 확인
    if (selectedFile) {
      // 파일 업로드 API 추가
    }
    // 페이지 이동
    navigate('/mypage');
  };

  return (
    <>
      <Helmet>
        <title>글 작성</title>
      </Helmet>
      <div className='w-full max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center h-full m-auto text-lg gap-4 min-h-[100vh]'>
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
          {/* 파일 업로드 추가 */}
          <div>
            <input type='file' onChange={handleFileChange} className='w-80 mt-2' />
          </div>
        </div>
        <div className='text-center pt-4'>
          <Button onClick={handleSaveClick} bg='bg-ec1' text='text-ec4'>
            등록
          </Button>
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
