import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

InputComponent.propTypes = {

};

function InputComponent(props) {
    const { placeholder, size, style, value, onChange } = props;
    return (
        <div>
            <Input placeholder={placeholder} size={size} style={style} value={value} onChange={onChange}/>
        </div>
    );
}

export default InputComponent;