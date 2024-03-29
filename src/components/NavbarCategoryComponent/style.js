import styled from "styled-components";

export const NavCategory = styled.div`
  border: 1px solid #F4F2EC;
  background-color: #F4F2EC;
  height: fit-content;
  margin-right: 10px;
  width: 230px;
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
  margin-left: 10px;
`

export const CategoryItem = styled.div`
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


