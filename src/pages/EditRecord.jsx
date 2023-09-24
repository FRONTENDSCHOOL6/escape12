import pb from '@/api/pockethost';
import Spinner from '@/components/Spinner';
import Button from '@/components/button/Button';
import Headerback from '@/components/header/Headerback';
import Nav from '@/components/nav/Nav';
import DefaultThemeStore from '@/components/record/DefaultThemeStore';
import EditDate from '@/components/record/EditDate';
import EditGrade from '@/components/record/EditGrade';
import EditRemainingTime from '@/components/record/EditRemainingTime';
import TextArea from '@/components/record/TextArea';
import UploadImage from '@/components/record/UploadImage';
import debounce from '@/utils/debounce';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import noImage from '@/assets/noImage.png';
import noImageLight from '@/assets/noImageLight.png';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

function EditRecord() {
	const navigate = useNavigate();
	const { dataId } = useParams();
	const [data, setData] = useState([]);
	const [themeData, setThemeData] = useState('');
	const [store, setStore] = useState('');
	const [date, setDate] = useState('');
	const [grade, setGrade] = useState('');
	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');
	const [length, setLength] = useState(0);
	const [content, setContent] = useState('');
	const [escapeList, setEscapeList] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const photoRef = useRef(`${data.expand?.escapeList?.image}`);
	const uploadPhotoRef = useRef(null);
	const { theme } = useContext(ThemeContext);

	const handleTheme = (e) => {
		setThemeData(e.target.value);
	};
	const debounceTheme = debounce((e) => handleTheme(e), 2000);

	const handleStore = (e) => {
		setStore(e.target.value);
	};
	const debounceStore = debounce((e) => handleStore(e), 2000);

	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	const handleRatingChange = (e) => {
		setGrade(e.target.value);
	};

	const handleRemainingTimeChange = (e) => {
		setHour(e.target.value);
	};

	const handleRemainingTimeMinuteChange = (e) => {
		setMinute(e.target.value);
	};

	const handleUploadPhoto = (e) => {
		const photoFile = e.target.files[0];
		const photoUrl = URL.createObjectURL(photoFile);
		uploadPhotoRef.current.setAttribute('src', photoUrl);
	};

	const handleContentChange = (e) => {
		setContent(e.target.value);
		setLength(e.target.value.length);
	};

	useEffect(() => {
		const viewRecord = async () => {
			const record = await pb.collection('record').getOne(`${dataId}`, {
				expand: 'escapeList, author',
			});

			try {
				setIsLoading(true);
				setData(record);
				setThemeData(record.theme);
				setStore(record.store);
				setDate(record.date);
				setGrade(Number(record.grade));
				setHour(Number(record.hour));
				setMinute(Number(record.minute));
				setContent(record.content);
				setLength(record.content.length);
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

	const handleEditRecord = async (e) => {
		e.preventDefault();
		const userRecord = {
			theme: themeData,
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
			toast('수정되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});

			const result = await pb
				.collection('record')
				.update(`${dataId}`, userRecord);

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
					{`${!data.theme ? data.expand?.escapeList?.theme : data.theme
						} 기록 수정`}
				</title>
				<meta name="description" content="방탈러 홈페이지-기록 수정" />
				<meta property="og:title" content="방탈러 기록 수정" />
				<meta property="og:description" content="방탈러 기록 수정 페이지" />
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] flex flex-col items-center min-h-[100vh] m-auto text-lg relative py-20 bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1">
				<Headerback
					onClick={() => {
						navigate(-1);
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
						className="flex flex-col gap-6 px-5 s:px-2"
						onSubmit={handleEditRecord}
					>
						<fieldset className="flex flex-col gap-7">
							<DefaultThemeStore
								theme={themeData}
								themeEvent={debounceTheme}
								store={store}
								storeEvent={debounceStore}
							/>
							<EditDate value={date} onChange={handleDateChange} />
							<EditGrade grade={String(grade)} onChange={handleRatingChange} />
							<EditRemainingTime
								hour={String(hour)}
								hourEvent={handleRemainingTimeChange}
								minute={String(minute)}
								minuteEvent={handleRemainingTimeMinuteChange}
							/>
							<UploadImage
								inputRef={photoRef}
								onChange={handleUploadPhoto}
								imgRef={uploadPhotoRef}
								src={
									data.image
										? `https://refresh.pockethost.io/api/files/${data.collectionId}/${data.id}/${data.image}`
										: data.expand?.escapeList?.images
											? `https://refresh.pockethost.io/api/files/${data.expand?.escapeList.collectionId}/${data.expand?.escapeList.id}/${data.expand?.escapeList.images}`
											: theme === 'dark'
												? `${noImageLight}`
												: `${noImage}`
								}
								alt={
									data.theme
										? data.theme
										: data.expand?.escapeList?.theme
											? data.expand?.escapeList?.theme
											: '사진없음'
								}
							/>
							<TextArea value={content} onChange={handleContentChange}>
								{String(length)}
							</TextArea>
						</fieldset>
						<Button bg="text-center" text="m-auto" type="submit">
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
