import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { FaUsers } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminStory from '../../components/AdminStory/AdminStory';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminCategory from '../../components/AdminCategory/AdminCategory';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Quản trị người dùng', 'sub1', <FaUsers />, [
        getItem('Quản lý người dùng', 'list-user'),
        getItem('Option 2', '2'),
    ]),
    getItem('Quản trị truyện', 'sub2', <GiOpenBook />, [
        getItem('Quản lý thể loại', 'quanlytheloai', null, [getItem('Danh sách thể loại', 'list-category'), getItem('Thêm thể loại', 'them-the-loai')], 'group'),
        getItem('Quản lý truyện', 'quanlytruyen', null, [getItem('Danh sách truyện', 'list-story'), getItem('Danh sách chờ duyệt', 'danh-sach-cho-duyet')], 'group'),

    ]),
    {
        type: 'divider',
    },
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];

function AdminPage(props) {
    const { } = props;
    const user = useSelector((state) => state.user);
    // const [admin, setAdmin] = useState(user?.isAdmin);
    // const [email, setEmail] = useState(user?.email);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (user?.isAdmin === false && user?.email === '') {
    //         navigate('/404')
    //     }
    // })

    const [openKey, setOpenKey] = useState('');
    const onClick = (e) => {
        setOpenKey(e.key);
    };

    return (
        <div>
            <HeaderComponent isHiddenSearch isHiddenCategory isHiddenSort isHiddenPostStory />
            <div style={{ display: 'flex' }}>
                <Menu
                    onClick={onClick}
                    style={{
                        width: 256,
                        height: '100vh',
                    }}

                    mode="inline"
                    items={items}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {openKey === 'list-user' && <AdminUser />}
                    {openKey === 'list-category' && <AdminCategory />}
                    {openKey === 'list-story' && <AdminStory />}
                </div>
            </div>
        </div>

    );
}

export default AdminPage;