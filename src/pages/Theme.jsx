import Header from '@/components/Header';
import PlusNav from '@/components/PlusNav';
import SearchInput from '@/components/SearchInput';
import ThemeItem from '@/components/theme/ThemeItem';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

function Theme() {
	const handleRecordButton = () => {
		toast('기능 구현중입니다 :)', {
			icon: '🍮',
			duration: 2000,
		});
	};

	return (
		<>
			<Helmet>
				<title>방탈러-전체 테마</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center h-full m-auto py-20 relative">
				<Header>전체 테마</Header>
				<SearchInput />
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
				<PlusNav onPlusClick={handleRecordButton} />
			</div>
		</>
	);
}

export default Theme;
