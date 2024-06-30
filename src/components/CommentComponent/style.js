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
    position: relative;
    padding-bottom: 30px;
  }

  .input-cmt button {
    background-color: #277cb4;
    border: none;
    border-radius: 2px;
    color: #fff;
    width: 70px;
    padding: 5px 10px;

    position: absolute;
    right: 0;
    margin: 20px 10px;
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

    @media screen and (max-width: 6000px) {
    .text-area {
      width: 94%;
      margin: 0px 10px;
    }
  }

`;
