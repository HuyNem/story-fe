import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

const BreadCrumbComponent = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split('/').filter((item) => item);

  return (
    <Breadcrumb separator=">">
      {pathnames.length > 0 ? (
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}/`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Breadcrumb.Item>{name}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item>
            <Link to={routeTo}>{name}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  );
}
export default BreadCrumbComponent;