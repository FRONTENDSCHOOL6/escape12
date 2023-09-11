import { useState } from 'react';

function Test() {
	// 작성자 input 상태 관리
	const [author, setAuthor] = useState('');
	// 후기 input 상태 관리
	const [record, setRecord] = useState('');

	//작성자 상태 변경
	const handleAuthor = () => {};

	// 후기 상태 변경
	const handleRecord = () => {};

	// 등록 이벤트
	const handleDateCrate = () => {};

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
			<button type="button">등록</button>
		</form>
	);
}

export default Test;
