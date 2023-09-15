import pb from '@/api/pockethost';
import userUId from '@/api/userUid';
import EmptyContents from '@/components/EmptyContents';
import Spinner from '@/components/Spinner';
import HeaderRecord from '@/components/header/HeaderRecord';
import SearchInput from '@/components/input/SearchInput';
import UpNav from '@/components/nav/UpNav';
import LiButton from '@/components/theme/LiButton';
import ThemeItem from '@/components/theme/ThemeItem';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function Theme() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [levelSort, setLevelSort] = useState(false);
	const [gradeSort, setGradeSort] = useState(false);
	const [showPlusNav, setShowPlusNav] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [emptyData, setEmptyData] = useState(false);
	const [user, setUser] = useState([]);
	const navigate = useNavigate();

	//기록하기 버튼 이벤트
	const handleRecordButton = () => {
		navigate('/recordpage');
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
			const escape = await pb.collection('escapeList').getList(1, 300, {
				sort: 'theme',
			});

			const usersEscape = await pb
				.collection('users')
				.getOne(`${userUId.model.id}`, {
					expand: 'escapeList',
				});

			try {
				setData(escape.items);
				setUser(usersEscape.expand?.escapeList);
				setIsLoading(true);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		dataList();
	}, []);

	//인기순 정렬하기
	const handleGradeSort = () => {
		setIsLoading(false);
		gradeSort ? setGradeSort(false) : setGradeSort(true);

		const gradeDataSort = async () => {
			const down = await pb.collection('escapeList').getFullList({
				sort: 'grade',
			});

			const up = await pb.collection('escapeList').getFullList({
				sort: '-grade',
			});

			try {
				setTimeout(() => {
					levelSort ? setData(down) : setData(up);
					setIsLoading(true);
				});
			} catch (err) {
				console.log(`인기순 정렬 에러: ${err}`);
			}
		};

		gradeDataSort();
	};

	//난이도별 정리하기
	const handleLevelSort = () => {
		setIsLoading(false);
		levelSort ? setLevelSort(false) : setLevelSort(true);

		const levelDataSort = async () => {
			const down = await pb.collection('escapeList').getFullList({
				sort: 'level',
			});

			const up = await pb.collection('escapeList').getFullList({
				sort: '-level',
			});

			try {
				setTimeout(() => {
					levelSort ? setData(down) : setData(up);
					setIsLoading(true);
				});
			} catch (err) {
				console.log(`난이도순 정렬 에러: ${err}`);
			}
		};

		levelDataSort();
	};

	//지역별 강남 정렬하기
	const handleGangnam = () => {
		setIsLoading(false);

		const regionGangNam = async () => {
			const gangnam = await pb.collection('escapeList').getFullList({
				filter: 'region = "강남"',
			});

			try {
				setTimeout(() => {
					setData(gangnam);
					setIsLoading(true);
				});
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		regionGangNam();
	};

	//지역별 홍대 정렬하기
	const handleHongDae = () => {
		setIsLoading(false);

		const regionHongDae = async () => {
			const hongdae = await pb.collection('escapeList').getFullList({
				filter: 'region = "홍대"',
			});

			try {
				setTimeout(() => {
					setData(hongdae);
					setIsLoading(true);
				});
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		regionHongDae();
	};

	//지역별 건대 정렬하기
	const handleKonkuk = () => {
		setIsLoading(false);

		const regionHongDae = async () => {
			const konkuk = await pb.collection('escapeList').getFullList({
				filter: 'region = "건대"',
			});

			try {
				setTimeout(() => {
					setData(konkuk);
					setIsLoading(true);
				});
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		regionHongDae();
	};

	//검색 기능
	const handleSearch = (e) => {
		setIsLoading(false);
		if (e.target.value.length !== 0) {
			setSearch(e.target.value);
		} else {
			setSearch('');
		}

		const escapeSearch = async () => {
			const resultList = await pb.collection('escapeList').getList(1, 200, {
				sort: 'theme',
				filter: `(store ~ "${e.target.value}" || theme ~ "${
					e.target.value
				}" || field ~ "${e.target.value}" || grade ~ "${
					e.target.value === '꽃길'
						? 8 || 9 || 10
						: e.target.value === '풀길'
						? 4 && 5 && 6 && 7
						: e.target.value === '흙길'
						? 1 && 2 && 3
						: '없음'
				}")`,
			});

			const data = await pb.collection('escapeList').getList(1, 200, {
				expand: 'users',
			});

			try {
				if (resultList.items.length > 0) {
					setTimeout(() => {
						setData(resultList.items);
						setEmptyData(false);
						setIsLoading(true);
					});
				} else if (e.target.value === 0) {
					setTimeout(() => {
						setData(data.items);
						setEmptyData(false);
						setIsLoading(true);
					});
				} else {
					setTimeout(() => {
						setEmptyData(true);
						setData([]);
						setIsLoading(true);
					});
				}
			} catch (err) {
				console.log(`검색 에러 내용 : ${err}`);
			}
		};

		escapeSearch();
	};
	const debounceSearch = debounce((e) => handleSearch(e));

	// 검색 버튼
	const handleSubmitButton = (e) => {
		e.preventDefault();
	};


  console.log(data);

	return (
		<>
			<Helmet>
				<title>인기 테마</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				<HeaderRecord pencilClick={handleRecordButton}>인기 테마</HeaderRecord>
				<SearchInput
					placeholder="검색어를 입력해주세요 😀"
					value={search}
					onChange={debounceSearch}
					onSubmit={handleSubmitButton}
				>
					검색
				</SearchInput>
				<ul className="text-ec1 text-lg flex justify-center w-full gap-8 s:justify-center s:gap-[3%] px-20 s:px-12">
					<li>
						<LiButton onClick={handleGangnam}>강남</LiButton>
					</li>
					<li>
						<LiButton onClick={handleHongDae}>홍대</LiButton>
					</li>
					<li>
						<LiButton onClick={handleKonkuk}>건대</LiButton>
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
				{isLoading && emptyData && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<EmptyContents>검색결과가 없습니다 : &#40;</EmptyContents>
					</div>
				)}

				{!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				{isLoading && (
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
										dataid={item.id}
										clear={user}
										record={item.record}
									/>
								</li>
							);
						})}
					</ul>
				)}
				<UpNav
					topClick={handleTopButton}
					hidden={!showPlusNav ? 'hidden' : ''}
				/>
			</div>
		</>
	);
}

export default Theme;
