import EmptyContents from '@/components/EmptyContents';
import Header from '@/components/Header';
import PlusNav from '@/components/PlusNav';
import SearchInput from '@/components/SearchInput';
import Spinner from '@/components/Spinner';
import LiButton from '@/components/theme/LiButton';
import ThemeItem from '@/components/theme/ThemeItem';
import debounce from '@/utils/debounce';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

const pb = new PocketBase('https://refresh.pockethost.io');

function Theme() {
	const [data, setData] = useState([]);
	const [levelSort, setLevelSort] = useState(false);
	const [gradeSort, setGradeSort] = useState(false);
	const [showPlusNav, setShowPlusNav] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [emptyData, setEmptyData] = useState(false);

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
		const dataList = async () => {
			const record = await pb.collection('escapeList').getList(1, 200, {
				expand: 'store, point, field, grade, level, image, link',
			});

			setIsLoading(true);

			try {
				setData(record.items);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			}
		};
		dataList();
	}, []);

	//인기순 정렬하기
	const handleGradeSort = () => {
		gradeSort ? setGradeSort(false) : setGradeSort(true);

		const gradeDataSort = async () => {
			const down = await pb.collection('escapeList').getFullList({
				sort: 'grade',
			});

			const up = await pb.collection('escapeList').getFullList({
				sort: '-grade',
			});

			setIsLoading(true);

			try {
				levelSort ? setData(down) : setData(up);
			} catch (err) {
				console.log(`인기순 정렬 에러: ${err}`);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			}
		};

		gradeDataSort();
	};

	//난이도별 정리하기
	const handleLevelSort = () => {
		levelSort ? setLevelSort(false) : setLevelSort(true);

		const levelDataSort = async () => {
			const down = await pb.collection('escapeList').getFullList({
				sort: 'level',
			});

			const up = await pb.collection('escapeList').getFullList({
				sort: '-level',
			});

			setIsLoading(true);

			try {
				levelSort ? setData(down) : setData(up);
			} catch (err) {
				console.log(`난이도순 정렬 에러: ${err}`);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			}
		};

		levelDataSort();
	};

	//지역별 강남 정렬하기
	const handleGangnam = () => {
		const regionGangNam = async () => {
			const gangnam = await pb.collection('escapeList').getFullList({
				filter: 'region = "강남"',
			});

			setIsLoading(true);

			try {
				setData(gangnam);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			}
		};
		regionGangNam();
	};

	//지역별 홍대 정렬하기
	const handleHongDae = () => {
		const regionHongDae = async () => {
			const hongdae = await pb.collection('escapeList').getFullList({
				filter: 'region = "홍대"',
			});

			setIsLoading(true);

			try {
				setData(hongdae);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			}
		};
		regionHongDae();
	};

	//검색 기능
	const handleSearch = (e) => {
		if (e.target.value.length !== 0) {
			setSearch(e.target.value);
		} else {
			setSearch('');
		}

		const escapeSearch = async () => {
			const resultList = await pb.collection('escapeList').getList(1, 200, {
				filter: `(store ~ "${e.target.value}" || theme ~ "${e.target.value}")`,
			});

			const data = await pb.collection('escapeList').getList(1, 200, {
				expand: 'store, point, field, grade, level, image, link',
			});

			setIsLoading(true);

			try {
				if (resultList.items.length > 0) {
					setData(resultList.items);
					setEmptyData(false);
				} else if (e.target.value === 0) {
					setData(data.items);
					setEmptyData(false);
				} else {
					setEmptyData(true);
					setData([]);
				}
			} catch (err) {
				console.log(`검색 에러 내용 : ${err}`);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			}
		};

		escapeSearch();
	};
	const debounceSearch = debounce((e) => handleSearch(e));

	return (
		<>
			<Helmet>
				<title>방탈러-인기 테마</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				<Header>인기 테마</Header>
				<SearchInput
					placeholder="검색어를 입력해주세요 😀"
					value={search}
					onChange={debounceSearch}
				>
					검색
				</SearchInput>
				<ul className="text-ec1 text-lg flex justify-end w-full pr-20 gap-8 s:justify-center s:pr-0 s:gap-5">
					<li>
						<LiButton onClick={handleGangnam}>강남</LiButton>
					</li>
					<li>
						<LiButton onClick={handleHongDae}>홍대</LiButton>
					</li>
					<li>
						<LiButton onClick={handleLevelSort}>
							{!levelSort ? '난이도순 ↑' : '난이도순 ↓'}
						</LiButton>
					</li>
					<li>
						<LiButton onClick={handleGradeSort}>
							{!gradeSort ? '인기순 ↑' : '인기순 ↓'}
						</LiButton>
					</li>
				</ul>
				{!isLoading && emptyData && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<EmptyContents>검색결과가 없습니다 : &#40;</EmptyContents>
					</div>
				)}

				{isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				{!isLoading && (
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
										field={item.field}
									/>
								</li>
							);
						})}
					</ul>
				)}
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
