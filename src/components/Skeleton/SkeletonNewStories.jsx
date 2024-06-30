import React from "react";
import { Skeleton } from "antd";
import "./SkeletonNewStories.css";

const SkeletonNewStories = (props) => {
  const { loading } = props;
  const cards = [];
  const renderCard = () => {
    for (let i = 0; i < 12; i++) {
      cards.push(
        <div className="card" key={i}>
          <Skeleton.Avatar
            active
            shape="square"
            style={{ width: "150px", height: "200px", marginBottom: "5px" }}
          />
          <Skeleton.Button active style={{ width: "150px" }} />
        </div>
      );
    }
    return cards;
  };
  return (
    <div className="skeleton-new-stories">{loading ? renderCard() : null}</div>
  );
};

export default SkeletonNewStories;
