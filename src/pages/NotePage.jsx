import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';
import Headerback from '@/components/Headerback';
import FormInput from '@/components/loginsignup/FormInput';
import { useNavigate } from 'react-router-dom';

function AddCommunity() {
	const navigate = useNavigate();
	const [content, setContent] = useState('');
	const [date, setDate] = useState('');
	const [rating, setRating] = useState(1);
	const [remainingTime, setRemainingTime] = useState('09:00');

	const handleContentChange = (e) => {
		setContent(e.target.value);
	};
	const handleDateChange = (e) => {
		setDate(e.target.value);
	};
	const handleRatingChange = (e) => {
		setRating(parseInt(e.target.value));
	};
	const handleRemainingTimeChange = (e) => {
		setRemainingTime(e.target.value);
	};

	return (
		<>
			<Helmet>
				<title>클리어</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
				{/* header, headerback 맨 위 고정 */}
				<Headerback
					onClick={() => {
						navigate('/theme');
					}}
				>
					클리어
				</Headerback>
				<div className="flex flex-col gap-10 items-center text-center py-32 s:py-20">
					<div className="flex flex-col gap-3">
						<FormInput type="text" name="id" placeholder="테마명">
							테마명<sup className="text-red"> *</sup>
						</FormInput>
						<FormInput type="text" name="id" placeholder="업체명">
							업체명<sup className="text-red"> *</sup>
						</FormInput>
						{/* 날짜, 평점, 남은시간 정렬 */}
						<fieldset className="flex flex-wrap gap-5 justify-between text-ec1 relative px-2">
							<label className="w-32 s:min-w-fit">날짜</label>
							<input
								type="date"
								value={date}
								onChange={handleDateChange}
								className="w-[200px] s:w-[90%] text-ec4"
							/>
						</fieldset>
						<fieldset className="flex flex-wrap gap-5 justify-between text-ec1 relative px-2">
							<label className="w-32 s:min-w-fit">
								평점<sup className="text-red"> *</sup>
							</label>
							<input
								type="number"
								min="1"
								max="10"
								value={rating}
								onChange={handleRatingChange}
								className="w-[100px] s:w-[90%] text-ec4"
							/>{' '}
							/ 10
						</fieldset>
						<fieldset className="flex flex-wrap gap-5 justify-between text-ec1 relative px-2">
							<label className="w-32 s:min-w-fit">남은 시간</label>
							<input
								type="time"
								min="09:00"
								max="18:00"
								id="timeInput"
								value={remainingTime}
								onChange={handleRemainingTimeChange}
								className="w-[200px] s:w-[90%] text-ec4"
							/>
							LEFT
						</fieldset>
						<fieldset className="flex flex-wrap gap-5 justify-between text-ec1 relative px-2">
							<label className="w-32 s:min-w-fit">
								사진<sup className="text-red"> *</sup>
							</label>
							<input type="file" className="w-[200px] s:w-[90%] text-ec4" />
						</fieldset>
					</div>
					<textarea
						value={content}
						onChange={handleContentChange}
						placeholder="후기를 작성해주세요."
						className="w-full h-20 p-4 text-ec4 border rounded-lg mb-2"
					></textarea>
					<Button
						onClick={() => {
							navigate('/editpage');
						}}
						bg="bg-ec1 text-center"
						text="text-ec4 mt-4"
					>
						등록
					</Button>
				</div>
			</div>
			<Nav />
		</>
	);
}

export default AddCommunity;
