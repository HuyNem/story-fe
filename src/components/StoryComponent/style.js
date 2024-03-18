import styled from 'styled-components';
import { Card } from 'antd';

export const StyleNameStory = styled.div`
    line-height:16px;
    font-weight:500;
`
export const StyledCard = styled(Card)`
  width: 150px;

  .ant-card-body {
    padding: 5px;
  }
`

export const WrapperStory = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top:10px;
`
export const WrapperNewStory = styled.div`
  border: 1px solid #F4F2EC;
  background-color: #F4F2EC;
  width: 650px;
`

export const WrapperPagination = styled.div`
position: relative;
  left: 190px;
  margin-top:15px;

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
