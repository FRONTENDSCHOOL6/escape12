import pb from '@/api/pockethost';
import userUId from '@/api/userUid';
import Button from '@/components/Button';
import Headerback from '@/components/Headerback';
import Nav from '@/components/Nav';
import FormInput from '@/components/loginsignup/FormInput';
import Select from '@/components/record/Select';
import Sup from '@/components/record/Sup';
import TextArea from '@/components/record/TextArea';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

pb.autoCancellation(false);

function ThemeRecord() {
	const navigate = useNavigate();
	const { dataId } = useParams();
	const [data, setData] = useState([]);
	const [date, setDate] = useState('');
	const [grade, setGrade] = useState(0);
	const [length, setLength] = useState(0);
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [content, setContent] = useState('');

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
			const record = await pb.collection('escapeList').getOne(`${dataId}`);

			try {
				setData(record);
			} catch (err) {
				console.log(`불러오기 내용: ${err}`);
			}
		};
		dataList();
	}, [dataId]);

	// 기록 등록하기 이벤트
	const handleSubmitRecord = async (e) => {
		e.preventDefault();

		try {
			const themeRecord = {
				theme: `${data.theme}`,
				store: `${data.store}`,
				date: date,
				grade: grade,
				hour: hour,
				minute: minute,
				content: content,
				author: `${userUId?.model.id}`,
				escapeList: `${dataId}`,
			};

			const result = await pb.collection('record').create(themeRecord);

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
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto relative pt-16 text-lg">
				<Headerback
					onClick={() => {
						navigate('/theme');
					}}
				>
					클리어
				</Headerback>
				<form
					className="flex flex-col gap-6 py-5 s:py-2"
					onSubmit={handleSubmitRecord}
				>
					<fieldset className="flex flex-col gap-7">
						<FormInput name="theme" value={data.theme} maxLength="20">
							<Sup>테마명</Sup>
						</FormInput>
						<FormInput name="store" value={data.store} maxLength="20">
							<Sup>업체명</Sup>
						</FormInput>
						{/* 날짜, 평점, 남은시간 정렬 */}
						<div className="flex text-ec1 px-2 gap-5">
							<label htmlFor="date" className="w-32 s:min-w-fit">
								<Sup>날짜</Sup>
							</label>
							<input
								type="date"
								id="date"
								defaultValue={date}
								onChange={handleDateChange}
								required
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
								defaultValue={grade}
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
									defaultValue={hour}
									onChange={handleRemainingTimeChange}
									max={1}
								/>
								:
								<Select
									id="clearTime"
									name="minute"
									defaultValue={minute}
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
							<div className="h-[140px] bg-opacity p-2 rounded-lg border-2 border-ec1">
								<img className="h-full" src={data.image} alt={data.theme} />
							</div>
						</div>
					</fieldset>
					<div className="relative">
						<TextArea
							value={content}
							onChange={handleContentChange}
							placeholder="후기를 작성해주세요 😀"
						/>
						<p className="text-right absolute -bottom-5 right-0">
							{length}/ 250
						</p>
					</div>
					<Button bg="bg-ec1 text-center" text="text-ec4 m-auto" type="submit">
						등록
					</Button>
				</form>
			</div>
			<Nav />
		</div>
	);
}

export default ThemeRecord;
