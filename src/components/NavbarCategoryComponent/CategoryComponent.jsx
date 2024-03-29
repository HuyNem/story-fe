import React from 'react';
import { CategoryItem } from './style';
import { IoMdPricetag } from "react-icons/io";

function CategoryComponent({ key, name }) {
    let str = name.toLowerCase();
    let str1 = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let str2 = str1.replace(/\s+/g, '-');
    return (
        <CategoryItem>
            <a href={str2} key={key} title={name}><IoMdPricetag className='icon-tag' />{name}</a>
        </CategoryItem>
    );
}

export default CategoryComponent;