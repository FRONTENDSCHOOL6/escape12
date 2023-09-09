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
				<div className="max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0">
					<Header>내용 없음</Header>
				</div>
				<div className="">
					<EmptyContents />
				</div>
				<div className="max-w-[600px] min-w-[320px] m-auto fixed bottom-0 left-0 right-0">
					<Nav></Nav>
				</div>
			</div>
		</>
	);
}

export default Empty;
