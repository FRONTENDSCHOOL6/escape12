import pb from '@/api/pockethost';
import { getUserInfoFromStorage } from '@/api/getUserInfo';
import userNickName from '@/api/userNickName';
import Spinner from '@/components/Spinner';
import Button from '@/components/button/Button';
import Headerback from '@/components/header/Headerback';
import Nav from '@/components/nav/Nav';
import Date from '@/components/record/Date';
import Grade from '@/components/record/Grade';
import PhotoImage from '@/components/record/PhotoImage';
import RemainingTime from '@/components/record/RemainingTime';
import TextArea from '@/components/record/TextArea';
import ValueThemeStore from '@/components/record/ValueThemeStore';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

pb.autoCancellation(false);

function ThemeRecord() {
	const userUId = getUserInfoFromStorage();
	const navigate = useNavigate();
	const { dataId } = useParams();
	const [data, setData] = useState({});
	const [users, setUsers] = useState([]);
	const [date, setDate] = useState('');
	const [grade, setGrade] = useState('');
	const [length, setLength] = useState(0);
	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');
	const [content, setContent] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [record, setRecord] = useState([]);
	const [escapeList, setEscapeList] = useState([]);
	const [escapeListRecord, setEscapeListRecord] = useState([]);

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

	// 후기 상태 관리
	const handleContentChange = (e) => {
		setContent(e.target.value);
		setLength(e.target.value.length);
	};

	//테마 데이터 불러오기
	useEffect(() => {
		const dataList = async () => {
			const record = await pb.collection('escapeList').getOne(`${dataId}`, {
				expand: 'users,record',
			});

			const userRecord = await pb
				.collection('users')
				.getOne(`${userUId?.model.id}`, {
					expand: 'record',
				});

			const userEscapeList = await pb
				.collection('users')
				.getOne(`${userUId?.model.id}`, {
					expand: 'escapeList',
				});

			try {
				setData(record);
				setUsers(record.users);
				setRecord(userRecord.record);
				setEscapeList(userEscapeList.escapeList);
				setEscapeListRecord(record.record);
				setIsLoading(true);
			} catch (err) {
				console.log(`불러오기 내용: ${err}`);
			}
		};
		dataList();
	}, [dataId, userUId?.model.id]);

	// 기록 등록하기 이벤트
	const handleSubmitRecord = async (e) => {
		e.preventDefault();

		try {
			const themeRecord = {
				theme: `${data.theme}`,
				store: `${data.store}`,
				date: date,
				grade: grade * 2,
				hour: hour,
				minute: minute,
				content: content,
				author: `${userUId?.model.id}`,
				escapeList: `${dataId}`,
				nickName: userNickName,
			};

			const result = await pb.collection('record').create(themeRecord);

			const themeClear = {
				users: [...users, `${userUId?.model.id}`],
				record: [...escapeListRecord, `${result.id}`],
			};

			await pb.collection('escapeList').update(`${dataId}`, themeClear);

			const userRecord = {
				record: [...record, `${result.id}`],
				escapeList: [...escapeList, `${dataId}`],
			};

			await pb.collection('users').update(`${userUId?.model.id}`, userRecord);

			toast('등록되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});

			navigate(`/upload/${result.id}`);
		} catch (err) {
			console.log(`등록하기 에러: ${err}`);
		}
	};

	return (
		<div>
			<Helmet>
				<title>테마 클리어</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto relative pt-16 bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-lg">
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					클리어
				</Headerback>
				{!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				{isLoading && (
					<form
						className="flex flex-col gap-6 py-5 s:py-2 mb-24"
						onSubmit={handleSubmitRecord}
					>
						<fieldset className="flex flex-col gap-7">
							<ValueThemeStore theme={data.theme} store={data.store} />
							<Date dateValue={date} onChange={handleDateChange} />
							<Grade grade={grade} onChange={handleRatingChange} />
							<RemainingTime
								hour={hour}
								hourEvent={handleRemainingTimeChange}
								minute={minute}
								minuteEvent={handleRemainingTimeMinuteChange}
							/>
							<PhotoImage src={data.image} alt={data.theme} />
						</fieldset>
						<TextArea
							value={content}
							onChange={handleContentChange}
							placeholder="후기를 작성해주세요 😀"
						>
							{length}
						</TextArea>
						<Button
							bg="bg-ec1 text-center"
							text="text-ec4 m-auto"
							type="submit"
						>
							등록
						</Button>
					</form>
				)}
			</div>
			<Nav />
		</div>
	);
}

export default ThemeRecord;
