import styled from 'styled-components';

export const WrapperStory = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top:10px;
`

export const Story = styled.div`
  margin-bottom: 15px;
  padding-bottom: 10px;
  max-width: 150px;

    img {
      width:150px;
    }

    p {
      margin: 0px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    p:hover {
      text-decoration: underline;
    }
`

export const WrapperNewStory = styled.div`
  border: 1px solid #F4F2EC;
  background-color: #F4F2EC;
  max-width: 650px;

  h3 {
    color: #0E3746;
  }
`

export const WrapperPagination = styled.div`
// position: relative;
//   left: 190px;
//   margin-top:15px;
display: flex;
justify-content: center;

  .ant-pagination-item {
    background-color: #F4F2EC;
    border-color: #F4F2EC;
    color: #F4F2EC;
  }
  .ant-pagination-item-active {
    background-color: #0E3746;
  }
  .ant-pagination-item-active a{
    color: #fff;
  }
  .ant-pagination-item-active a:hover{
    color: #fff;
  }
`
