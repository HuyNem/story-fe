import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

ButtonInputSearch.propTypes = {

};

function ButtonInputSearch(props) {
    const { size, placeholder, textButton } = props;
    return (
        <div style={{ display: 'flex' }}>
            <InputComponent placeholder={placeholder} size="large" style={{ borderRadius: "0px", }} />
            <Button type="link" size="large" icon={<SearchOutlined />} style={{ backgroundColor: '#fff', borderRadius: '0px', color: '#0E3746', padding: "0px 5px" }}>{textButton}</Button>
        </div>
    );
}

export default ButtonInputSearch;