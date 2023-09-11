import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/Headerback';
import FormInput from '@/components/loginsignup/FormInput';
import { useNavigate } from 'react-router-dom';
import thumnail from '@/assets/notepage-thumbnail.png';
import Sup from '@/components/record/Sup';
import { useRef } from 'react';
import pb from '@/api/pockethost';

function AddCommunity() {
	const navigate = useNavigate();
	const [length, setLength] = useState(0);
	const [theme, setTheme] = useState('');
	const [store, setStore] = useState('');
	const [date, setDate] = useState('');
	const [grade, setGrade] = useState(0);
	const [time, setTime] = useState('01:00');
	const [content, setContent] = useState('');
	const photoRef = useRef(null);
	const uploadPhotoRef = useRef(null);

	// 테마명 상태 관리
	const handleTheme = (e) => {
		setTheme(e.target.value);
	};

	// 업체명 상태 관리
	const handleStore = (e) => {
		setStore(e.target.value);
	};

	// 날짜 상태 관리
	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	// 평점 상태 관리
	const handleRatingChange = (e) => {
		setGrade(e.target.value);
	};

	// 남은 시간 상태 관리
	const handleRemainingTimeChange = (e) => {
		setTime(e.target.value);
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
		const data = {
			author: '',
			record: '',
		};

		await pb.collection('test').create(data);
	};

	return (
		<>
			<Helmet>
				<title>클리어</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				{/* header, headerback 맨 위 고정 */}
        <div className='max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0'>
				<Headerback
					onClick={() => {
						navigate('/theme');
					}}
				>
					클리어
				</Headerback>
        </div>
				<form
					className="flex flex-col gap-6 py-5 s:py-2"
					onSubmit={handleSubmitRecord}
				>
					<fieldset className="flex flex-col gap-7 px-20 s:px-12">
						<FormInput
							name="theme"
							placeholder="테마명"
							maxLength="20"
							value={theme}
							onChange={handleTheme}
						>
							<Sup>테마명</Sup>
						</FormInput>
						<FormInput
							name="store"
							placeholder="업체명"
							maxLength="20"
							value={store}
							onChange={handleStore}
						>
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
								value={date}
								onChange={handleDateChange}
								className="w-[200px] s:w-[90%] text-ec4 text-center"
							/>
						</div>
						<div className="flex gap-5 text-ec1 relative px-2">
							<label htmlFor="grade" className="w-32 s:min-w-fit">
								<Sup>평점</Sup>
							</label>
							<select
								name="grade"
								id="grade"
								value={grade}
								onChange={handleRatingChange}
								required
								className="w-[100px] s:w-[50%] text-ec4 text-center "
							>
								<option value="">0</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
							</select>
							<span className="s:min-w-fit">/ 10</span>
						</div>
						<div className="flex gap-5 text-ec1 relative px-2">
							<label htmlFor="clearTime" className="w-32 s:min-w-fit">
								남은 시간
							</label>
							<input
								type="time"
								id="clearTime"
								min="00:00"
								max="01:00"
								value={time}
								onChange={handleRemainingTimeChange}
								className="w-[200px] s:w-[50%] text-ec4 text-center"
							/>
							LEFT
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
								required
								accept="*.jpg,*.png,*.webp,*.avif"
								multiple
							/>
							<div className="h-[140px] bg-opacity p-2 rounded-lg border border-ec1">
								<img
									ref={uploadPhotoRef}
									className="h-full"
									src={thumnail}
									alt="썸네일"
								/>
							</div>
						</div>
					</fieldset>
					<div className="px-20 s:px-12">
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
		</>
	);
}

export default AddCommunity;
