import pb from '@/api/pockethost';
import userUId from '@/api/userUid';
import EmptyContents from '@/components/EmptyContents';
import Spinner from '@/components/Spinner';
import HeaderBackRecord from '@/components/header/HeaderBackRecord';
import SearchInput from '@/components/input/SearchInput';
import MyRecordItem from '@/components/mypage/MyRecordItem';
import UpNav from '@/components/nav/UpNav';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function MyRecord() {
	const [showPlusNav, setShowPlusNav] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [emptyData, setEmptyData] = useState(false);
	const [noResult, setNoResult] = useState(false);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
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

	// 검색 기능
	const handleSearch = (e) => {
		setIsLoading(false);
		if (e.target.value.length !== 0) {
			setSearch(e.target.value);
		} else {
			setSearch('');
		}

		const recordSearch = async () => {
			const recordList = await pb.collection('record').getList(1, 200, {
				filter: `(author = "${userUId?.model.id}" && theme ~ "${
					e.target.value
				}") || (author = "${userUId?.model.id}" && store ~ "${
					e.target.value
				}") || (author = "${userUId?.model.id}" && grade = "${
					e.target.value === '꽃길'
						? 8 && 9 && 10
						: e.target.value === '풀길'
						? 4 && 5 && 6 && 7
						: e.target.value === '흙길'
						? 0 && 1 && 2 && 3
						: '없음'
				}") || (author = "${userUId?.model.id}" && grade = "${
					e.target.value === '꽃'
						? 8 && 9 && 10
						: e.target.value === '풀'
						? 4 && 5 && 6 && 7
						: e.target.value === '흙'
						? 0 && 1 && 2 && 3
						: '없음'
				}")`,
				expand: 'escapeList',
			});

			const data = await pb.collection('record').getFullList({
				filter: `author = "${userUId?.model.id}"`,
				expand: 'escapeList',
			});

			try {
				if (recordList) {
					setData(recordList.items);
					setEmptyData(false);
					setIsLoading(true);
					setNoResult(false);
				} else if (e.target.value === 0) {
					setTimeout(() => {
						setData(data.items);
						setEmptyData(false);
						setIsLoading(true);
						setNoResult(false);
					});
				} else {
					setTimeout(() => {
						setEmptyData(true);
						setData([]);
						setIsLoading(true);
						setNoResult(true);
					});
				}
			} catch (err) {
				console.log(`검색 에러: ${err}`);
			}
		};

		recordSearch();
	};
	const debounceSearch = debounce((e) => handleSearch(e), 500);

	// 검색 버튼 누르기
	const handleSubmitButton = (e) => {
		e.preventDefault();
	};

	//데이터 불러오기
	useEffect(() => {
		const myRecord = async () => {
			const records = await pb.collection('record').getFullList({
				filter: `author = "${userUId?.model.id}"`,
				expand: 'escapeList',
			});

			try {
				setData(records);
				setIsLoading(true);
				// console.log(records);
			} catch (err) {
				console.log(`데이터 불러오기 에러 : ${err}`);
			}
		};

		myRecord();
	}, []);

	return (
		<div>
			<Helmet>
				<title>나의 기록</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-screen m-auto relative pt-20 pb-28 text-lg gap-6">
				<HeaderBackRecord
					onClick={() => {
						navigate('-1');
					}}
					pencilClick={handleRecordButton}
				>
					나의 기록
				</HeaderBackRecord>
				<SearchInput
					placeholder="검색어를 입력해주세요 😀"
					value={search}
					onChange={debounceSearch}
					text="text-ec4"
					onSubmit={handleSubmitButton}
				>
					검색
				</SearchInput>
				<div className="flex flex-col items-center w-full">
					{isLoading && data.length === 0 && !emptyData && !noResult && (
						<div className="translate-y-1/3">
							<EmptyContents>기록이 없습니다 : &#40;</EmptyContents>
						</div>
					)}
					{!isLoading && (
						<div className="translate-y-1/2">
							<Spinner />
						</div>
					)}
					<ul className="w-full px-20">
						{!emptyData &&
							isLoading &&
							!noResult &&
							data.map((item) => {
								return (
									<li key={item.id}>
										<MyRecordItem
											link={item.id}
											src={
												item.image
													? `https://refresh.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.image}`
													: item.expand?.escapeList?.image
											}
											alt={item.theme}
											theme={item.theme}
											store={item.store}
											grade={item.grade}
										/>
									</li>
								);
							})}
					</ul>
				</div>
				<UpNav
					topClick={handleTopButton}
					hidden={!showPlusNav ? 'hidden' : ''}
				/>
			</div>
		</div>
	);
}

export default MyRecord;
