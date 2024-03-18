import styled from "styled-components";
//anticon anticon-left
export const WrapperContainer = styled.div`
    .anticon {
        position: relative;
        left: 20px;
        top: 20px;
        color: #0E3746;

        &:hover {
            cursor: pointer;
        }
    }

    & h2 {
        display: flex;
        justify-content: left;
        color: #0E3746;
        padding-top:10px;
        padding-left:20px;
    }

    & h3 {
        display: flex;
        justify-content: left;
        color: #0E3746;
        padding-left:20px;
    }

    .ant-input{
        width:50%;

    }
`;