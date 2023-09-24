import { func, string } from 'prop-types';

ChatInput.propTypes = {
	value: string,
	onChange: func,
	onSubmit: func,
};

function ChatInput({ value = '', onChange, onSubmit = null }) {
	return (
		<form
			onSubmit={onSubmit}
			className={`flex gap-4 w-full justify-center text-lg pb-4 absolute bottom-0 px-5 s:px-12`}
		>
			<input
				type="text"
				name="comment"
				placeholder="채팅을 등록해주세요 😀"
				onChange={onChange}
				maxLength={100}
				value={value}
				required
				autoComplete="off"
				className="px-3 py-1 grow rounded-full focus:outline-none"
			/>
			<button
				type="submit"
				className={`bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 min-w-fit rounded-lg px-2 font-semibold whitespace-nowrap s:px-1`}
			>
				등록
			</button>
		</form>
	);
}

export default ChatInput;
