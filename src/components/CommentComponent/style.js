import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 10px;
  background: #f4f2ec;

  .h3-comment {
    margin: 0px;
    padding: 10px;
    color: #0e3746;
  }

  .input-cmt {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .input-cmt .text-area {
    width: 96%;
  }

  .input-cmt .btn-send {
    margin-top: auto;
    align-self: flex-end;
  }

  .input-cmt .btn-send button {
    margin-right: 14px;
    background-color: #277cb4;
    border: none;
    border-radius: 2px;
    color: #fff;
    padding: 5px 10px;
  }

  .input-cmt button:hover {
    background-color: #266cb4;
    cursor: pointer;
  }

  .text-area {
  }

  .ant-list-items {
    margin: 10px 20px;
  }

  @media (max-width: 800px) {
    .h3-comment {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 600px) {
    .text-area {
    }
  }
`;
