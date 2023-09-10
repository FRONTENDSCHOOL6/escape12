import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/Headerback';
import { useNavigate } from 'react-router-dom';

function AddCommunity() {
	const [content, setContent] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const currentDate = new Date();
	const navigate = useNavigate();

	const handleContentChange = (e) => {
		setContent(e.target.value);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);
	};

	const handleSaveClick = () => {
		// 선택한 파일 확인
		if (selectedFile) {
			// 파일 업로드 API 추가
		}
		// 페이지 이동
		navigate('/mypage');
	};

	return (
		<>
			<Helmet>
				<title>글 작성</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				{/* header, headerback 맨 위 고정 */}
				<Headerback onClick={() => { navigate('/postpage'); }}>글 작성</Headerback>
				<div className="text-xl pt-28 s:px-12 px-14">
					<p className="flex justify-end mb-3 text-lg">
						작성 날짜: {currentDate.toLocaleDateString()}
					</p>
					<textarea
						value={content}
						onChange={handleContentChange}
						placeholder="글을 입력해주세요."
						className="w-full h-80 p-4 text-ec4 border rounded-lg"
					/>
					{/* 파일 업로드 추가 */}
					<input
						type="file"
						onChange={handleFileChange}
						className="w-full mt-2"
					/>
				</div>
				<Button
					onClick={handleSaveClick}
					bg="bg-ec1 text-center"
					text="text-ec4 mt-4"
				>
					등록
				</Button>
			</div>
			<Nav/>
		</>
	);
}

export default AddCommunity;
