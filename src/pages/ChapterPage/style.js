import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: rgb(234, 232, 220);
    height: fit-content;

    @media (max-width: 480px) {
        hr {
            background-size: 350px;
            margin-right: 20px;
        }
    }
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

    @media (max-width: 800px) {
        h2 {
            font-size: 20px;
        }

        h3 {
            font-size: 18px;
        }

        p {
            margin: 0px;
            margin-top: 10px;
        }
    }

    @media (max-width: 480px) {
        padding: 30px 0px;

        h2 {
            font-size: 18px;
        }

        h3 {
            font-size: 17px;
        }

        p {
            font-size: 15px;
        }
    }
    @media (max-width: 360px) {

        h2 {
            font-size: 16px;
        }

        h3 {
            font-size: 15px;
        }

        p {
            font-size: 14px;
        }
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
    
    @media (max-width: 480px) {
        font-size: 14px;
    }
    @media (max-width: 360px) {
        font-size: 12px;
    }
`;

export const WrapperContent = styled.div`

    display: flex;
    justify-content: space-around;
    margin: 0px 70px;
    
    p {
        font-style: sans-serif;
        white-space: pre-wrap;
        user-select: none;
        text-align: justify;
        margin: 0px;
        font-size: 24px;
    }

    @media (max-width: 1024px) {
        margin: 0px 40px;

        p {
            font-size: 22px;
        }
    }
    
    @media (max-width: 800px) {
        margin: 0px 10px;

        p {
            font-size: 20px;
        }
    }

    @media (max-width: 480px) {

        p {
            font-size: 18px;
        }
    }
`;