import { string, number, func } from 'prop-types';

Select.propTypes = {
    id: string,
    name: string,
    value: string,
    onChange: func,
    max: number,
};

function Select({ id, name, value, onChange, max }) {
    const options = [];
    for (let i = 0; i <= max; i++) {
        options.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }

    return (
        <select
            name={name}
            id={id}
            defaultValue={value}
            onChange={onChange}
            required
            className="w-[100px] s:w-[50%] text-ec4 text-center"
        >
            <option value="">선택</option>
            {options}
        </select>
    );
}

export default Select;