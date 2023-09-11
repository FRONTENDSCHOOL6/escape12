import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import EmptyContents from '@/components/EmptyContents';

function Empty() {
	return (
		<>
			<Helmet>
				<title>콘텐츠 없음</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 flex flex-col items-center min-h-[100vh] m-auto py-20 relative justify-center">
				<Header>콘텐츠 없음</Header>
				<EmptyContents />
				<Nav />
			</div>
		</>
	);
}

export default Empty;
