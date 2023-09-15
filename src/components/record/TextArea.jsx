import { string, func } from 'prop-types';

TextArea.propTypes = {
    value: string,
    onChange: func,
    style: string,
};

function TextArea({
    value,
    onChange = null,
    style = 'text-ec4 h-40',
    ...restProps
}) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            className={`w-full p-4 rounded-lg ${style}`}
            maxLength={250}
            required
            {...restProps}
        />
    );
}

export default TextArea;