import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Input, Dropdown, Button, Menu, Popover } from "antd";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperHeaderCategory,
  WrappeContentPopup,
  PopoverStyles,
  WrapperTextLogo,
  WrapperHeaderPost,
  WrapperHeaderSort,
  WrapperHeaderSearch,
} from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
//icon
import { UserOutlined, HeartFilled, MenuOutlined } from "@ant-design/icons";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";

//
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { click } from "@testing-library/user-event/dist/click";
import "./style.css";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../../components/LoadingComponent/Loading";
import * as CategoryService from "../../services/CategoryService";
import { useQuery } from "@tanstack/react-query";
import { slug } from "../../utils";

function HeaderComponent(props) {
  const {
    isHiddenSearch = false,
    isHiddenCategory = false,
    isHiddenSort = false,
    isHiddenPostStory = false,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const handleNavigateLogin = () => {
    navigate("/dang-nhap");
  };

  const handleLogout = async () => {
    localStorage.clear();
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    navigate("/");
    setLoading(false);
  };

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
  // const items = [
  //     {
  //         key: '1',
  //         label: (
  //             <>
  //                 <TagFilled />
  //                 <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
  //                     1st menu item
  //                 </a>
  //             </>
  //         ),
  //     },
  //     {
  //         key: '2',
  //         label: (
  //             <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
  //                 2nd menu item
  //             </a>
  //         ),
  //     },
  //     {
  //         key: '3',
  //         label: (
  //             <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
  //                 3rd menu item
  //             </a>
  //         ),
  //     },
  // ];

  const handlePost = () => {
    if (user?.access_token) {
      navigate("/dang-truyen");
    } else {
      navigate("/dang-nhap");
    }
  };

  return (
    <div id="main-header">
      <WrapperHeader
        className="container"
        style={{
          display: "flex",
          justifyContent: isHiddenCategory ? "space-between" : "space-between",
          padding: isHiddenCategory ? "0px 20px" : "0px 200px",
        }}
      >
        <div
          className="logo"
          style={{ marginLeft: isHiddenCategory ? "0px" : "0px" }}
        >
          <WrapperTextLogo onClick={() => navigate("/")}>
            TruyenHayOnline
          </WrapperTextLogo>
        </div>

        {!isHiddenCategory && (
          <div className="category">
            <Dropdown
              menu={{ items: renderMenuItems() }}
              placement="bottomLeft"
            >
              <WrapperHeaderCategory>Thể loại</WrapperHeaderCategory>
            </Dropdown>
          </div>
        )}
        {!isHiddenSort && (
          <div className="sort">
            <Dropdown menu={{ items }} placement="bottomLeft">
              <WrapperHeaderSort>Sắp xếp</WrapperHeaderSort>
            </Dropdown>
          </div>
        )}
        {!isHiddenPostStory && (
          <div className="post-story">
            <WrapperHeaderPost onClick={handlePost}>
              {" "}
              Đăng truyện{" "}
            </WrapperHeaderPost>
          </div>
        )}

        {!isHiddenSearch && (
          <div className="search">
            <WrapperHeaderSearch>
              <ButtonInputSearch placeholder="Tìm truyện, tác giả..." />
            </WrapperHeaderSearch>
          </div>
        )}

        <div className="login-register">
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              <UserOutlined style={{ fontSize: "20px" }} />
              {user?.access_token ? (
                <Popover
                  content={content}
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <div
                    className="popover-trigger"
                    style={{ cursor: "pointer" }}
                  >
                    {userName || user.email}
                  </div>
                </Popover>
              ) : (
                <div>
                  <div
                    onClick={handleNavigateLogin}
                    style={{ cursor: "pointer" }}
                  >
                    <span>Đăng nhập / Đăng ký</span>
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
        </div>
      </WrapperHeader>
    </div>
  );
}

export default HeaderComponent;
