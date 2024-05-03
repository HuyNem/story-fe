import styled from "styled-components";
import { Upload } from 'antd';

export const Wrapper = styled.div`
    background-color: #eae8dc;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .ant-breadcrumb {
        margin: 10px 0px;
        margin-right: 340px;
    }
`;

export const WrapperContent = styled.div`
    background-color: #f4f2ec;
    width: 600px;
    height: fit-content;
    padding-bottom: 20px;
    margin-bottom: 20px;

`;

export const WrapperForm = styled.div`
    margin: 10px 10px;
`;

export const WrapperHeader = styled.h1`
    font-size: 14px;
    background-color: #0E3746;
    color: #fff;
    padding: 10px;
    margin: 0px;
`;



export const WrapperInput = styled.div`
    margin-bottom: 10px
    margin-top: 5px
    // align-items: center;
    // gap: 10px;
`;

export const WrapperLabel = styled.label`

`;

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius:15px;
    }
    & .ant-upload-list-item-container {
        display: none;
    }
`;