import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { WrapperLabel } from './style';
import { Col, Row } from 'antd';
import { WrapperCategoryItem } from './style';
import { useQueries } from 'react-query';
import { useQuery } from '@tanstack/react-query';

NavbarCategoryComponent.propTypes = {

};

function NavbarCategoryComponent(props) {
    // const [categories, setCategory] = useState([]);

    // useEffect(() => {

    //     loadCategory();

    // }, [])

    // const loadCategory = async () => {
    //     const result = await axios.get(`${process.env.REACT_APP_API_URL}/admin/category`);
    //     setCategory(result.data.data);
    // }
    // const fetchApi = async () => {
    //     const res = await axios.get(`${process.env.REACT_APP_API_URL}admin/category`);
    //     return res.data;
    // }
    // const query = useQuery({ querykey: ['todos'], queryFn: fetchApi });
    // console.log(query);

    // const columns = 2; // Số cột
    // const rowsPerColumn = Math.ceil(categories.length / columns);
    return (
        <div style={{ border: '1px solid #F4F2EC', marginRight: '15px', backgroundColor: '#F4F2EC', height: 'fit-content' }}>
            {/* <WrapperLabel>Thể loại</WrapperLabel>
            <hr />

            {[...Array(rowsPerColumn)].map((_, rowIndex) => (
                <Row key={rowIndex} style={{ padding: '0px 10px' }}>
                    {[...Array(columns)].map((_, colIndex) => {
                        const categoryIndex = rowIndex * columns + colIndex;
                        const category = categories[categoryIndex];

                        return (
                            category && (
                                <Col span={24 / columns} key={colIndex} >
                                    <WrapperCategoryItem>{category.name}</WrapperCategoryItem>
                                </Col>
                            )
                        );
                    })}
                </Row>
            ))} */}
        </div>
    );
}

export default NavbarCategoryComponent;