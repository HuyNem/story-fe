import React from 'react';
import { Story } from './style';

function StoryComponents({ image, name }) {
    return (
        <Story >
            <div>
                <img src={image}
                    alt='ảnh'
                />
                <p style={{ padding: '0px' }}>{name}</p>
            </div>
        </Story>
    );
}

export default StoryComponents;