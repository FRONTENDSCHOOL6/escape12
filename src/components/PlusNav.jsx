import pencil from '@/assets/plusbutton-pencil.png';
import top from '@/assets/plusbutton-top.png';
import { func, string } from 'prop-types';
import Nav from './Nav';
import PlusButton from './PlusButton';

PlusNav.propTypes = {
    topClick: func,
    pencilClick: func,
    hidden: string,
};

function PlusNav({ topClick, pencilClick, hidden }) {
    return (
        <div className="m-auto fixed bottom-0 left-0 right-0 max-w-[600px] min-w-[320px]">
            <PlusButton
                onClick={topClick}
                src={top}
                alt="위로가기"
                hidden={hidden}
                location="right-4 bottom-40"
            />
            <PlusButton
                onClick={pencilClick}
                src={pencil}
                alt="기록하기"
                location="right-4 bottom-20"
            />
            <Nav />
        </div>
    );
}

export default PlusNav;