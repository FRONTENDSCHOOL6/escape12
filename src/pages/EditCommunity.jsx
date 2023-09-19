import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/button/Button';
import Nav from '@/components/nav/Nav';
import Headerback from '@/components/header/Headerback';
import FormInput from '@/components/loginsignup/FormInput';
import Spinner from '@/components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import pb from '@/api/pockethost';
import { useEffect } from 'react';

function EditCommunity() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const currentDate = new Date();
	const navigate = useNavigate();
	const { dataId } = useParams();
	const [isLoading, setIsLoading] = useState(false);

	// 제목 상태 변경
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	// 내용 상태 변경
	const handleContent = (e) => {
		setContent(e.target.value);
	};

	//기존 데이터 가져오기
	useEffect(() => {
		async function BeforePostData() {
			const postData = await pb.collection('community').getOne(`${dataId}`, {
				expand: 'author,content',
			});
			try {
				setTitle(postData.title);
				setContent(postData.content);
				setIsLoading(true);
			} catch (err) {
				console.error(err);
			}
		}

		BeforePostData();
	}, [dataId]);

	// 수정 상태 변경
	const handleEditPost = async (e) => {
		e.preventDefault();
		const data = {
			title: title,
			content: content,
		};

		try {
			const editresult = await pb
				.collection('community')
				.update(`${dataId}`, data);

			toast('글이 수정되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});

			navigate(`/postpage/${editresult.id}`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Helmet>
				<title>글 작성</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative text-lg">
				<Headerback onClick={() => navigate(-1)}>글 작성</Headerback>
				{!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				{isLoading && (
					<form
						onSubmit={handleEditPost}
						className="flex flex-col items-center w-full"
					>
						<div className="text-lg pt-28 w-full px-20 s:px-12">
							<FormInput
								value={title}
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
								className="w-full h-96 p-4 text-dark-ec4 border rounded-lg shadow-xl dark:shadow-darkMode"
							></textarea>
						</div>
						<Button
							type="submit"
							bg="text-center"
							text="dark:text-dark-ec4 mt-4"
						>
							등록
						</Button>
					</form>
				)}
			</div>
			<Nav />
		</>
	);
}

export default EditCommunity;
