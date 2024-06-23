import React, { useState } from "react";
import "./Header.css";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import NavbarCategoryComponent from "../NavbarCategoryComponent/NavbarCategoryComponent.jsx";
import Sort from "../Sort/Sort.jsx";
import { Button, Drawer, Popover, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  
  //drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <div className="list-header" onClick={showDrawer}>
        <UnorderedListOutlined />
      </div>

      <div className="header-logo" onClick={() => navigate("/")}>
        <p>TRUYENHAYONLINE</p>
      </div>

      <ul className="header-menu">
        <li>Thể loại</li>
        <li>Sắp xếp</li>
        <li>Đăng truyện</li>
        <li>
          <input type="text" placeholder="Tên truyện, tên tác giả..." />
        </li>
      </ul>

      <div className="header-login">
        {user?.access_token ? (
          null
          // <Popover
          //   content={content}
          //   trigger="click"
          //   open={open}
          //   onOpenChange={handleOpenChange}
          // >
          //   <div className="popover-trigger" style={{ cursor: "pointer" }}>
          //     {userName || user.email}
          //   </div>
          // </Popover>
        ) : (
          <div>
            <div onClick={() => navigate("/dang-nhap")}>
              <UserOutlined />
            </div>
          </div>
        )}
      </div>

      <Drawer
        title=" "
        closable={false}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Đóng</Button>
          </Space>
        }
      >
        <NavbarCategoryComponent />
        <Sort />
      </Drawer>
    </div>
  );
};

export default Header;
