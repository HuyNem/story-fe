import React from "react";
import { Skeleton } from "antd";

const SkeletonTopViews = (props) => {
  const { loading } = props;

  return (
    <div className="skeleton-new-stories">
      {loading ? (
        <>
          <Skeleton active/>
          <Skeleton active/>
          <Skeleton active/>
          <Skeleton active/>
          <Skeleton active/>
        </>
      ) : null}
    </div>
  );
};

export default SkeletonTopViews;
