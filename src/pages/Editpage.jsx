import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/HeaderBack';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FormInput from '@/components/loginsignup/FormInput';

function Editpage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>정보 수정</title>
      </Helmet>
      <div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
        {/* header, headerback 맨 위 고정 */}
        <Headerback onClick={() => {
          navigate('/mypage');
        }}
        >정보 수정</Headerback>
        <div className="flex-1 flex flex-col items-center">
          <div className="s:px-12 p-12 text-xl space-y-10">
          <img
						className="w-[30%] mx-auto rounded-full"
						src="https://mblogthumb-phinf.pstatic.net/MjAxOTAxMjNfMjI5/MDAxNTQ4MTcxMTE2MTI4.nv3-mRR-cZiGBxCD_KuMH8OsQ-WDJEJ9kTTBwb2XlkUg.WKv1PpzrR2s0duklK1AemD8cmGDAvRre7yrJG1okdZ8g.JPEG.seooooya/IMG_2063.JPG?type=w800"
						alt="사용자 사진"
						aria-hidden
					/>
          <FormInput
								type="email"
								name="id"
								placeholder="변경할 이메일"
							>
								아이디(이메일)
							</FormInput>
              <FormInput
								type="password"
								name="password"
								placeholder="변경할 비밀번호"
							>
								비밀번호
							</FormInput>
              <FormInput
								type="text"
								name="nickname"
								placeholder="닉네임"
							>
								닉네임
							</FormInput>
          </div>
          <Button
            onClick={() => { navigate('/mypage'); }} bg='bg-ec1'
            text='text-ec4 mt-4'>저장</Button>
          <footer className='mt-auto py-1'>
            <em><Link to="https://github.com/FRONTENDSCHOOL6/escape12/"target="_blank" rel="noopenner noreferrer">Copyright &copy; 2023 김건주, 김남진, 조수연</Link></em>
          </footer>
        </div>
      </div>
      <Nav />
    </>
  );
}

export default Editpage;

