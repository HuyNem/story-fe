import React from 'react';
import { CategoryItem } from './style';
import { IoMdPricetag } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { slug } from '../../utils';

function CategoryComponent({ categoryKey, name }) {

    const navigate = useNavigate();
    let slugCategoy = slug(name);

    return (
        <CategoryItem>
            <div key={categoryKey} onClick={() => navigate(`/the-loai/${slugCategoy}`, { state: name })}>
                <a href={slugCategoy} title={name}>
                    <IoMdPricetag className='icon-tag' />{name}
                </a>
            </div>
        </CategoryItem>
    );
}

export default CategoryComponent;