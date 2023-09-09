import Header from '@/components/Header';
import PocketBase from 'pocketbase';
import { Helmet } from 'react-helmet-async';

function CreateTheme() {
	const pb = new PocketBase('https://refresh.pockethost.io');

	const handleCreateData = async (themeData) => {
		try {
			await pb.collection('escapeList').create(themeData);
		} catch (err) {
			console.log(`에러 내용: ${err}`);
		}
	};

	const themeDataArray = [
		{
			region: '강남',
			store: '넥스트에디션',
			point: '강남3호',
			theme: '크리쳐 - 신인류의 탄생',
			field: 'SF',
			grade: 7,
			level: 6,
			image:
				'https://next-edition.s3.amazonaws.com/theme/title_image_url/%ED%81%AC%EB%A6%AC%EC%B3%90%20-%20%EC%8B%A0%EC%9D%B8%EB%A5%98%EC%9D%98%20%ED%83%84%EC%83%9D/theme__%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%84%8E%E1%85%A7_%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5_%ED%81%AC%EB%A6%AC%EC%B3%90%20-%20%EC%8B%A0%EC%9D%B8%EB%A5%98%EC%9D%98%20%ED%83%84%EC%83%9D.jpg',
			link: 'https://www.nextedition.co.kr/shops/Nextedition%20Gangnam3',
		},
		{
			region: '강남',
			store: '넥스트에디션',
			point: '강남3호',
			theme: '크리쳐 - 신인류의 탄생',
			field: 'SF',
			grade: 7,
			level: 6,
			image:
				'https://next-edition.s3.amazonaws.com/theme/title_image_url/%ED%81%AC%EB%A6%AC%EC%B3%90%20-%20%EC%8B%A0%EC%9D%B8%EB%A5%98%EC%9D%98%20%ED%83%84%EC%83%9D/theme__%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%84%8E%E1%85%A7_%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5_%ED%81%AC%EB%A6%AC%EC%B3%90%20-%20%EC%8B%A0%EC%9D%B8%EB%A5%98%EC%9D%98%20%ED%83%84%EC%83%9D.jpg',
			link: 'https://www.nextedition.co.kr/shops/Nextedition%20Gangnam3',
		},
	];

	// 각 객체를 따로 등록
	themeDataArray.forEach((themeData) => {
		handleCreateData(themeData);
	});

	return (
		<>
			<Helmet>
				<title>방탈러-테마 등록</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center h-screen m-auto py-20 relative">
				<Header>테마 등록</Header>
				<p className="">등록될까</p>
				<button
					onClick={handleCreateData}
					type="button"
					className="text-ec1 text-4xl"
				>
					등록
				</button>
			</div>
		</>
	);
}

export default CreateTheme;
