import React from 'react';
import { WrapperStoryCategory, WrapperStoryCategoryLeft, WrapperStoryCategoryRight } from './style';
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

import { slug } from '../../utils';

function HorizontalStory({ storyCategoryKey, img, name, author, id, isCompleted, view }) {
    const navigate = useNavigate();

    let slugCategoy = slug(name);

    return (
        <WrapperStoryCategory key={storyCategoryKey} onClick={() => navigate(`/truyen/${slugCategoy}`, { state: { name: name, id: id } })}>
            <WrapperStoryCategoryLeft>
                <img src={img} alt='ảnh' />
            </WrapperStoryCategoryLeft>

            <WrapperStoryCategoryRight>
                <h5>{name}</h5>
                <p><FaUser /> {author}</p>
                <p className='full'>{isCompleted}</p>
                {view && (<p><FaEye /> {view}</p>)}
            </WrapperStoryCategoryRight>
        </WrapperStoryCategory>
    );
}

export default HorizontalStory;