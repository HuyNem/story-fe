import { Row } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled.div`
    padding: 0px 20px;
    background-color: #0E3746;
    align-items: center;

    .ant-dropdown-trigger:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 740px) {
        height: 45px;
    }
`

export const WrapperTextLogo = styled.span`
    font-size:18px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    font-family: "Madimi One", sans-serif;
    cursor: pointer;


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
    @media screen and (max-width: 740px) {
        width: 200px;
    }
`

export const WrapperHeaderSearch = styled.div`
  
    @media screen and (max-width: 740px) {
        display: none;
    }
`

export const WrapperHeaderCategory = styled.div`
    align-items: center;
    color: #fff;
    gap:10px;
    font-size: 14px;
    cursor: pointer;

    @media screen and (max-width: 740px) {
        display: none;
    }
`

export const WrapperHeaderSort = styled.div`
    align-items: center;
    color: #fff;
    gap:10px;
    font-size: 14px;
    cursor: pointer;

    @media screen and (max-width: 740px) {
        display: none;
      }
`

export const WrapperHeaderPost = styled.div`
    align-items: center;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    background-color: #BE2623;
    padding: 16px;
    margin-right: 11px;

    &:hover {
        background-color: #c44442;
    }

    @media screen and (max-width: 740px) {
        display: none;
      }
`

export const WrappeContentPopup = styled.p`
    cursor: pointer;

    &:hover {
        color: #BE2623;
    }

    
`


