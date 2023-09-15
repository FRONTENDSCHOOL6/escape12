import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/button/Button';
import Nav from '@/components/nav/Nav';
import Sup from '@/components/record/Sup';
import Headerback from '@/components/header/Headerback';
import FormInput from '@/components/loginsignup/FormInput';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import pb from '@/api/pockethost';

function AddCommunity() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const currentDate = new Date();
	const navigate = useNavigate();

	//제목 상태 변경
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	//내용 상태 변경
	const handleContent = (e) => {
		setContent(e.target.value);
	};

	//등록 이벤트
	const handleDateCrate = async (e) => {
		e.preventDefault();
		const data = {
			title,
			content,
		};

		try {
			await pb.collection('community').create(data);

			toast('등록되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});
			navigate('/postpage');
		} catch (err) {
			console.log(err);
		}
		// navigate('/mypage');
	};

	return (
		<>
			<Helmet>
				<title>글 작성</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				{/* Header */}
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					글 작성
				</Headerback>
				<form onSubmit={handleDateCrate} className="flex flex-col items-center">
					<div className="text-lg pt-28 s:px-12 px-14">
						{/* Title, Content */}
						<FormInput
							type="text"
							id="title"
							name="title"
							onChange={handleTitle}
							placeholder="제목을 입력해주세요."
						>
							<Sup>제목</Sup>
						</FormInput>
						<p className="flex justify-end mb-3 text-lg">
							{currentDate.toLocaleDateString()}
						</p>
						<textarea
							value={content}
							id="content"
							onChange={handleContent}
							placeholder="작성해주세요.🤩"
							className="w-full h-80 p-4 text-ec4 border rounded-lg"
						/>
					</div>
					<Button type="submit" bg="bg-ec1 text-center" text="text-ec4 mt-4">
						등록
					</Button>
				</form>
			</div>
			<Nav />
		</>
	);
}

export default AddCommunity;
