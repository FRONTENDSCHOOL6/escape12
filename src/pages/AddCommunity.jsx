import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/Headerback';
import FormInput from '@/components/loginsignup/FormInput';
import Sup from '@/components/record/Sup';
import { useNavigate } from 'react-router-dom';

function AddCommunity() {
  const [content, setContent] = useState('');
  const currentDate = new Date();
  const navigate = useNavigate();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSaveClick = () => {
    navigate('/mypage');
  };

  return (
    <>
      <Helmet>
        <title>글 작성</title>
      </Helmet>
      <div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
        {/* Header */}
        <Headerback onClick={() => { navigate('/postpage'); }}>글 작성</Headerback>
        <div className="text-xl pt-28 s:px-12 px-14">
          {/* Title, Content */}
          <div className="flex flex-col space-y-2 text-center">
            <FormInput
              type="text"
              name="title"
              placeholder="제목을 입력해주세요."
              required
            >
              <Sup>제목</Sup>
            </FormInput>
            <p className="flex justify-end mb-3 text-lg">
              {currentDate.toLocaleDateString()}
            </p>
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="작성해주세요."
              className="w-full h-80 p-4 text-ec4 border rounded-lg"
            />
          </div>
        </div>
        <Button
          onClick={handleSaveClick}
          bg="bg-ec1 text-center"
          text="text-ec4 mt-4"
        >
          등록
        </Button>
      </div>
      <Nav />
    </>
  );
}

export default AddCommunity;