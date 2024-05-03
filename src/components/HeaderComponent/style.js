import { Row } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled.div`
    height: 50px;
    background-color: #0E3746;
    align-items: center;
    display: flex;
    margin: auto;

    .ant-dropdown-trigger:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 23.375em) { 
        display: none;
    }

    //739
    @media screen and (max-width: 46.1875em) { 
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0px 2px;
    }
`

export const WrapperTextLogo = styled.span`
    margin: 0px;
    font-size:18px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    font-family: "Madimi One", sans-serif;
    cursor: pointer;

    //375 iphone SE
    @media screen and (max-width: 23.375em) { 
        display: none;
    }

    //739
    @media screen and (max-width: 46.1875em) {
        
    }
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

    //739
    @media screen and (max-width: 46.1875em) {
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


