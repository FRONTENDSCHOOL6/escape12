import pb from '@/api/pockethost';
import Button from '@/components/button/Button';
import Headerback from '@/components/header/Headerback';
import Nav from '@/components/nav/Nav';
import FormInput from '@/components/loginsignup/FormInput';
import Select from '@/components/record/Select';
import Sup from '@/components/record/Sup';
import TextArea from '@/components/record/TextArea';
import debounce from '@/utils/debounce';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Spinner from '@/components/Spinner';

function EditRecord() {
	const navigate = useNavigate();
	const { dataId } = useParams();
	const [data, setData] = useState([]);
	const [theme, setTheme] = useState('');
	const [store, setStore] = useState('');
	const [date, setDate] = useState('');
	const [grade, setGrade] = useState(0);
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [length, setLength] = useState(0);
	const [content, setContent] = useState('');
	const [escapeList, setEscapeList] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const photoRef = useRef(`${data.expand?.escapeList?.image}`);
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

	// 데이터 불러오기
	useEffect(() => {
		const viewRecord = async () => {
			const record = await pb.collection('record').getOne(`${dataId}`, {
				expand: 'escapeList, author',
			});

			try {
				setIsLoading(true);
				setData(record);
				setTheme(record.theme);
				setStore(record.store);
				setDate(record.date);
				setGrade(Number(record.grade));
				setHour(Number(record.hour));
				setMinute(Number(record.minute));
				setContent(record.content);
				{
					record.expand?.escapeList
						? setEscapeList(true)
						: setEscapeList(false);
				}
			} catch (err) {
				console.log(`불러오기에러: ${err}`);
			}
		};

		viewRecord();
	}, [dataId]);

	// 기록 등록하기 이벤트
	const handleEditRecord = async (e) => {
		e.preventDefault();
		const userRecord = {
			theme: theme,
			store: store,
			date: date,
			grade: grade,
			hour: hour,
			minute: minute,
			content: content,
			image: photoRef.current.files[0],
			author: `${data.expand?.author?.id}`,
			escapeList: escapeList ? `${data.expand?.escapeList?.id}` : '',
		};

		try {
			const result = await pb
				.collection('record')
				.update(`${dataId}`, userRecord);

			toast('수정되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});
			navigate(`/upload/${result.id}`);
		} catch (err) {
			console.log(`등록하기 에러: ${err}`);
			console.log(userRecord);
		}
	};

	return (
		<>
			<Helmet>
				<title>
					{`${
						!data.theme ? data.expand?.escapeList?.theme : data.theme
					} 기록 수정`}
				</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto text-lg py-12 relative">
				<Headerback
					onClick={() => {
						Navigate('/theme');
					}}
				>
					수정하기
				</Headerback>
				{!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				{isLoading && (
					<form
						className="flex flex-col gap-6 py-5 s:py-2"
						onSubmit={handleEditRecord}
					>
						<fieldset className="flex flex-col gap-7">
							<FormInput
								name="theme"
								placeholder="테마명"
								maxLength="20"
								defaultValue={theme}
								onChange={debounceTheme}
							>
								<Sup>테마명</Sup>
							</FormInput>
							<FormInput
								name="store"
								placeholder="업체명"
								maxLength="20"
								defaultValue={store}
								onChange={debounceStore}
							>
								<Sup>업체명</Sup>
							</FormInput>
							<div className="flex text-ec1 px-2 gap-5">
								<label htmlFor="date" className="w-32 s:min-w-fit">
									날짜
								</label>
								<input
									type="date"
									id="date"
									value={date}
									onChange={handleDateChange}
									className="w-[200px] s:w-[90%] text-ec4 text-center"
								/>
							</div>
							<div className="flex gap-5 text-ec1 relative px-2">
								<label htmlFor="grade" className="w-32 s:min-w-fit">
									<Sup>평점</Sup>
								</label>
								<Select
									id="grade"
									name="grade"
									onChange={handleRatingChange}
									max={10}
									value={grade}
									required
								/>
								<span className="s:min-w-fit">/ 10</span>
							</div>
							<div className="flex gap-5 text-ec1 relative px-2">
								<label htmlFor="clearTime" className="w-32 s:min-w-fit">
									남은 시간
								</label>
								<div className="flex gap-2">
									<Select
										id="clearTime"
										name="hour"
										value={hour}
										onChange={handleRemainingTimeChange}
										max={1}
									/>
									:
									<Select
										id="clearTime"
										name="minute"
										value={minute}
										onChange={handleRemainingTimeMinuteChange}
										max={59}
									/>
									LEFT
								</div>
							</div>
							<div className="flex flex-col gap-5 text-ec1 relative px-2">
								<label htmlFor="image">
									<Sup>사진</Sup>
								</label>
								<input
									ref={photoRef}
									onChange={handleUploadPhoto}
									className="cursor-pointer absolute w-full h-full opacity-0"
									type="file"
									name="image"
									id="image"
									accept="*.jpg,*.png,*.webp,*.avif"
								/>
								<div className="h-[140px] bg-opacity p-2 rounded-lg border border-ec1">
									<img
										ref={uploadPhotoRef}
										className="h-full"
										src={
											!data.image
												? data.expand?.escapeList?.image
												: `https://refresh.pockethost.io/api/files/${data.collectionId}/${data.id}/${data.image}`
										}
										alt={data.theme}
									/>
								</div>
							</div>
							<div>
								<TextArea
									value={content}
									onChange={handleContentChange}
									placeholder="후기를 작성해주세요 😀"
								/>
								<p className="text-right">{length}/ 250</p>
							</div>
						</fieldset>
						<Button
							bg="bg-ec1 text-center"
							text="text-ec4 m-auto"
							type="submit"
						>
							수정
						</Button>
					</form>
				)}
			</div>
			<Nav />;
		</>
	);
}

export default EditRecord;
