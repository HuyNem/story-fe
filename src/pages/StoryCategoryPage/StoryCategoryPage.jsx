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
import StoryByCategoryComponent from "../../components/StoryComponent/StoryByCategoryComponent";
import BreadCrumbComponent from "../../components/BreadCrumbComponent/BreadCrumbComponent";

function StoryCategory() {
  const breadcrumbItems = [
    {
      href: "http://localhost:3000/",
      title: "Trang chủ",
    },
    {
      title: "Thể loại",
    },
  ];

  return (
    <Wrapper>
      <BreadCrumbComponent items={breadcrumbItems} />
      <WrapperContent>
        <WrapperLeft>
          <WrapperStory>
            <StoryByCategoryComponent />
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

export default StoryCategory;
