import pb from '@/api/pockethost';
import Button from '@/components/Button';
import Headerback from '@/components/Headerback';
import Nav from '@/components/Nav';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UploadRecord() {
	const { dataId } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState([]);

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
				console.log(upload);
				setData(upload);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};

		handleRecordData();
	}, [dataId]);

	return (
		<div>
			<Helmet>
				<title>업로드 기록</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center justify-center min-h-[100vh] m-auto relative py-24 text-lg gap-5 px-20 s:px-12">
				<Headerback
					onClick={() => {
						navigate('/theme');
					}}
				>
					{!data.store ? data.expand?.escapeList.theme : data.store}
				</Headerback>
				<section className="flex flex-row-reverse items-center gap-4">
					<div className="flex flex-col flex-1 gap-3 s:gap-1">
						<h3 className="text-2xl">
							{!data.store ? data.expand?.escapeList?.store : data.store}
							<span className="ml-3 s:ml-2">
								{data.point ? data.expand?.escapeList.point : data.point}
							</span>
							점
						</h3>
						<p>{data.expand?.escapeList.created.slice(0, 10)}</p>
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
					src={data.expand?.escapeList.image}
					alt={data.expand?.escapeList.theme}
				/>
				<section className="w-full">
					<ul className="flex justify-between pb-4 font-semibold">
						<li>⭐ {data.expand?.escapeList.grade}</li>
						<li>
							{data.hour}
							<span className="px-2">:</span>
							<span className="pr-2">{data.minute}</span> LEFT
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
			</div>
			<Nav />
		</div>
	);
}

export default UploadRecord;
