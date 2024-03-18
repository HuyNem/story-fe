import { Row, Menu } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled(Row)`
    padding: 10px 20px;
    background-color: #0E3746;
    align-items: center;

    .ant-dropdown-trigger:hover {
        cursor: pointer;
      }
`

export const WrapperTextHeader = styled.span`
    font-size:18px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    font-family: "Madimi One", sans-serif;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap:10px;
    font-size: 14px;

    & a {
        color: #fff;
    }
`
export const WrapperHeaderCategory = styled.div`
    align-items: center;
    color: #fff;
    gap:10px;
    font-size: 14px;
`


