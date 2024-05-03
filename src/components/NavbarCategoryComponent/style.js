import styled from "styled-components";

export const NavCategory = styled.div`
  border: 1px solid #F4F2EC;
  background-color: #F4F2EC;
  height: fit-content;
  margin-right: 10px;
  width: 270px;

  hr {
    margin: 0px;
  }

  //mobile
  @media screen and (max-width: 739px) {
    display: none;
}
`

export const WrapperLabel = styled.h3`
  color: #0E3746;
  font-weight: 700;
  margin: 0px;

  font-size: 16px;
  padding: 10px 10px;
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
    align-items: center;

    width: 110px;
    color: #0E3746;
    font-size: 14px;
    padding-top: 10px;

    text-decoration: none;
  }

  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .icon-tag {
    margin-right: 3px;
  }
`

//TOP VIEW
export const WrapperContent = styled.div`
    color: #0E3746;
    font-weight: 500;
    display: flex;
    flex-wrap: wrap;
`

export const WrapperItem = styled.div`
    width: 100%;
    display: flex;
    justifyItems: center;
    margin: 10;
    padding: 15px;
    border-bottom: 1px dashed #333;

    &:hover {
      cursor: pointer;
    }

    h3 {
      display: flex;
      justify-content: center;
      margin: 0px;
      font-size: 16px;
    }

    div {
      margin-left: 10px;
    }

    h4 {
      margin: 0px;
      font-size: 12px;
    }

    p {
      margin: 0px;
      font-size: 12px;
    }
`

