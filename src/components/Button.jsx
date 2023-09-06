import { Link } from 'react-router-dom';
import { string } from 'prop-types';

Button.propTypes = {
    path: string.isRequired,
    type: string.isRequired,
    bg: string.isRequired,
    text: string.isRequired,
    children: string.isRequired,
};

function Button({
    path = '',
    type = 'button',
    bg = 'bg-ec3',
    text = 'bg-ec1',
    children,
}) {
    return (
        <Link to={path}>
            <button
                type={type}
                className={`text-center rounded-lg ${bg} ${text} w-32 h-8 font-semibold`}
            >
                {children}
            </button>
        </Link>
    );
}

export default Button;