import { useState } from 'react';
import { getUserInfoFromStorage } from '@/api/getUserInfo';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/button/Button';
import Nav from '@/components/nav/Nav';
import Headerback from '@/components/header/Headerback';
import FormInput from '@/components/loginsignup/FormInput';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import pb from '@/api/pockethost';

function AddCommunity() {
	const userUId = getUserInfoFromStorage();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const currentDate = new Date();
	const navigate = useNavigate();

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleContent = (e) => {
		setContent(e.target.value);
	};


	const handleDateCrate = async (e) => {
		e.preventDefault();
		const data = {
			title: title,
			content: content,
			nickName: `${userUId?.model.nickName}`,
			author: `${userUId?.model.id}`,
		};

		try {
			const uploadCommunity = await pb.collection('community').create(data);

			toast('글이 등록되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});
			navigate(`/postpage/${uploadCommunity.id}`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Helmet>
				<title>커뮤니티 글 작성</title>
				<meta name="description" content="방탈러 홈페이지-커뮤니티 글 작성" />
				<meta property="og:title" content="방탈러 커뮤니티 글 작성" />
				<meta
					property="og:description"
					content="방탈러 커뮤니티 글 작성 페이지"
				/>
				<meta
					property="og:url"
					content="https://escape12.netlify.app/addcommunity"
				/>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] flex flex-col items-center min-h-[100vh] m-auto pt-20 pb-28 relative bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-lg">
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					글 작성
				</Headerback>
				<form
					onSubmit={handleDateCrate}
					className="flex flex-col items-center w-full"
				>
					<div className="text-lg pt-4 w-full px-20 s:px-12">

						<FormInput
							type="text"
							id="title"
							name="title"
							onChange={handleTitle}
							placeholder="제목을 입력해주세요"
						>
							제목
						</FormInput>
						<p className="flex justify-end py-3 text-lg">
							📅 {currentDate.toLocaleDateString()}
						</p>
						<textarea
							value={content}
							id="content"
							onChange={handleContent}
							placeholder="글을 작성해주세요 ✏️"
							className="w-full h-96 p-4 text-dark-ec4 border rounded-lg"
						/>
					</div>
					<Button type="submit" bg="text-center" text="mt-4">
						등록
					</Button>
				</form>
			</div>
			<Nav />
		</>
	);
}

export default AddCommunity;
