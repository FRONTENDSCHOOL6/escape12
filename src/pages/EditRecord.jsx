import Headerback from '@/components/Headerback';
import Nav from '@/components/Nav';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

function EditRecord() {
	return (
		<>
			<Helmet>
				<title>기록 수정</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto text-lg py-16 relative">
				<Headerback
					onClick={() => {
						Navigate('/theme');
					}}
				>
					기록 수정하기
				</Headerback>
			</div>
			<Nav />;
		</>
	);
}

export default EditRecord;
