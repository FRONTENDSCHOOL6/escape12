import pb from '@/api/pockethost';
import Button from '@/components/Button';
import Headerback from '@/components/Headerback';
import Nav from '@/components/Nav';
import FormInput from '@/components/loginsignup/FormInput';
import Select from '@/components/record/Select';
import Sup from '@/components/record/Sup';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

pb.autoCancellation(false);

function ThemeRecord() {
	const { dataId } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [date, setDate] = useState('');
	const [grade, setGrade] = useState('');
	const [length, setLength] = useState(0);
	const [time, setTime] = useState('');
	const [minute, setMinute] = useState('');
	const [content, setContent] = useState('');

	// 날짜 상태 관리
	const handleDateChange = (e) => {
		setDate(e.target.value);
	};
	const debounceDate = debounce((e) => handleDateChange(e), 10000);

	// 평점 상태 관리
	const handleRatingChange = (e) => {
		setGrade(e.target.value);
	};
	const debounceRating = debounce((e) => handleRatingChange(e), 10000);

	// 남은시간 - Hour 상태 관리
	const handleRemainingTimeChange = (e) => {
		setTime(e.target.value);
	};
	const debounceHour = debounce((e) => handleRemainingTimeChange(e), 5000);

	// 남은시간 - Minute 상태 관리
	const handleRemainingTimeMinuteChange = (e) => {
		setMinute(e.target.value);
	};
	const debounceMinute = debounce(
		(e) => handleRemainingTimeMinuteChange(e),
		5000
	);

	// 후기 상태 관리
	const handleContentChange = (e) => {
		setContent(e.target.value);
		setLength(e.target.value.length);
	};

	useEffect(() => {
		const dataList = async () => {
			const record = await pb.collection('escapeList').getOne(`${dataId}`);
			pb.autoCancellation(false);
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
		const themeRecord = {
			date: date,
			grade: grade,
			hour: time,
			minute: minute,
			content: content,
			author: `${data.theme}`,
			theme: `${data.id}`,
		};

		console.log(themeRecord);

		try {
			await pb.collection('record').create(themeRecord);

			toast('등록되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});
		} catch (err) {
			console.log(`등록하기 에러: ${err}`);
		} finally {
			console.log('왜안돼');
		}
	};

	return (
		<div>
			<Helmet>
				<title>테마 클리어</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
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
								날짜
							</label>
							<input
								type="date"
								id="date"
								defaultValue={date}
								onChange={debounceDate}
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
								onChange={debounceRating}
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
									defaultValue={time}
									onChange={debounceHour}
									max={1}
								/>
								:
								<Select
									id="clearTime"
									name="minute"
									defaultValue={minute}
									onChange={debounceMinute}
									max={59}
								/>
								LEFT
							</div>
						</div>
						<div className="flex flex-col gap-5 text-ec1 relative px-2">
							<label htmlFor="image">
								<Sup>사진</Sup>
							</label>
							<div className="h-[140px] bg-opacity p-2 rounded-lg border border-ec1">
								<img className="h-full" src={data.image} alt={data.theme} />
							</div>
						</div>
					</fieldset>
					<div>
						<textarea
							value={content}
							onChange={handleContentChange}
							placeholder="후기를 작성해주세요 😀"
							className="w-full h-40 p-4 text-ec4 border rounded-lg"
							maxLength={250}
							required
						/>
						<p className="text-right">{length}/ 250</p>
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
