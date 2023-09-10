import Header from '@/components/Header';
import PlusNav from '@/components/PlusNav';
import SearchInput from '@/components/SearchInput';
import LiButton from '@/components/theme/LiButton';
import ThemeItem from '@/components/theme/ThemeItem';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

function Theme() {
	const [data, setData] = useState([]);
	const [levelSort, setLevelSort] = useState(false);
	const [showPlusNav, setShowPlusNav] = useState(false);

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

	//데이터 불러오기
	useEffect(() => {
		const pb = new PocketBase('https://refresh.pockethost.io');

		const dataList = async () => {
			const record = await pb.collection('escapeList').getList(1, 200, {
				expand: 'store, point, field, grade, level, image, link',
			});

			try {
				setData(record.items);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		dataList();
	}, []);

	//인기순 정렬하기
	const handleLevelSort = () => {
		levelSort ? setLevelSort(false) : setLevelSort(true);

		const pb = new PocketBase('https://refresh.pockethost.io');

		const levelDataSort = async () => {
			const down = await pb.collection('escapeList').getFullList({
				sort: 'grade',
			});

			const up = await pb.collection('escapeList').getFullList({
				sort: '-grade',
			});
			levelSort ? setData(down) : setData(up);
		};

		levelDataSort();
	};

	//지역별 강남 정렬하기
	const handleGangnam = () => {
		const pb = new PocketBase('https://refresh.pockethost.io');

		const regionGangNam = async () => {
			const gangnam = await pb.collection('escapeList').getFullList({
				filter: 'region = "강남"',
			});

			try {
				setData(gangnam);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		regionGangNam();
	};

	//지역별 홍대 정렬하기
	const handleHongDae = () => {
		const pb = new PocketBase('https://refresh.pockethost.io');

		const regionHongDae = async () => {
			const hongdae = await pb.collection('escapeList').getFullList({
				filter: 'region = "홍대"',
			});

			try {
				setData(hongdae);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		regionHongDae();
	};

	return (
		<>
			<Helmet>
				<title>방탈러-인기 테마</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				<Header>인기 테마</Header>
				<SearchInput placeholder="검색어를 입력해주세요 😀">검색</SearchInput>
				<ul className="text-ec1 text-lg flex justify-end w-full pr-20 s:pr-12 gap-8">
					<li>
						<LiButton onClick={handleGangnam}>강남</LiButton>
					</li>
					<li>
						<LiButton onClick={handleHongDae}>홍대</LiButton>
					</li>
					<li>
						<LiButton onClick={handleLevelSort}>
							{levelSort ? '인기순 ↑' : '인기순 ↓'}
						</LiButton>
					</li>
				</ul>
				<ul className="w-full px-20 s:px-12">
					{data.map((item) => {
						return (
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
							</li>
						);
					})}
				</ul>
				<PlusNav
					topClick={handleTopButton}
					pencilClick={handleRecordButton}
					hidden={!showPlusNav ? 'hidden' : ''}
				/>
			</div>
		</>
	);
}

export default Theme;
