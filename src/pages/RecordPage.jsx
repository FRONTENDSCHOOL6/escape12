import pb from '@/api/pockethost';
import userUId from '@/api/userUid';
import thumnail from '@/assets/recordpage-thumbnail.png';
import Button from '@/components/button/Button';
import Headerback from '@/components/header/Headerback';
import Nav from '@/components/nav/Nav';
import Date from '@/components/record/Date';
import DefaultThemeStore from '@/components/record/DefaultThemeStore';
import Grade from '@/components/record/Grade';
import RemainingTime from '@/components/record/RemainingTime';
import TextArea from '@/components/record/TextArea';
import UploadImage from '@/components/record/UploadImage';
import debounce from '@/utils/debounce';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function RecordPage() {
	const navigate = useNavigate();
	const [length, setLength] = useState(0);
	const [theme, setTheme] = useState('');
	const [store, setStore] = useState('');
	const [date, setDate] = useState('');
	const [grade, setGrade] = useState('');
	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');
	const [content, setContent] = useState('');
	const [data, setData] = useState([]);
	const photoRef = useRef(null);
	const uploadPhotoRef = useRef(null);

	// 테마명 상태 관리
	const handleTheme = (e) => {
		setTheme(e.target.value);
	};
	const debounceTheme = debounce((e) => handleTheme(e), 2000);

	// 업체명 상태 관리
	const handleStore = (e) => {
		setStore(e.target.value);
	};
	const debounceStore = debounce((e) => handleStore(e), 2000);

	// 날짜 상태 관리
	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	// 평점 상태 관리
	const handleRatingChange = (e) => {
		setGrade(e.target.value);
	};

	// 남은시간 - Hour 상태 관리
	const handleRemainingTimeChange = (e) => {
		setHour(e.target.value);
	};

	// 남은시간 - Minute 상태 관리
	const handleRemainingTimeMinuteChange = (e) => {
		setMinute(e.target.value);
	};

	// 사진 상태 관리
	const handleUploadPhoto = (e) => {
		const photoFile = e.target.files[0];
		const photoUrl = URL.createObjectURL(photoFile);
		uploadPhotoRef.current.setAttribute('src', photoUrl);
	};

	// 후기 상태 관리
	const handleContentChange = (e) => {
		setContent(e.target.value);
		setLength(e.target.value.length);
	};

	// 기록 등록하기 이벤트
	const handleSubmitRecord = async (e) => {
		e.preventDefault();
		const userRecord = {
			theme: theme,
			store: store,
			date: date,
			grade: Number(grade),
			hour: Number(hour),
			minute: Number(minute),
			content: content,
			image: photoRef.current.files[0],
			author: `${userUId?.model.id}`,
			nickName: `${userUId?.model.nickName}`,
		};

		try {
			const result = await pb.collection('record').create(userRecord);

			const userRecord1 = {
				record: [...data, `${result.id}`],
			};

			await pb.collection('users').update(`${userUId?.model.id}`, userRecord1);

			toast('등록되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});
			navigate(`/upload/${result.id}`);
		} catch (err) {
			console.log(`등록하기 에러: ${err}`);
		}
	};

	useEffect(() => {
		const dataList = async () => {
			const userRecord = await pb
				.collection('users')
				.getOne(`${userUId?.model.id}`, {
					expand: 'record',
				});

			try {
				setData(userRecord.record);
			} catch (err) {
				console.log(`불러오기 내용: ${err}`);
			}
		};
		dataList();
	}, []);

	return (
		<>
			<Helmet>
				<title>클리어</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto text-lg pt-16">
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					클리어
				</Headerback>
				<form
					className="flex flex-col gap-6 py-5 s:py-2 mb-24"
					onSubmit={handleSubmitRecord}
				>
					<fieldset className="flex flex-col gap-7">
						<DefaultThemeStore
							theme={theme}
							themeEvent={debounceTheme}
							store={store}
							storeEvent={debounceStore}
						/>
						<Date dateValue={date} onChange={handleDateChange} />
						<Grade grade={grade} onChange={handleRatingChange} />
						<RemainingTime
							hour={hour}
							hourEvent={handleRemainingTimeChange}
							minute={minute}
							minuteEvent={handleRemainingTimeMinuteChange}
						/>
						<UploadImage
							inputRef={photoRef}
							onChange={handleUploadPhoto}
							imgRef={uploadPhotoRef}
							src={thumnail}
							alt="썸네일"
						/>
					</fieldset>
					<TextArea
						value={content}
						onChange={handleContentChange}
						placeholder="후기를 작성해주세요 😀"
					>
						{length}
					</TextArea>
					<Button bg="bg-ec1 text-center" text="text-ec4 m-auto" type="submit">
						등록
					</Button>
				</form>
			</div>
			<Nav />
		</>
	);
}

export default RecordPage;
