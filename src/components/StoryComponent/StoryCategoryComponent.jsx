import React from 'react';
import { WrapperStoryCategory, WrapperStoryCategoryLeft, WrapperStoryCategoryRight } from './style';
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import { slug } from '../../utils';



function StoryCategoryComponent({ storyCategoryKey, img, name, author, id }) {
    const navigate = useNavigate();

    let slugCategoy = slug(name);


    return (
        <WrapperStoryCategory key={storyCategoryKey} onClick={() => navigate(`/${slugCategoy}`, {state: name})}>
            <WrapperStoryCategoryLeft>
                <img src={img} alt='ảnh' />
            </WrapperStoryCategoryLeft>

            <WrapperStoryCategoryRight>
                <h5 style={{ padding: '0px' }}>{name}</h5>
                <p style={{ padding: '0px' }}><FaUser /> {author}</p>
            </WrapperStoryCategoryRight>
        </WrapperStoryCategory>
    );
}

export default StoryCategoryComponent;