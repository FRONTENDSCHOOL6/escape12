import pb from '@/api/pockethost';
import { useState } from 'react';

function Test() {
	// input value 상태 관리하기 -> input value에 기본상태값 연결시키기
	// input에 onChange 이벤트 연결시키기
	// form에 onSubmit 이벤트 연결시키고 기본 이벤트 해제(e.preventDefault();) 시키기
	// pockethost api 룰에 create참고하셔서 data 객체 불러와서 value값에 기본상태값 넣어주기 ex) author, record
	// form에 onSubmit이벤트 async함수로 변경해주고 파라미터에 이벤트 객체 불러오기 ex) const handleEvent = (e) => {}
	//  그러고 create 해주는 명령어 입력하기 (await pb.collection('test').create(data);)

	// 작성자 input 상태 관리
	const [author, setAuthor] = useState('');
	// 후기 input 상태 관리
	const [record, setRecord] = useState('');

	//작성자 상태 변경
	const handleAuthor = (e) => {
		setAuthor(e.target.value);
	};

	// 후기 상태 변경
	const handleRecord = (e) => {
		setRecord(e.target.value);
	};

	// 등록 이벤트
	const handleDateCrate = async (e) => {
		e.preventDefault();
		const data = {
			author,
			record,
		};

		try {
			await pb.collection('test').create(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form
			onSubmit={handleDateCrate}
			className="flex flex-col justify-center items-center h-screen"
		>
			{/* 작성자 상태 값 연결 및 onChange 이벤트 연결 */}
			<label htmlFor="author">작성자</label>
			<input
				type="author"
				id="author"
				value={author}
				placeholder="야무쌤"
				onChange={handleAuthor}
			/>
			{/* 후기 상태 값 연결 및 onChange 이벤트 연결 */}
			<label htmlFor="record">후기</label>
			<textarea
				type="text"
				id="record"
				value={record}
				placeholder="입력해주세요 😀"
				onChange={handleRecord}
			/>
			<button type="submit">등록</button>
		</form>
	);
}

export default Test;
