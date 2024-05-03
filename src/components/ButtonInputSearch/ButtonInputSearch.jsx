import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';


function ButtonInputSearch(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { placeholder } = props;
    const [search, setSearch] = useState('');

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            if (search !== '') {
                navigate(`/tim-kiem/${search}`, { state: { q: search } });
                setSearch('');
            } else {
                navigate('/')
            }

        }
    }
    const handleSearch = () => {
        if (search !== '') {
            navigate(`/tim-kiem/${search}`, { state: { q: search } });
            setSearch('');
        } else {
            navigate('/');
        }
    };
    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div style={{ display: 'flex', margin: '5px' }}>
            <Input value={search} onChange={handleChange} onKeyDown={handleEnterSearch} placeholder={placeholder} size="middle" style={{ borderRadius: "0px", }} />
            <Button onClick={handleSearch} type="link" size="middle" icon={<SearchOutlined />} style={{ backgroundColor: '#fff', borderRadius: '0px', color: '#0E3746', padding: "0px 5px" }}></Button>
        </div>
    );
}

export default ButtonInputSearch;