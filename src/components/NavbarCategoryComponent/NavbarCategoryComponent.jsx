import React from 'react';
import { WrapperLabel } from './style';
import { WrapperCategoryItem, NavCategory } from './style';
import { useQuery } from '@tanstack/react-query';
import CategoryComponent from './CategoryComponent';
import * as CategoryService from '../../services/CategoryService';
import SkeletonCategories from '../Skeleton/SkeletonCategories';


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
            <SkeletonCategories loading={isPending}/>
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