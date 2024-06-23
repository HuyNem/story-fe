import React from "react";
import "./Sort.css";

const Sort = () => {
  return (
    <div className="sort">
      <h3 className="title">Sắp xếp</h3>
      <hr />
      <div className="sort-body">
        <a href="/sap-xep/luot-doc">Lượt đọc</a>
        <a href="/sap-xep/hoan-thanh">Đã hoàn thành</a>
      </div>
    </div>
  );
};

export default Sort;
