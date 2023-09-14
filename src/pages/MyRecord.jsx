import pb from '@/api/pockethost';
import Headerback from '@/components/header/Headerback';
import SearchInput from '@/components/input/SearchInput';
import UpNav from '@/components/nav/UpNav';
import MyRecordItem from '@/components/mypage/MyRecordItem';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function MyRecord() {
	const [showPlusNav, setShowPlusNav] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [emptyData, setEmptyData] = useState(false);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
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
				filter: `(store ~ "${e.target.value}" || theme ~ "${e.target.value}" || field ~ "${e.target.value}")`,
			});

			const data = await pb.collection('escapeList').getList(1, 200, {
				expand: 'store, point, field, grade, level, image, link',
			});

			setIsLoading(true);

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

	return (
		<div>
			<Helmet>
				<title>나의 기록</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center justify-center min-h-[100vh] m-auto relative py-20 text-lg gap-6 s:px-12">
				<Headerback
					onClick={() => {
						navigate('/mypage');
					}}
				>
					나의 기록
				</Headerback>
				<SearchInput
					placeholder="검색어를 입력해주세요 😀"
					value={search}
					onChange={debounceSearch}
					text="text-ec4"
				>
					검색
				</SearchInput>
				<MyRecordItem />
				<MyRecordItem />
				<MyRecordItem />
				<MyRecordItem />
				<MyRecordItem />
				<MyRecordItem />
				<MyRecordItem />
				<MyRecordItem />
				<MyRecordItem />
				<UpNav
					topClick={handleTopButton}
					hidden={!showPlusNav ? 'hidden' : ''}
				/>
			</div>
		</div>
	);
}

export default MyRecord;
