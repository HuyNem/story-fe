import styled from "styled-components";
import { Upload } from 'antd';

export const WrapperHeader = styled.h1`
    font-size: 14px;
    margin: 14px 0;
    background-color: #0E3746;
    color: #fff;
    padding: 10px;
`;

export const WrapperContent = styled.div`
    gap: 20px;
`;

export const WrapperInput = styled.div`
    margin-bottom: 10px
    margin-top: 5px
    // align-items: center;
    // gap: 10px;
`;

export const WrapperLabel = styled.label`
    // color: #0E3746;
    // font-size:12px;
    // font-weight: 600;
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