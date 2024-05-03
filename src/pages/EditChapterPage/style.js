import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #EAE8DC;

    .ql-toolbar,
    .ql-editor {
        background-color: #fff;
    }

`;

export const WrapperContent = styled.div`
    padding: 20px;
    width: 70%;
    margin-top: 50px;
    margin-bottom: 20px;
    height: fit-content;
    background-color: #F4F2EC;

    

    button {
        border-radius: 5px;
        color: white;
        background-color: #0E3746;
        width: 80px;
        padding: 10px;
        border: none;
        
        &:hover {
            background-color: #071e26;
            cursor: pointer;
        }
    }

    .ql-editor{
        font-size: 24px;
        height: 300px;
    }

    .ant-form-item-required {
        font-size: 30px;
        font-weight: 500;
        margin-bottom: 10px;
        color: #0E3746 !important;
    }
`;
