import { Helmet } from 'react-helmet-async';
import { getUserInfoFromStorage } from '@/api/getUserInfo';
import Button from '@/components/button/Button';
import Nav from '@/components/nav/Nav';
import Header from '@/components/header/Header';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import pb from '@/api/pockethost';
import { toast } from 'react-hot-toast';
import socialImg from '@/assets/socialImg.png';
import useMyPage from '@/hooks/useMyPage';
import MyPageImage from '@/components/mypage/MyPageImage';
import MyPageInfo from '@/components/mypage/MyPageInfo';
import MyPageData from '@/components/mypage/MyPageData';

function MyPage() {
	const userUId = getUserInfoFromStorage();
	const navigate = useNavigate();
	const [data, setData] = useState('');
	const [records, setRecords] = useState([]);
	const [community, setCommunity] = useState([]);
	const [comment, setComment] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const KAKAO_CLIENT_ID = '7e2f5729e497d2295073a752a34b20c2';
	const KAKAO_LOGOUT_REDIRECT_URI = 'https://escape12.netlify.app';

	const handleLogout = async () => {
		if (data.social.includes('kakao')) {
			location.replace(
				`https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_CLIENT_ID}&logout_redirect_uri=${KAKAO_LOGOUT_REDIRECT_URI}`
			);

			toast('로그아웃이 완료되었습니다', {
				icon: '⭕',
				duration: 500,
			});
		} else if (data.social) {
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

	const handleSecession = () => {
		const result = confirm('😢 정말로 탈퇴하실 건가요....?');

		if (result) {
			pb.collection('users').delete(`${userUId.model.id}`);
			toast('탈퇴가 완료 되었습니다', {
				icon: '🙁',
				duration: 2000,
			});
		}
	};

	const myPageData = useMyPage();

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

		if (myPageData.data) {
			setData(myPageData.data);
			setIsLoading(true);
		}
		getcomment(), getrecord(), getcommunity();
	}, [myPageData.data, userUId?.model.id]);

	return (
		<>
			<Helmet>
				<title>마이페이지</title>
				<meta name="description" content="방탈러 홈페이지-마이페이지" />
				<meta property="og:title" content="방탈러 마이페이지" />
				<meta property="og:description" content="방탈러 마이페이지 페이지" />
				<meta property="og:url" content="https://escape12.netlify.app/mypage" />
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] flex flex-col items-center min-h-[100vh] m-auto py-20 relative mb-4 bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-lg">
				<Header>마이페이지</Header>
				{myPageData.isLoading ||
					(!isLoading && (
						<div className="absolute top-1/2 -translate-y-1/2">
							<Spinner />
						</div>
					))}
				{isLoading && data && records && comment && community && (
					<div className="flex-1 flex flex-col items-center">
						<MyPageImage
							src={
								data.avatar
									? `https://refresh.pockethost.io/api/files/${data.collectionId}/${data.id}/${data.avatar}`
									: !data.social ||
									  data.social ===
											'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'
									? `${socialImg}`
									: data.social
							}
							alt={data.nickName}
						/>
						<MyPageInfo email={data.email} nickName={data.nickName} />

						<Button
							onClick={() => {
								navigate('/editpage');
							}}
						>
							정보수정
						</Button>
						<MyPageData
							records={records.length}
							community={community.length}
							comment={comment.length}
						/>
						<Button onClick={handleLogout} bg="text-center mt-8">
							로그아웃
						</Button>
						<div className="flex flex-col items-center pt-4 flex-1">
							<button type="button" onClick={handleSecession}>
								회원 탈퇴
							</button>
						</div>
					</div>
				)}
			</div>
			<Nav />
		</>
	);
}

export default MyPage;
