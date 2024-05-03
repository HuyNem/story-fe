import React from 'react';
import { Story } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { slug } from '../../utils';

function VerticalStory({ image, name, key, id }) {
    const navigate = useNavigate();
    const slugName = slug(name)


    return (
        <Story>
            <div key={key} onClick={() => navigate(`/truyen/${slugName}`, {state: {name: name, id: id}})}>
                <img src={image}
                    alt='ảnh'
                />  
                <p style={{ padding: '0px' }}>{name}</p>
            </div>
        </Story>
    );
}

export default VerticalStory;