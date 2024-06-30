import React from "react";
import { Col, Row } from "antd";
import BreadCrumbComponent from "../../components/BreadCrumbComponent/BreadCrumbComponent";
import NavbarCategoryComponent from "../../components/NavbarCategoryComponent/NavbarCategoryComponent";
import StoryDetail from "../../components/StoryDetail/StoryDetail";
import CommentComponent from "../../components/CommentComponent/CommentComponent";
import { useLocation } from "react-router-dom";
import "./StoryDetailPage.css";

function StoryDetailPage() {
  const { state } = useLocation();
  const breadcrumbItems = [
    {
      href: "http://localhost:3000/",
      title: "Trang chủ",
    },
    {
      title: `${state.name}`,
    },
  ];

  return (
    <section className="story-detail">
      <div className="breadcrumb">
        <BreadCrumbComponent items={breadcrumbItems} />
      </div>

      <div className="detail-body">
        <div className="content">
          <StoryDetail />
          <CommentComponent />
        </div>

        <div className="nav">
          <NavbarCategoryComponent />
        </div>
      </div>
    </section>
  );
}

export default StoryDetailPage;
