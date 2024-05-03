import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { Wrapper } from './style';

const BreadCrumbComponent = ({ items }) => {

  return (
    <Wrapper>
      <AntdBreadcrumb>
        {items.map((item, index) => (
          <AntdBreadcrumb.Item key={index} href={item.href}>
            {item.title}
          </AntdBreadcrumb.Item>
        ))}
      </AntdBreadcrumb>
    </Wrapper>


  );
}
export default BreadCrumbComponent;