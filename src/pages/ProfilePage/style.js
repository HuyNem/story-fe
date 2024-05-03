import styled from "styled-components";
import { Upload } from 'antd';

export const Wrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

`;

export const WrapperHeaderProfile = styled.div`
    width: 700px;
    height: 500px;
    margin: 10px auto;
    border: 1px solid #ddd;
    padding: 10px;
    position: relative;
`;

export const WrapperHeader = styled.h1`
    font-size: 18px;
    margin: 14px 0;
    display: flex;
`;

export const WrapperContent = styled.div`
    display: flex;
    gap:20px;
`;
//content left
//wrapper
export const WrapperContentLeft = styled.div`
    width: 300px;
`;
//image
export const WrapperImage = styled.div`
    display: flex; 
    justify-content: center;
`;
//upload
export const WrapperUploadFile = styled(Upload)`
    display: flex; 
    justify-content: center;

    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius:15px;
    }
    & .ant-upload-list-item-container {
        display: none;
    }
`;


export const WrapperContentRight = styled.div`
    width: 80%;
`;

export const WrapperLabel = styled.label`
    color: #0E3746;
    // font-size:12px;
    font-weight: 400;
`;

export const WrapperInput = styled.div`
    margin-bottom: 10px
    // align-items: center;
    // gap: 10px;
`;

export const WrapperChangePass = styled.div`
    margin-top: 70px;
    margin-left: 15px;
`;

export const WrapperButton = styled.div`
    margin-top: 20px;
    position: absolute;
    right: 0;
`;
