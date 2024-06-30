import React from "react";
import { Skeleton } from "antd";
import "./SkeletonCompletedStories.css";

const SkeletonCompletedStories = (props) => {
  const { loading } = props;
  return (
    <div className="skeleton-completed-stories">
      {loading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : null}
    </div>
  );
};

export default SkeletonCompletedStories;
