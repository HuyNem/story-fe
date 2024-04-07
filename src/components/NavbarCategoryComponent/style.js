import styled from "styled-components";

export const NavCategory = styled.div`
  border: 1px solid #F4F2EC;
  background-color: #F4F2EC;
  height: fit-content;
  margin-right: 10px;
  width: 270px;
`

export const WrapperLabel = styled.h3`
  color: #0E3746;
  font-weight: 500;
  margin-left: 10px;
`
export const WrapperCategoryItem = styled.div`
  color: #0E3746;
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
`

export const CategoryItem = styled.div`
margin-left: 20px;
margin-bottom: 15px;
  a {
    display: flex;
    width: 110px;
    padding-bottom: 17px;
    margin: 0px;
    align-items: center;
    color: #0E3746;
  }

  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .icon-tag {
    margin-right: 3px;
  }
`


