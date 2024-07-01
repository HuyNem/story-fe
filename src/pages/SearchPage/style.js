import styled from "styled-components";
export const Wrapper = styled.div`
    background-color: #eae8dc;
    display: flex;
    flex-direction: column;
    padding: 15px 205px;

    @media (max-width: 1280px) {
        padding: 15px 70px;
    }

    @media (max-width: 1024px) {
        padding: 15px 40px;
    }

    @media (max-width: 800px) {
        padding: 15px 10px;
    }
`

export const WrapperContent = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const WrapperLeft = styled.div`
    flex: 1;
`;

export const WrapperStory = styled.div`

`;

export const WrapperRight = styled.div`
    h3 {
        font-size: 16px;
        font-weight: 600;
    }

    a {
        font-size: 14px;
        text-decoration: none;
    }

    @media (max-width: 600px) {
    display: none;
    }
`;

export const WrapperCategory = styled.div`
    margin-left: 20px;
    background-color: #eae8dc;
`;