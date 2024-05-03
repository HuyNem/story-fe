import styled from 'styled-components';
import { Button } from 'antd';

export const WrapperListStory = styled.div`
    width: 70%;
    border: 1px solid #ccc;
    padding: 10px;
    
`;

export const CustomButton = styled.div`
    background-color: ${props => props.bgColor ? props.bgColor : '#f0ad4e'};
    color: #fff;
    border: none;

    width: 86px;
    padding: 5px;

    display: flex;
    justify-content: center;

    border-radius: 5px;

    &:hover {
        background-color: ${props => props.hoverColor ? props.hoverColor : '#d98400'};
        cursor: pointer;
    }
`;

//chapter
export const WrapperListChapter = styled.div`
    width: 70%;
    border: 1px solid #ccc;
    padding: 10px;
    
`;