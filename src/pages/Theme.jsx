import Header from '@/components/Header';
import PlusNav from '@/components/PlusNav';
import SearchInput from '@/components/SearchInput';
import ThemeItem from '@/components/theme/ThemeItem';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

function Theme() {
	const [data, setData] = useState([]);
	const [scrollY, setScrollY] = useState(0);
	const [showPlusNav, setShowPlusNav] = useState(false);
	const pb = new PocketBase('https://refresh.pockethost.io');

	//데이터 불러오기
	const dataList = async () => {
		const record = await pb.collection('escapeList').getList(1, 10, {
			expand: 'store, point, field, grade, level, image, link',
		});

		try {
			setData(record.items);
			console.log('데이터 성공');
			console.log(data);
		} catch (err) {
			console.log(`에러 내용: ${err}`);
		}
		// console.log(record.items[0].store);
	};

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

	useEffect(() => {
		dataList();
	}, []);

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
					<li>지역별(강남/홍대)</li>
				</ul>
				<ul>
					{data.map((item) => {
						<li key={item.id}>
							<ThemeItem
								store={item.store}
								point={item.point}
								theme={item.theme}
								grade={item.grade}
								level={item.level}
								image={item.image}
								link={item.link}
							/>
						</li>;
					})}
				</ul>
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
