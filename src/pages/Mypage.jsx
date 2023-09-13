import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Header from '@/components/Header';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import pb from '@/api/pockethost';

function Mypage() {
  const navigate = useNavigate();
  const [data, setData] = useState('')
  const [records, setRecords] = useState([])
	const [isLoading, setIsLoading] = useState(false);
  //user 정보가 들어왔을 때 로그아웃 기능 구현
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/editpage');
  };

  useEffect(() => {
    const getrecord = async () => {
      const recordlist = await pb.collection('record').getFullList();
      
      try {
        setRecords(recordlist);
        setIsLoading(true);
      } catch (error) {
        console.log(error)
        }
    }
    const datalist = async () => {
      const resultList = await pb.collection('users').getOne('b73e9sjwiu6hglx', {
        expand: 'email',
      });
      try {
        setData(resultList);
        setIsLoading(true);
      } catch (error) {
        console.log(error)
      }

    }
    getrecord(),
    datalist()
  }, [])


  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
        {/* header, headerback 맨 위 고정 */}
        <Header>마이페이지</Header>
        {!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}

        {isLoading && (
        <div className="flex-1 flex flex-col items-center">
        <img
						className="w-[30%] mx-auto rounded-full"
						src="https://mblogthumb-phinf.pstatic.net/MjAxOTAxMjNfMjI5/MDAxNTQ4MTcxMTE2MTI4.nv3-mRR-cZiGBxCD_KuMH8OsQ-WDJEJ9kTTBwb2XlkUg.WKv1PpzrR2s0duklK1AemD8cmGDAvRre7yrJG1okdZ8g.JPEG.seooooya/IMG_2063.JPG?type=w800"
						alt="사용자 사진"
						aria-hidden
					/>
          <ul className="s:px-12 p-12 text-xl space-y-4">
            <li>아이디 | {data.email} </li>
            <li>비밀번호 | ******** </li>
            <li>닉네임 | {data.nickName} </li>
          </ul>
          <Button
            onClick={() => { navigate('/editpage'); }}
            bg="bg-ec1"
            text="text-ec4"
          >정보수정
          </Button>
          <ul className="w-80 s:px-12 border-2 p-12 text-xl space-y-4 mt-8 text-center">
            <li>
              내가 작성한 기록 :
              <Link to="/recordpage" className="hover:text-ec5"> {records.length} 개</Link>
            </li>
            <li>
              내가 작성한 글 :
              <Link to="/mypage" className="hover:text-ec5"> {records.length} 개</Link></li>
            <li>
              내가 작성한 댓글 :
              <Link to="/mypage" className="hover:text-ec5"> {records.length} 개</Link></li>
            <li
            >
              <Link to="/mypage" className="hover:text-ec5">
                ⭐ 즐겨찾기 바로가기 </Link></li>
          </ul>
          <Button
            onClick={handleLogout}
            bg="bg-ec1 text-center mt-8"
            text="text-ec4"
          >
            로그아웃
          </Button>
        </div>
        )}</div>
      <Nav />
    </>
  );
}

export default Mypage;
