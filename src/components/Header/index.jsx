import React, { useState } from "react";
import { GiOpenBook } from "react-icons/gi";
import { BiCart } from "react-icons/bi";
import "./header.scss";
import { DownOutlined } from "@ant-design/icons";
import {
  Divider,
  Badge,
  Drawer,
  message,
  Popover,
  notification,
  Modal,
} from "antd";
import { Dropdown, Space, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "../../services/api";
import { doLogout } from "../../redux/account/accountSlice";
import { clearCart } from "../../redux/order/orderSlice";
import ManageAccount from "../ManageAccount";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isModalManageAcconut, setIsModalManageAcconut] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const cart = useSelector((state) => state.order.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = async () => {
    let res = await callLogout();
    if (res?.statusCode === 201) {
      message.success(res.data);
      dispatch(doLogout());
      dispatch(clearCart());
      navigate("/");
    }
  };

  const handleMangeAccount = () => {
    setIsModalManageAcconut(true);
  };

  const items = [
    {
      label: (
        <label onClick={() => handleMangeAccount()}>Quản lý tài khoản</label>
      ),
      key: "account",
    },
    {
      label: <label onClick={() => Logout()}>Đăng xuất</label>,
      key: "logout",
    },
  ];
  if (user?.role === "ADMIN") {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
    });
  }
  const userAvatar = user?.avatar;
  const urlAvatar = `${
    import.meta.env.VITE_BACKEND_URL
  }/images/avatar/${userAvatar}`;

  const handleOpenCart = () => {
    if (cart?.length <= 0) {
      notification.info({
        message: "gio hang",
      });
      return;
    }
    navigate("/order");
  };

  const contentPopover = () => {
    return (
      <div className="pop-cart-content">
        {cart?.length > 0 &&
          cart.map((item, index) => {
            return (
              <div className="book-cart" key={`book-${index}`}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    item.detail.thumbnail
                  }`}
                />
                <div style={{ width: "15rem" }}>{item.detail.mainText}</div>
                <div style={{ color: "#d0011b" }}>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.detail.price)}
                </div>
              </div>
            );
          })}
        {cart?.length > 0 ? (
          <div style={{ marginTop: "10px", textAlign: "right" }}>
            <span className="btn-view-cart" onClick={() => navigate("order")}>
              Xem giỏ hàng
            </span>
          </div>
        ) : (
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <span className="btn-view-cart" onClick={() => navigate("/")}>
              Tiếp tục mua hàng
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="header-container" justify="center" align="middle">
        <div className="page-header">
          <div className="page-header__left">
            <div
              style={{ cursor: "pointer" }}
              className="page-header__toggle"
              onClick={() => setOpenDrawer(true)}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <div className="logo">
                <GiOpenBook
                  className="icon-react"
                  onClick={() => navigate("/")}
                />{" "}
                manh-store
              </div>
              <input className="input-search" type="text"></input>
            </div>
          </div>
          <div className="page-header__right">
            <ul className="navigation">
              <li className="navigation__item badge">
                <Popover
                  onClick={() => handleOpenCart()}
                  placement="bottom"
                  title={"Giỏ Hàng"}
                  content={contentPopover}
                  arrow={true}
                  rootClassName="popover-cart"
                >
                  <Badge count={cart?.length ?? 0} size={"small"}>
                    <BiCart className="icon-cart" />
                  </Badge>
                </Popover>
              </li>
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")} className="account">
                    Sign in
                  </span>
                ) : (
                  <Dropdown
                    className="account"
                    menu={{ items }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className="account">
                        <Avatar src={urlAvatar} />
                        {user?.fullName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        {user?.role === "USER" ? (
          <>
            <Link>
              <p onClick={() => handleMangeAccount()}>Quản lý tài khoản</p>
            </Link>
            <p onClick={() => handleMangeAccount()}>Quản lý tài khoản</p>
            <Divider />
            <Link>
              <span onClick={() => Logout()}>Đăng xuất</span>
            </Link>

            <Divider />
          </>
        ) : user?.role === "ADMIN" ? (
          <>
            <Link to="/admin">
              <p>Xem Trang Quản Trị</p>
            </Link>

            <Divider />
            <Link>
              <p onClick={() => handleMangeAccount()}>Quản lý tài khoản</p>
            </Link>

            <Divider />
            <Link>
              <span onClick={() => Logout()}>Đăng xuất</span>
            </Link>

            <Divider />
          </>
        ) : (
          <>
            <Link to="/login">
              <p>Đăng nhập</p>
            </Link>
            <Divider />
            <Link to="/register">
              <span>Đăng ký</span>
            </Link>

            <Divider />
          </>
        )}
      </Drawer>

      <ManageAccount
        isModalManageAcconut={isModalManageAcconut}
        setIsModalManageAcconut={setIsModalManageAcconut}
      />
    </>
  );
};
export default Header;
