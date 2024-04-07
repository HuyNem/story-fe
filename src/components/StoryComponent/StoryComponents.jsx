import React from 'react';
import { Story } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { slug } from '../../utils';

function StoryComponents({ image, name, key, id }) {
    const navigate = useNavigate();
    const slugName = slug(name)
    const { state } = useLocation();


    return (
        <Story>
            <div key={key} onClick={() => navigate(`/${slugName}`, {state: name})}>
                <img src={image}
                    alt='ảnh'
                />
                <p style={{ padding: '0px' }}>{name}</p>
            </div>
        </Story>
    );
}

export default StoryComponents;