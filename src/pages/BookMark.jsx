import Headerback from '@/components/header/Headerback';
import UpNav from '@/components/nav/UpNav';
import ThemeItem from '@/components/theme/ThemeItem';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function BookMark() {
	const [showPlusNav, setShowPlusNav] = useState(false);
	const navigate = useNavigate();

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

	return (
		<>
			<Helmet>
				<title>즐겨찾기</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				<Headerback
					onClick={() => {
						navigate('/mypage');
					}}
				>
					즐겨찾기
				</Headerback>
				<ul>
					<ThemeItem
						image="https://blog.kakaocdn.net/dn/N7Dgj/btrHVz75l25/offKewdp8ZCnb9uqM7SuV0/img.png"
						theme="사람들은 그것을 행복이라 부르기로 했다"
						grade={8}
						store="단편선"
						point="강남"
						field="스토리"
						level={8}
					/>
					<ThemeItem
						image="https://blog.kakaocdn.net/dn/N7Dgj/btrHVz75l25/offKewdp8ZCnb9uqM7SuV0/img.png"
						theme="사람들은 그것을 행복이라 부르기로 했다"
						grade={8}
						store="단편선"
						point="강남"
						field="스토리"
						level={8}
					/>
					<ThemeItem
						image="https://blog.kakaocdn.net/dn/N7Dgj/btrHVz75l25/offKewdp8ZCnb9uqM7SuV0/img.png"
						theme="사람들은 그것을 행복이라 부르기로 했다"
						grade={8}
						store="단편선"
						point="강남"
						field="스토리"
						level={8}
					/>
					<ThemeItem
						image="https://blog.kakaocdn.net/dn/N7Dgj/btrHVz75l25/offKewdp8ZCnb9uqM7SuV0/img.png"
						theme="사람들은 그것을 행복이라 부르기로 했다"
						grade={8}
						store="단편선"
						point="강남"
						field="스토리"
						level={8}
					/>
					<ThemeItem
						image="https://blog.kakaocdn.net/dn/N7Dgj/btrHVz75l25/offKewdp8ZCnb9uqM7SuV0/img.png"
						theme="사람들은 그것을 행복이라 부르기로 했다"
						grade={8}
						store="단편선"
						point="강남"
						field="스토리"
						level={8}
					/>
					<ThemeItem
						image="https://blog.kakaocdn.net/dn/N7Dgj/btrHVz75l25/offKewdp8ZCnb9uqM7SuV0/img.png"
						theme="사람들은 그것을 행복이라 부르기로 했다"
						grade={8}
						store="단편선"
						point="강남"
						field="스토리"
						level={8}
					/>
					<ThemeItem
						image="https://blog.kakaocdn.net/dn/N7Dgj/btrHVz75l25/offKewdp8ZCnb9uqM7SuV0/img.png"
						theme="사람들은 그것을 행복이라 부르기로 했다"
						grade={8}
						store="단편선"
						point="강남"
						field="스토리"
						level={8}
					/>
					<ThemeItem
						image="https://blog.kakaocdn.net/dn/N7Dgj/btrHVz75l25/offKewdp8ZCnb9uqM7SuV0/img.png"
						theme="사람들은 그것을 행복이라 부르기로 했다"
						grade={8}
						store="단편선"
						point="강남"
						field="스토리"
						level={8}
					/>
				</ul>
				<UpNav
					topClick={handleTopButton}
					hidden={!showPlusNav ? 'hidden' : ''}
				/>
			</div>
			;
		</>
	);
}

export default BookMark;
