import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

ButtonComponent.propTypes = {

};

function ButtonComponent(props) {
    const { size, icon, style, textButton, onClick, disabled } = props;
    return (
        <div>
            <Button type="link" size={size} icon={icon} style={{ ...style, backgroundColor: disabled && '#4e6f7a' || '#0E3746' }} disabled={disabled} onClick={onClick}>{textButton}</Button>
        </div>
    );
}

export default ButtonComponent;