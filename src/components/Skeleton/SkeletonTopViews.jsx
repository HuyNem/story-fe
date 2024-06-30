import React from "react";
import { Skeleton } from "antd";

const SkeletonTopViews = (props) => {
  const { loading } = props;

  return (
    <div className="skeleton-new-stories">
      {loading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : null}
    </div>
  );
};

export default SkeletonTopViews;
