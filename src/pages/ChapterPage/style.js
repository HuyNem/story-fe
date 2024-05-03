import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: rgb(234, 232, 220);
    height: fit-content;
`;

export const WrapperStoryDetail = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 70px;
    color: #0E3746;
    
    h2 {
        margin: 0px;
    }

    h3 {
        margin: 0px;
        margin-top: 10px;
    }

    p {
        margin: 0px;
        margin-top: 10px;
    }
`;

export const WrapperChap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

export const WrapperButton = styled.div`
    display: inline;
    background-color: #0E3746;
    padding: 10px;
    color: #fff;
    margin: 3px;
    border-radius: 5px;

    &:hover {
        background-color: #071e26;
        cursor: pointer;
    }
`;

export const WrapperContent = styled.div`

    display: flex;
    justify-content: space-around;
    margin: 0px 90px;
    
    p {
        font-style: sans-serif;
        white-space: pre-wrap;
        user-select: none;
        text-align: justify;
        margin: 0px;
        font-size: 24px;
    }
`;