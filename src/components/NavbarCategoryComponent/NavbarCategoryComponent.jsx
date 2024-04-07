import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { WrapperLabel } from './style';
import { Col, Row } from 'antd';
import { WrapperCategoryItem, NavCategory } from './style';
import { useQueries } from 'react-query';
import { useQuery } from '@tanstack/react-query';
import CategoryComponent from './CategoryComponent';
import * as CategoryService from '../../services/CategoryService';


function NavbarCategoryComponent() {

    const fetchCategoryApi = async () => {
        const res = await CategoryService.getAllCategory();
        return res;
    }
    const { isPending, data: categories } = useQuery({ queryKey: ['category'], queryFn: fetchCategoryApi, retry: 3, retryDelay: 1000 });

    return (
        <NavCategory>
            <WrapperLabel>Thể loại</WrapperLabel>
            <hr />
            <WrapperCategoryItem>
                {categories && categories?.data.map((category) => {
                    return (
                        <CategoryComponent key={category._id} name={category.name}/>
                    )
                })}
            </WrapperCategoryItem>
        </NavCategory>
    );
}

export default NavbarCategoryComponent;