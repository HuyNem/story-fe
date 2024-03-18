import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Input, Dropdown, Button, Menu } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperHeaderCategory } from './style';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


function HeaderComponent(props) {
    const navigate = useNavigate();
    const handleNavigateLogin = () => {
        navigate('/dang-nhap');
    }
    const Search = Input;

    const [categories, setCategory] = useState([]);

    useEffect(() => {

        loadCategory();

    }, [])

    const loadCategory = async () => {
        const result = await axios.get('http://localhost:8080/admin/category');
        setCategory(result.data.data);
    }

    const renderMenuItems = () => {
        return (
            <Menu>
                {categories.map(category => (
                    <Menu.Item key={category.id}>
                        {category.name}
                    </Menu.Item>
                ))}
            </Menu>
        );
    };

    const dropdownStyle = {
        position: 'absolute',
        top: '60px',
    };
    return (
        <div>
            <WrapperHeader >
                <Col span={3}></Col>
                <Col span={4}>
                    <WrapperTextHeader>DocTruyenOnline</WrapperTextHeader>
                </Col>
                <Col span={2}>
                    <Dropdown
                        overlay={renderMenuItems()}
                        placement="bottomLeft"
                        overlayStyle={dropdownStyle}
                    >
                        <WrapperHeaderCategory>Thể loại</WrapperHeaderCategory>
                    </Dropdown>
                </Col>
                <Col span={2}>
                    <WrapperHeaderCategory>Sắp xếp</WrapperHeaderCategory>
                </Col>

                <Col span={7}>
                    <ButtonInputSearch
                        placeholder="Tìm truyện, tác giả..."
                    />
                </Col>

                <Col span={3}>
                    <WrapperHeaderAccount >
                        <UserOutlined style={{ fontSize: '20px' }} />
                        <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                            <span>
                                Đăng nhập / Đăng ký
                            </span>
                        </div>
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
        </div>
    );
}

export default HeaderComponent;