import React, { useEffect, useState } from "react";
import "./Header.css";
import NavbarCategoryComponent from "../NavbarCategoryComponent/NavbarCategoryComponent.jsx";
import Sort from "../Sort/Sort.jsx";
import { Button, Drawer, Dropdown, Popover, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as CategoryService from "../../services/CategoryService";
import { useQuery } from "@tanstack/react-query";
import { slug } from "../../utils.js";
import {
  WrappeContentPopup,
  WrapperHeaderAccount,
  WrapperHeaderCategory,
  WrapperHeaderPost,
  WrapperHeaderSearch,
  WrapperHeaderSort,
} from "../HeaderComponent/style.js";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch.jsx";
import Loading from "../LoadingComponent/Loading.jsx";
import * as UserService from "../../services/UserService";

//icon
import {
  UserOutlined,
  HeartFilled,
  MenuOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { resetUser } from "../../redux/slides/userSlide.js";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleStoryManager = async () => {
    navigate("/quan-ly-truyen");
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  //drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  //dang truyen
  const handlePost = () => {
    if (user?.access_token) {
      navigate("/dang-truyen");
    } else {
      navigate("/dang-nhap");
    }
  };

  //call api từ bảng category
  const fetchCategory = async () => {
    const res = await CategoryService.getAllCategory();
    return res;
  };
  const { isPending, data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  //category
  const renderMenuItems = () => {
    if (isPending || !categories) return [];

    return categories?.data.map((category) => ({
      key: category._id,
      label: (
        <div
          key={category._id}
          onClick={() =>
            navigate(`/the-loai/${slug(category.name)}`, {
              state: category.name,
            })
          }
        >
          <a style={{ color: "#0E3746" }} href={slug(category.name)}>
            {category.name}
          </a>
        </div>
      ),
    }));
  };

  //sort
  const items = [
    {
      key: "1",
      label: <a href="/sap-xep/luot-doc">Lượt đọc</a>,
    },
    {
      key: "2",
      label: <a href="/sap-xep/hoan-thanh">Hoàn thành</a>,
    },
  ];

  //logout
  const handleLogout = async () => {
    localStorage.clear();
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    navigate("/");
    setLoading(false);
  };

  const content = (
    <div onClick={hide}>
      <WrappeContentPopup
        className="ContentPopup"
        onClick={() => navigate("/trang-ca-nhan")}
      >
        <HeartFilled /> Trang cá nhân{" "}
      </WrappeContentPopup>
      <WrappeContentPopup className="ContentPopup" onClick={handleStoryManager}>
        <MenuOutlined /> Quản lý truyện{" "}
      </WrappeContentPopup>
      {user?.isAdmin && (
        <WrappeContentPopup
          className="ContentPopup"
          onClick={() => navigate("/system/admin")}
        >
          <RiUserSettingsLine /> Quản lý hệ thống{" "}
        </WrappeContentPopup>
      )}
      <WrappeContentPopup className="ContentPopup" onClick={handleLogout}>
        <MdLogout /> Đăng xuất{" "}
      </WrappeContentPopup>
    </div>
  );

  //login
  const handleNavigateLogin = () => {
    navigate("/dang-nhap");
  };

  return (
    <div className="header">
      <div className="list-mobile" onClick={showDrawer}>
        <UnorderedListOutlined />
      </div>

      <div className="header-logo" onClick={() => navigate("/")}>
        <p>TRUYENHAYONLINE</p>
      </div>

      <ul className="header-menu">
        <li>
          <Dropdown menu={{ items: renderMenuItems() }} placement="bottomLeft">
            <WrapperHeaderCategory>Thể loại</WrapperHeaderCategory>
          </Dropdown>
        </li>
        <li>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <WrapperHeaderSort>Sắp xếp</WrapperHeaderSort>
          </Dropdown>
        </li>
        <li className="post-story">
          <WrapperHeaderPost onClick={handlePost}>
            {" "}
            Đăng truyện{" "}
          </WrapperHeaderPost>
        </li>
        <li>
          <WrapperHeaderSearch>
            <ButtonInputSearch placeholder="Tìm truyện, tác giả..." />
          </WrapperHeaderSearch>
        </li>
      </ul>

      <div className="header-login">
        <Loading isLoading={loading}>
          <WrapperHeaderAccount>
            {user?.access_token ? (
              <Popover
                content={content}
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <div className="popover-trigger" style={{ cursor: "pointer" }}>
                  {userName || user.email}
                </div>
              </Popover>
            ) : (
              <div>
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer", display: "flex", gap: 10 }}
                >
                  <UserOutlined style={{ fontSize: "20px" }} />
                  <p className="login">Đăng nhập / Đăng ký</p>
                </div>
              </div>
            )}
          </WrapperHeaderAccount>
        </Loading>
      </div>

      <Drawer
        title=" "
        closable={false}
        onClose={onCloseDrawer}
        open={openDrawer}
        extra={
          <Space>
            <Button onClick={onCloseDrawer}>Đóng</Button>
          </Space>
        }
      >
        <ButtonInputSearch placeholder="Tìm truyện, tác giả..." closeDrawer={onCloseDrawer}/>
        <NavbarCategoryComponent />
        <Sort />
      </Drawer>
    </div>
  );
};

export default Header;
