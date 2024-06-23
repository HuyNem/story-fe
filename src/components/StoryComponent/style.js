import styled from 'styled-components';

export const WrapperStory = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top:10px;
`

//story component
export const Story = styled.div`
  margin-bottom: 15px;
  padding-bottom: 10px;
  max-width: 150px;

    img {
      width:150px;
      height: 231px;
    }

    p {
      margin: 0px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
    }

    @media (max-width: 500px) {
      p{
        margin-top: 5px;
        text-align: center;
        font-size: 12px;
        font-weight: 500;
      }
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

    margin: 0px;
    padding:  10px 0px;

    font-size: 16px;
  }

  hr {
    margin: 0px;
  }
`




//css cho truyện theo thể loại
export const WrapperTitle = styled.h3`
  font-size: 16px;
  margin-left: 10px;

  @media (max-width: 500px) {
    font-size: 14px;
    margin-left: 10px;
  }
`
export const WrapperStoryByCategory = styled.div`
    border: 1px solid #F4F2EC;
    background-color: #F4F2EC;
    max-width: 100;
    height: fit-content;
    margin-bottom: 10px;

    h3 {
      color: #0E3746;
    }

`

//
export const WrapperStoryCategory = styled.div`
    display: flex;
    height: 80px;
    margin: 2px 10px;

    background-color: #F4F2EC;
    border: 1px dashed #666;

    h5:hover {
      text-decoration: underline;
    }

    &:hover {
      cursor: pointer;
    }
`

export const WrapperStoryCategoryLeft = styled.div`
  display: flex;
  align-items: center;

    margin-left: 5px;

    img {
      width: 50px;
      display: flex;
    }
`

export const WrapperStoryCategoryRight = styled.div`

  h5 {
    margin: 0px;
    margin-top: 5px;
    margin-left: 5px;
  }

  p {
    font-size: 12px;
    margin-top: 10px;
    margin-left: 5px;
  }

  .full {
    color: red;
    font-weight: 600;
  }

  @media (max-width: 500px) {
    h5 {
      font-size: 12px;
    }
  }
`


//pagination
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

//story completed
export const WrapperStoryCompleted = styled.div`
    border: 1px solid #F4F2EC;
    background-color: #F4F2EC;
    max-width: 650px;
    height: fit-content;
    margin-top: 10px;

    h3 {
      color: #0E3746;
    }

`
