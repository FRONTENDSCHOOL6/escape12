import { string, func } from 'prop-types';
import PlusButton from '../button/PlusButton';
import pencil from '@/assets/plusbutton-pencil.png';
import ThemeToggleButton from '../button/ThemeToggleButton';

HeaderRecord.propTypes = {
	pencilClick: func,
	children: string,
};

function HeaderRecord({ pencilClick, children }) {
  return (
    <header className="max-w-[600px] min-w-[320px] m-auto fixed top-0 left-0 right-0 py-3 text-center bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-2xl font-bold z-10 flex items-center justify-center">
      <h2>{children}</h2>
      <PlusButton
        onClick={pencilClick}
        src={pencil}
        alt="기록하기"
        location="top-0 right-4 bg-opacity"
      />
      <ThemeToggleButton />
    </header>
  );
}

export default HeaderRecord;
