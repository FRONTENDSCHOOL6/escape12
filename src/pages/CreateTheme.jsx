import pb from '@/api/pockethost';
import Header from '@/components/header/Header';
import Nav from '@/components/nav/Nav';
import { Helmet } from 'react-helmet-async';

function CreateTheme() {
	const handleCreateData = async () => {
		const data = [];
		try {
			for (let i = 0; i < data.length; i++) {
				await pb.collection('escapeList').create(data[i]);
			}
		} catch (err) {
			console.log(`에러 내용: ${err}`);
		}
	};

	return (
		<>
			<Helmet>
				<title>방탈러-테마 등록</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center h-screen m-auto py-20 relative">
				<Header>테마 등록</Header>
				<button
					onClick={handleCreateData}
					type="button"
					className="text-ec1 text-4xl"
				>
					등록
				</button>
				<Nav />
			</div>
		</>
	);
}

export default CreateTheme;
