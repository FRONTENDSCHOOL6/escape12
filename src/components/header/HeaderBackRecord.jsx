import pencil from '@/assets/plusbutton-pencil.png';
import ThemeToggleButton from '../button/ThemeToggleButton';
import { func, string } from 'prop-types';
import PlusButton from '../button/PlusButton';

HeaderBackRecord.propTypes = {
	children: string,
	onClick: func,
	pencilClick: func,
};

function HeaderBackRecord({
	onClick = () => {},
	children,
	pencilClick = null,
}) {
	return (
		<header className="max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0 py-3 text-center bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-2xl font-bold z-10 flex items-center justify-center">
			<div className="max-w-screen-md mx-auto flex items-center">
				<button className="ml-2 absolute top-3 left-3" onClick={onClick}>
					&lt;
				</button>
				<div className="mx-auto flex-grow">
					<div className='flex items-center pl-5'>
						<h2 className="mx-auto flex-grow">{children}
						</h2>
						<ThemeToggleButton />
					</div>
					<PlusButton
						onClick={pencilClick}
						src={pencil}
						alt="기록하기"
						location="bg-opacity right-2 top-1"
					/>
				</div>
			</div>

		</header>
	);
}

export default HeaderBackRecord;
