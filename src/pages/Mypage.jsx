import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import pb from '@/api/pockethost';

function Mypage() {
	const navigate = useNavigate();
	const [data, setData] = useState('');
	//user 정보가 들어왔을 때 로그아웃 기능 구현
	const handleLogout = () => {
		localStorage.removeItem('user');
		navigate('/editpage');
	};

	useEffect(() => {
		const datalist = async () => {
			const resultList = await pb.collection('users').getOne('b73e9sjwiu6hglx');

			try {
				setData(resultList);
			} catch (error) {
				console.log(error);
			}
		};
		datalist();
	}, []);

	return (
		<>
			<Helmet>
				<title>마이페이지</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				{/* header, headerback 맨 위 고정 */}
				<Header>마이페이지</Header>

				<div className="flex-1 flex flex-col items-center">
					<div className="text-xl pt-20">
						<p className="pb-2">아이디| {data.email} </p>
						<p className="pb-2">비밀번호| ********</p>
						<p className="pb-2">닉네임| {data.nickName}</p>
					</div>
					<Button
						onClick={() => {
							navigate('/editpage');
						}}
						bg="bg-ec1"
						text="text-ec4 mt-8"
					>
						정보수정
					</Button>
					<div className="border-2 p-8 mt-32 text-xl rounded-xl text-center">
						<p className>내가 작성한 기록: n개 </p>
						<p className>내가 작성한 글: n개</p>
						<p className>내가 작성한 댓글: n개 </p>
						<p className>⭐ 즐겨찾기 </p>
					</div>
					<Button
						onClick={handleLogout}
						bg="bg-ec1 text-center mt-8"
						text="text-ec4"
					>
						로그아웃
					</Button>
				</div>
			</div>
			<Nav />
		</>
	);
}

export default Mypage;
