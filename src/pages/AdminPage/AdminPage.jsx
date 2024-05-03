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
import AdminStoryApprovalQueue from '../../components/AdminStoryApprovalQueue/AdminStoryApproval';
import { LuBookOpen } from "react-icons/lu";
import { LuBookOpenCheck } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";

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
    getItem('Người dùng', 'list-user', <FaUsers />),
    getItem('Thể loại', 'list-category', <MdOutlineCategory />),
    getItem('Truyện', 'list-story', <LuBookOpenCheck />),
    getItem('Truyện chờ duyệt', 'list-story-pending-approval', <LuBookOpen />)
];

function AdminPage(props) {
    const { } = props;
    const user = useSelector((state) => state.user);

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
                    {openKey === 'list-story-pending-approval' && <AdminStoryApprovalQueue />}
                </div>
            </div>
        </div>

    );
}

export default AdminPage;