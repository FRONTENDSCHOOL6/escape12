import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import EmptyContents from '@/components/EmptyContents';

function Empty() {
	return (
		<>
			<Helmet>
				<title>내용 없음</title>
			</Helmet>
			<div className="w-full max-w-[600px] min-w-[320px] py-20 bg-ec4 text-ec1 justify-center flex flex-col items-center h-screen m-auto gap-14">
				<Header>내용 없음</Header>
				<div className="">
					<EmptyContents />
				</div>
				<Nav />
			</div>
		</>
	);
}

export default Empty;
