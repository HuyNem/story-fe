import styled from 'styled-components';

export const WrapperStoryDetail = styled.div`
  padding:10px;
  background-color: #F4F2EC;
  margin-right: 10px;
  height: fit-content;

  .ant-btn {
    width:30%;
    position: relative;
    left:300px;
    margin-top: 20px;
    background-color: #0E3746;
  }
`

export const WrappterChapter = styled.div`
  font-weight: 500;
  font-size: 15px;

  p {
    margin: 5px;
  }
  
  .date {
    font-weight: normal;
    font-size: 12px;
  }

  .date:hover {
    text-decoration: none;
  }
  
  p:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;