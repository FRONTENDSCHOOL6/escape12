import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import pb from '@/api/pockethost';
import PlusNav from '@/components/PlusNav';
import { useNavigate } from 'react-router-dom';
import Community from '@/components/mycommunity/CommunityItem';

pb.autoCancellation(false);

function Mycommunity() {
	const [posts, setPosts] = useState([]);
	const [IsLoading, setIsLoading] = useState(false);
	const [showPlusNav, setShowPlusNav] = useState(false);
	const navigate = useNavigate();

	//기록하기 버튼 이벤트
	const handleRecordButton = () => {
		navigate('/addcommunity');
	};

	//스크롤탑 버튼 이벤트
	const handleTopButton = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	//스크롤 이벤트 감지
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (
				(currentScrollY >= 500 && !showPlusNav) ||
				(currentScrollY < 500 && showPlusNav)
			) {
				setShowPlusNav(currentScrollY >= 500);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [showPlusNav]);
	// 포켓호스트 가져오기
	useEffect(() => {
		const Snslist = async () => {
			const communitypost = await pb.collection('community').getList(1, 200, {
				expand: 'comment,author',
				sort: '-created',
			});
			setIsLoading(true);

			try {
				setPosts(communitypost.items);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			}
		};

		Snslist();
	}, []);

	return (
		<>
			<Helmet>
				<title>내가쓴커뮤글</title>
			</Helmet>

			<div className="w-full max-w-[600px] min-w-[320px] py-20 bg-ec4 flex flex-col items-center min-h-[100vh] m-auto gap-14">
				<Header>내가쓴커뮤글</Header>

				<div className="min-w-[300px] w-full s:px-12 px-20">
					<Community />
				</div>
				<PlusNav
					topClick={handleTopButton}
					pencilClick={handleRecordButton}
					hidden={!showPlusNav ? 'hidden' : ''}
				/>
			</div>
		</>
	);
}

export default Mycommunity;
