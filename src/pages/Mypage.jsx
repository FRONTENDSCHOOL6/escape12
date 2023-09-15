import { Helmet } from 'react-helmet-async';
import Button from '@/components/button/Button';
import Nav from '@/components/nav/Nav';
import Header from '@/components/header/Header';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import pb from '@/api/pockethost';
import userUId from '@/api/userUid';

function Mypage() {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [records, setRecords] = useState([]);
  const [community, setCommunity] = useState([]);
  const [comment, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //로그아웃
  const handleLogout = () => {
    pb.authStore.clear();
  };
  //작성 기록 갯수
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
    //작성 글 갯수
    const getcommunity = async () => {
      const communitylist = await pb.collection('community').getFullList();

      try {
        setCommunity(communitylist);
        setIsLoading(true);
      } catch (error) {
        console.log(error)
      }
    }
    //작성 댓글 갯수
    const getcomment = async () => {
      const commentlist = await pb.collection('comment').getFullList();

      try {
        setComment(commentlist);
        setIsLoading(true);
      } catch (error) {
        console.log(error)
      }
    }
    //아이디, 닉네임 정보 불러오기
    const datalist = async () => {
      const resultList = await pb.collection('users').getOne(`${userUId?.model.id}`, {
        expand: 'email',
      });
      try {
        setData(resultList);
        setIsLoading(true);
      } catch (error) {
        console.log(error)
      }

    }
    getcomment(),
      getrecord(),
      getcommunity(),
      datalist()
  }, [])


  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative mb-4">
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
            <ul className="w-80 s:px-12 rounded-lg border-2 p-12 text-xl space-y-4 mt-8 text-center">
              <li>
                내가 작성한 기록 :
                <Link to="/recordpage" className="hover:text-ec5"> {records.length} 개</Link>
              </li>
              <li>
                내가 작성한 글 :
                <Link to="/mypage" className="hover:text-ec5"> {community.length} 개</Link></li>
              <li>
                내가 작성한 댓글 :
                <Link to="/mypage" className="hover:text-ec5"> {comment.length} 개</Link></li>
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
