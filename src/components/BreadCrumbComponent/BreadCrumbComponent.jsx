import React from 'react';
import { Breadcrumb } from 'antd';
const BreadCrumbComponent = () => (
  <Breadcrumb
    separator=">"
    items={[
      {
        title: 'Home',
      },
    ]}
  />
);
export default BreadCrumbComponent;