import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 20px 200px;
    background-color: #EAE8DC;
    display: flex;
    justify-content: space-between;
    

    //responsive
    @media (max-width: 1280px) {
        padding: 20px 70px;
    }

    @media (max-width: 1024px) {
        padding: 20px 40px;
    }
    
    @media (max-width: 800px) {
        padding: 20px 10px;
    }
`

export const WrapperNav = styled.div`
    display: flex;
    flex-direction: column;

    @media(max-width: 600px) {
        display: none;
    }

    @media(max-width: 500px) {
        display: none;
    }
`

export const WrapperContent = styled.div`

`