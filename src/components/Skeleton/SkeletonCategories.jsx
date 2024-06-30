import React from "react";
import { Skeleton } from "antd";
import "./SkeletonCategories.css";

const SkeletonCategories = (props) => {
  const { loading } = props;

  return (
    <div className="skeleton-new-stories">
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

export default SkeletonCategories;
