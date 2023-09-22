

import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

import pb from '@/api/pockethost';

import debounce from '@/utils/debounce';
import { ThemeContext } from '@/contexts/ThemeContext';

import UpNav from '@/components/nav/UpNav';
import Spinner from '@/components/Spinner';
import LiButton from '@/components/theme/LiButton';
import ThemeItem from '@/components/theme/ThemeItem';
import EmptyContents from '@/components/EmptyContents';
import SearchInput from '@/components/input/SearchInput';
import HeartButton from '@/components/theme/HeartButton';
import HeaderRecord from '@/components/header/HeaderRecord';
import useQueryEscapeList from '@/hooks/useEscapeList';
import ChatModal from '@/components/chat/ChatModal';

/* -------------------------------------------------------------------------- */

function Theme() {
	const navigate = useNavigate();
	const { theme } = useContext(ThemeContext);
	const searchInputWrapperRef = useRef(null);

	// ---------------------------------------------------------

	const {
		user: { id: userId },
	} = getUserInfo();
	const userUId = getUserInfoFromStorage();

	const [bookMark, setBookMark] = useState(null);
	const [record, setRecord] = useState([]);

	// 내 기록, 내 북마크 불러오기
	useLayoutEffect(() => {
		const fetchUserBookmarks = async () => {
			if (userId) {
				const record = await pb.collection('users').getOne(userId, {
					expand: 'bookmark, escapeList',
				});

				if (record.bookmark.length > 0) {
					setBookMark(record.expand.bookmark);
				}

				if (record.record.length > 0) {
					setRecord(record.expand.record);
				}
			}
		};

		fetchUserBookmarks();
	}, [userId]);

	// ---------------------------------------------------------

	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [showPlusNav, setShowPlusNav] = useState(false);
	const [chat, setChat] = useState(false);

	const [levelSort, setLevelSort] = useState(false);
	const [gradeSort, setGradeSort] = useState(false);
	const [gang, setGang] = useState(false);
	const [hong, setHong] = useState(false);
	const [kuk, setKuk] = useState(false);
	const [level, setLevel] = useState(false);
	const [like, setLike] = useState(false);

	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [sortKey, setSortKey] = useState('theme');
	const [options, setOptions] = useState({});

	// ---------------------------------------------------------

	const escapeListQueryData = useQueryEscapeList({
		// [정렬 키, 강남, 홍대, 건대, 난이도순, 인기순]
		keys: [sortKey, gang, hong, kuk, levelSort, gradeSort],
		// 옵션
		options: {
			sort: sortKey,
			...options,
		},
	});

	// 데이터 가져온 후, data 업데이트
	useEffect(() => {
		if (escapeListQueryData.data) {
			setData(escapeListQueryData.data);
		}
	}, [escapeListQueryData.data]);

	// 지역별 강남 정렬하기
	const handleGangnam = () => {
		setGang(true); // *
		setHong(false);
		setKuk(false);
		setLevel(false);
		setLike(false);
		setOptions({
			filter: 'region="강남"',
		});
	};

	// 지역별 홍대 정렬하기
	const handleHongDae = () => {
		setGang(false);
		setHong(true); // *
		setKuk(false);
		setLevel(false);
		setLike(false);
		setOptions({
			filter: 'region="홍대"',
		});
	};

	// 지역별 건대 정렬하기
	const handleKonkuk = () => {
		setGang(false);
		setHong(false);
		setKuk(true); // *
		setLevel(false);
		setLike(false);
		setOptions({
			filter: 'region="건대"',
		});
	};

	// 난이도별 정리하기
	const handleLevelSort = () => {
		setGang(false);
		setHong(false);
		setKuk(false);
		setLevel(true); // *
		setLike(false);
		setLevelSort((sort) => !sort);
		setSortKey(levelSort ? '-level' : 'level');
	};

	// 인기순 정렬하기
	const handleGradeSort = () => {
		setGang(false);
		setHong(false);
		setKuk(false);
		setLevel(false);
		setLike(true); // *
		setGradeSort((sort) => !sort);
		setSortKey(gradeSort ? '-grade' : 'grade');
	};

	/* -------------------------------------------------------------------------- */

	//검색 기능
	const handleSearch = (e) => {
		setGang(false);
		setHong(false);
		setKuk(false);
		setLevel(false);
		setLike(false);

		const searchValue = e.target.value.trim();

		if (searchValue.length !== 0) {
			setSearch(searchValue);
		} else {
			setSearch('');
		}

		setPage(1);
		setPerPage(227);
		setSortKey('theme');
		setOptions({
			filter: `(store ~ "${searchValue}" || theme ~ "${searchValue}" || field ~ "${searchValue}" || grade ~ "${
				searchValue === '꽃길'
					? 8 || 9 || 10
					: searchValue === '풀길'
					? 4 && 5 && 6 && 7
					: searchValue === '흙길'
					? 1 && 2 && 3
					: '없음'
			}")`,
		});
	};

	const debounceSearch = debounce((e) => handleSearch(e));

	// 검색 버튼
	const handleSubmitButton = (e) => {
		e.preventDefault();
	};

	// 채팅하기 이벤트
	const handleChat = () => {
		setChat((chat) => !chat);
	};

	/* -------------------------------------------------------------------------- */

	// 즐겨찾기 기능
	const isClickHeart = async (item) => {
		const newHeartState = !item.heart;

		setData((prevData) => ({
			...prevData,
			items: prevData.items.map((dataItem) =>
				dataItem.id === item.id
					? { ...dataItem, heart: newHeartState }
					: dataItem
			),
		}));

		if (newHeartState && bookMark.indexOf(`${item.id}`) < 0) {
			setBookMark((i) => [...i, `${item.id}`]);
			const userBookMarkSelete = {
				bookmark: [...bookMark, `${item.id}`],
			};

			toast('즐겨찾기에 추가되었습니다', {
				icon: '⭐',
				duration: 2000,
			});

			await pb.collection('users').update(userId, userBookMarkSelete);
		} else {
			const userBookMarkCancle = bookMark.filter(
				(value) => value !== `${item.id}`
			);

			setBookMark(userBookMarkCancle);

			const updateBookMark = { bookmark: userBookMarkCancle };

			toast('즐겨찾기에 삭제되었습니다', {
				icon: '✖️',
				duration: 2000,
			});

			await pb.collection('users').update(userId, updateBookMark);
		}
	};

	// 기록하기 버튼 이벤트
	const handleRecordButton = () => {
		navigate('/recordpage');
	};

	// 관리자 계정 이벤트
	const handleAdmin = () => {
		navigate('/createtheme');
	};

	// 스크롤탑 버튼 이벤트
	const handleTopButton = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	// 스크롤 이벤트 감지
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const totalPageHeight = document.documentElement.scrollHeight;
			const windowHeight = window.innerHeight;

			if (
				(currentScrollY >= 500 && !showPlusNav) ||
				(currentScrollY < 500 && showPlusNav)
			) {
				setShowPlusNav(currentScrollY >= 500);
			}

			if (currentScrollY + windowHeight >= totalPageHeight) {
				const dataUpdate = async () => {
					const escape = await pb
						.collection('escapeList')
						.getList(page + 1, 10, {
							sort: 'theme',
						});

					try {
						currentScrollY - 1000;
						setPage(page + 1);
						setData((prevData) => ({
							...prevData,
							items: [...prevData.items, ...escape.items],
						}));
					} catch (err) {
						console.log(`에러 내용: ${err}`);
					}
				};
				dataUpdate();
			}
		};

		const handleDebouceScroll = debounce(handleScroll, 300);

		window.addEventListener('scroll', handleDebouceScroll);

		return () => {
			window.removeEventListener('scroll', handleDebouceScroll);
		};
	}, [page, showPlusNav]);

	return (
		<>
			<Helmet>
				<meta name="description" content="방탈러 홈페이지-테마" />
				<meta property="og:title" content="방탈러 테마" />
				<meta property="og:description" content="방탈러 테마 페이지" />
				<meta
					property="og:image"
					content="https://user-images.githubusercontent.com/126174401/269534150-30234bad-4433-4d7b-968f-08a1680c3f84.png"
				/>
				<meta name="theme-color" content="#352F44" />
				<meta name="apple-mobile-web-app-status-bar-style" content="#352F44" />
				<meta property="og:url" content="https://escape12.netlify.app/theme" />
			</Helmet>
			{chat && <ChatModal onClick={() => setChat(false)} />}
			<div className="max-w-[600px] min-w-[320px] flex flex-col items-center min-h-[100vh] m-auto py-20 relative bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-lg">
				<HeaderRecord
					pencilClick={userUId?.model.admin ? handleAdmin : handleRecordButton}
				>
					인기 테마
				</HeaderRecord>
				<div ref={searchInputWrapperRef} className="w-full px-20 s:px-16">
					<SearchInput
						placeholder="검색어를 입력해주세요 😀"
						value={search}
						onChange={debounceSearch}
						onSubmit={handleSubmitButton}
					>
						검색
					</SearchInput>
				</div>
				<ul className="text-lg flex justify-center w-full gap-8 s:justify-center s:gap-[3%] px-20 s:px-12">
					<li>
						<LiButton
							onClick={handleGangnam}
							text={gang ? 'font-bold text-xl' : ''}
						>
							강남
						</LiButton>
					</li>
					<li>
						<LiButton
							onClick={handleHongDae}
							text={hong ? 'font-bold text-xl' : ''}
						>
							홍대
						</LiButton>
					</li>
					<li>
						<LiButton
							onClick={handleKonkuk}
							text={kuk ? 'font-bold text-xl' : ''}
						>
							건대
						</LiButton>
					</li>
					<li>
						<LiButton
							onClick={handleLevelSort}
							text={level ? 'font-bold text-xl' : ''}
						>
							{!levelSort ? '난이도순 ↑' : '난이도순 ↓'}
						</LiButton>
					</li>
					<li>
						<LiButton
							onClick={handleGradeSort}
							text={like ? 'font-bold text-xl' : ''}
						>
							{!gradeSort ? '인기순 ↑' : '인기순 ↓'}
						</LiButton>
					</li>
				</ul>

				{escapeListQueryData.isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}

				{!escapeListQueryData.isLoading && data && data?.items?.length && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<EmptyContents>검색결과가 없습니다 : &#40;</EmptyContents>
					</div>
				)}

				{!escapeListQueryData.isLoading && data && data?.items?.length > 0 && (
					<ul className="w-full px-20 s:px-12">
						{data.items.map((item) => {
							return (
								<li key={item.id} className="relative">
									<ThemeItem
										store={item.store}
										point={item.point}
										theme={item.theme}
										grade={item.grade}
										level={item.level}
										image={`https://refresh.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.images}`}
										link={item.link}
										field={item.field}
										dataid={item.id}
										clear={record}
										record={item.record}
									/>
									<HeartButton
										onClick={() => isClickHeart(item)}
										checked={
											theme === 'dark' && bookMark.indexOf(`${item.id}`) >= 0
												? 'bg-hearttrue'
												: theme === 'light' &&
												  bookMark.indexOf(`${item.id}`) >= 0
												? 'bg-heartlike'
												: 'bg-heartfalse'
										}
									/>
								</li>
							);
						})}
						<li className="font-semibold text-center pb-10">불러오는 중...</li>
					</ul>
				)}
			</div>
			<UpNav
				topClick={handleTopButton}
				hidden={!showPlusNav ? 'hidden' : ''}
				talkClick={handleChat}
			/>
		</>
	);
}

export default Theme;
