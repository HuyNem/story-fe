import React from "react";
import {
  Wrapper,
  WrapperCategory,
  WrapperContent,
  WrapperLeft,
  WrapperRight,
  WrapperStory,
} from "./style";
import NavbarCategoryComponent from "../../components/NavbarCategoryComponent/NavbarCategoryComponent";
import BreadCrumbComponent from "../../components/BreadCrumbComponent/BreadCrumbComponent";
import TopViewStory from "../../components/StoryComponent/TopViewStory";

function SortTopView() {
  const breadcrumbItems = [
    {
      href: "http://localhost:3000/",
      title: "Trang chủ",
    },
    {
      title: "Sắp xếp",
    },
    {
      title: "Lượt đọc nhiều nhất",
    },
  ];

  return (
    <Wrapper>
      <BreadCrumbComponent items={breadcrumbItems} />
      <WrapperContent>
        <WrapperLeft>
          <WrapperStory>
            <TopViewStory />
          </WrapperStory>
        </WrapperLeft>

        <WrapperRight>
          <WrapperCategory>
            <NavbarCategoryComponent />
          </WrapperCategory>
        </WrapperRight>
      </WrapperContent>
    </Wrapper>
  );
}

export default SortTopView;
