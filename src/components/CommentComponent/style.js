import styled from 'styled-components';

export const Wrapper= styled.div`
    margin-top: 10px;
    margin-right: 10px;

    background-color: #F4F2EC;

    h3 {
        margin: 0px;
        padding: 10px;
        color: #0E3746;
    }

    button {
        background-color: #277CB4;
        border: none;
        border-radius: 2px;
        color: #fff;
        position: relative;
        left: 690px;
        top: 20px;
        width: 70px;
        padding: 5px 10px;

        &:hover {
            background-color: #277CB4;
            cursor: pointer;
        }
    }

    .text-area {
        width: 740px;
        margin: 0px 20px;
    }

    .ant-list-items {
        margin: 10px 20px;
    }
`