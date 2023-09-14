import pb from '@/api/pockethost';
import Spinner from '@/components/Spinner';
import Button from '@/components/button/Button';
import Headerback from '@/components/header/Headerback';
import Nav from '@/components/nav/Nav';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import clover from '@/assets/upload-clover.png';

function UploadRecord() {
	const { dataId } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	//삭제 기능
	const handleDeleteRecord = async () => {
		const deleteConfirm = confirm('정말로 삭제하시겠습니까?');

		try {
			if (deleteConfirm) {
				await pb.collection('record').delete(`${dataId}`);

				toast('삭제되었습니다', {
					icon: '🗑️',
					duration: 2000,
				});

				navigate('/theme');
			}
		} catch (err) {
			console.log(`삭제 에러: ${err}`);
		}
	};

	//수정 기능
	const handleEditRecord = () => {
		try {
			navigate(`/theme/edit/${dataId}`);
		} catch (err) {
			console.log(`수정 에러: ${err}`);
		}
	};

	//데이터 불러오기
	useEffect(() => {
		const handleRecordData = async () => {
			const upload = await pb.collection('record').getOne(`${dataId}`, {
				expand: 'escapeList, author',
			});

			try {
				setData(upload);
				setIsLoading(true);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};

		handleRecordData();
	}, [dataId]);

	return (
		<div>
			<Helmet>
				<title>
					{`${!data.theme ? data.expand?.escapeList?.theme : data.theme} 기록`}
				</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center justify-center min-h-[100vh] m-auto relative py-24 text-lg gap-5 px-20 s:px-12">
				<Headerback
					onClick={() => {
						navigate('/theme');
					}}
				>
					{!isLoading
						? '로딩중'
						: !data.theme
						? data.expand?.escapeList?.theme
						: data.theme}
				</Headerback>
				{!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				{isLoading && (
					<>
						<section className="flex flex-row-reverse items-center gap-4">
							<div className="flex flex-col flex-1 gap-3 s:gap-1 whitespace-nowrap">
								<h3 className="text-2xl">
									{!data.store ? data.expand?.escapeList?.store : data.store}
									<span className="ml-3 s:ml-2">
										{data.point
											? `${data.expand?.escapeList.point}점`
											: data.point}
									</span>
								</h3>
								<p className="flex justify-between">
									<span>
										{!data.date ? data.expand?.escapeList.created : data.date}
									</span>
									<p className="flex">
										<img
											className="w-6 mr-1"
											src={clover}
											alt="회원등급"
											aria-hidden
										/>
										{data.expand?.author?.nickName}
									</p>
								</p>
							</div>
							<img
								className="w-[20%] rounded-full"
								src={`https://refresh.pockethost.io/api/files/${data.expand?.author?.collectionId}/${data.expand?.author?.id}/${data.expand?.author?.avatar}`}
								alt={data.expand?.author?.nickName}
								aria-hidden
							/>
						</section>
						<img
							className="w-[70%]"
							src={
								!data.image
									? data.expand?.escapeList?.image
									: `https://refresh.pockethost.io/api/files/${data.collectionId}/${data.id}/${data.image}`
							}
							alt={data.expand?.escapeList?.theme}
						/>
						<section className="w-full">
							<ul className="flex justify-between pb-4 font-semibold">
								<li>
									⭐
									{!data.grade && data.grade !== 0
										? data.expand?.escapeList.grade
										: data.grade}
								</li>
								<li>
									{!data.hour ? '0' : data.hour}
									<span className="px-2">:</span>
									<span className="pr-2">
										{!data.minute ? '00' : data.minute}
									</span>
									LEFT
								</li>
							</ul>
							<div className="min-h-[160px] w-full bg-opacity border-2 p-4 rounded-lg">
								{data.content}
							</div>
						</section>
						<section className="w-full flex justify-between pb-3">
							<Button bg="bg-ec1" text="text-ec4" onClick={handleDeleteRecord}>
								삭제
							</Button>
							<Button bg="bg-ec1" text="text-ec4" onClick={handleEditRecord}>
								수정
							</Button>
						</section>
					</>
				)}
			</div>
			<Nav />
		</div>
	);
}

export default UploadRecord;
