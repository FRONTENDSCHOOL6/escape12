import Header from '@/components/Header';
import PlusNav from '@/components/PlusNav';
import SearchInput from '@/components/SearchInput';
import ThemeItem from '@/components/theme/ThemeItem';
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

function Theme() {
	const [scrollY, setScrollY] = useState(0);
	const [showPlusNav, setShowPlusNav] = useState(false);

	//스크롤 이벤트
	const handleScroll = () => {
		setScrollY(window.scrollY);
	};

	//기록하기 버튼 이벤트
	const handleRecordButton = () => {
		toast('기능 구현중입니다 :)', {
			icon: '🍮',
			duration: 2000,
		});
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
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// plusNav의 topButton 보이기 감지
	useEffect(() => {
		if (scrollY < 500) {
			setShowPlusNav(true);
		} else {
			setShowPlusNav(false);
		}
	}, [scrollY]);

	return (
		<>
			<Helmet>
				<title>방탈러-인기 테마</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				<Header>인기 테마</Header>
				<SearchInput placeholder="검색어를 입력해주세요 😀">검색</SearchInput>
				<ul className="text-ec1 text-lg flex justify-end w-full pr-20 s:pr-12 gap-8">
					<li>인기순</li>
					<li>테마별</li>
					<li>지역별</li>
				</ul>
				<ThemeItem />
				<ThemeItem />
				<ThemeItem />
				<ThemeItem />
				<ThemeItem />
				<ThemeItem />
				<ThemeItem />
				<PlusNav
					topClick={handleTopButton}
					pencilClick={handleRecordButton}
					hidden={showPlusNav ? 'hidden' : ''}
				/>
			</div>
		</>
	);
}

export default Theme;
