import { Helmet } from 'react-helmet-async';
import { getUserInfoFromStorage } from '@/api/getUserInfo';
import Button from '@/components/button/Button';
import Nav from '@/components/nav/Nav';
import Header from '@/components/header/Header';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import pb from '@/api/pockethost';
import { toast } from 'react-hot-toast';
import socialImg from '@/assets/socialImg.png'

function Mypage() {
	const userUId = getUserInfoFromStorage();
	const navigate = useNavigate();
	const [data, setData] = useState('');
	const [records, setRecords] = useState([]);
	const [community, setCommunity] = useState([]);
	const [comment, setComment] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const KAKAO_CLIENT_ID = '7e2f5729e497d2295073a752a34b20c2';
	const KAKAO_LOGOUT_REDIRECT_URI = 'http://localhost:5173';

	//로그아웃
	const handleLogout = async () => {
		if (data.social.includes('kakao')) {
			location.replace(
				`https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_CLIENT_ID}&logout_redirect_uri=${KAKAO_LOGOUT_REDIRECT_URI}`
			);

			toast('로그아웃이 완료되었습니다', {
				icon: '⭕',
				duration: 500,
			});
		} else {
			toast('로그아웃이 완료되었습니다', {
				icon: '⭕',
				duration: 500,
			});

			setTimeout(() => {
				pb.authStore.clear();
			}, 500);

			navigate('/loginselete');
		}

		if (data.avatar) {
			toast('로그아웃이 완료되었습니다', {
				icon: '⭕',
				duration: 500,
			});

			setTimeout(() => {
				pb.authStore.clear();
			}, 500);

			navigate('/loginselete');
		}
	};

	//작성 기록 갯수
	useEffect(() => {
		const getrecord = async () => {
			const recordlist = await pb
				.collection('record')
				.getFullList({ filter: `author = "${userUId?.model.id}"` });

			try {
				setRecords(recordlist);
				setIsLoading(true);
			} catch (error) {
				console.log(error);
			}
		};
		//작성 글 갯수
		const getcommunity = async () => {
			const communitylist = await pb
				.collection('community')
				.getFullList({ filter: `author = "${userUId?.model.id}"` });

			try {
				setCommunity(communitylist);
				setIsLoading(true);
			} catch (error) {
				console.log(error);
			}
		};
		//작성 댓글 갯수
		const getcomment = async () => {
			const commentlist = await pb
				.collection('comment')
				.getFullList({ filter: `author = "${userUId?.model.id}"` });

			try {
				setComment(commentlist);
				setIsLoading(true);
			} catch (error) {
				console.log(error);
			}
		};
		//아이디, 닉네임 정보 불러오기 +사진
		const datalist = async () => {
			const resultList = await pb
				.collection('users')
				.getOne(`${userUId?.model.id}`, {
					expand: 'email',
				});
			try {
				setData(resultList);
				setIsLoading(true);
			} catch (error) {
				console.log(error);
			}
		};
		getcomment(), getrecord(), getcommunity(), datalist();
	}, [userUId?.model.id]);

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
						<div className="w-40 h-40">
							<img
								src={data.avatar?`https://refresh.pockethost.io/api/files/${data.collectionId}/${data.id}/${data.avatar}`:!data.social||data.social==="http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg"?`${socialImg}`:data.social}
								alt={data.nickName}
								aria-hidden
								className="w-full h-full rounded-full"
							></img>
						</div>
						<ul className="s:px-12 p-8 text-xl space-y-4">
							<li>아이디 | {data.email} </li>
							<li>비밀번호 | ******** </li>
							<li>닉네임 | {data.nickName} </li>
						</ul>
						<Button
							onClick={() => {
								navigate('/editpage');
							}}
							bg="bg-ec1"
							text="text-ec4"
						>
							정보수정
						</Button>
						<ul className="w-80 s:px-12 rounded-lg border-2 p-12 text-xl space-y-4 mt-8 text-center">
							<li>
								내가 작성한 기록 :
								<Link to="/myrecord" className="hover:text-ec5">
									{records.length} 개
								</Link>
							</li>
							<li>
								내가 작성한 글 :
								<Link to="/mycommunity" className="hover:text-ec5">
									{community.length} 개
								</Link>
							</li>
							<li>
								내가 작성한 댓글 :
								<Link to="/mycomment" className="hover:text-ec5">
									{comment.length} 개
								</Link>
							</li>
							<li>
								<Link to="/bookmark" className="hover:text-ec5">
									⭐ 즐겨찾기 바로가기
								</Link>
							</li>
						</ul>
						<Button
							onClick={handleLogout}
							bg="bg-ec1 text-center mt-8"
							text="text-ec4"
						>
							로그아웃
						</Button>
					</div>
				)}
			</div>
			<Nav />
		</>
	);
}

export default Mypage;
