import { Col, Divider, InputNumber, Popconfirm, Row } from "antd";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  doDeleteItemCartAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice.js";
const OrderPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const cart = useSelector((state) => state.order.cart);
  const dispatch = useDispatch();

  const handleChangeInput = (value, item) => {
    console.log("value", value);
    console.log("item", item);
    if (value < 0 || !value) {
      console.log("ko update");
      return;
    }
    if (!isNaN(value)) {
      dispatch(
        doUpdateCartAction({ quantity: value, detail: item, _id: item._id })
      );
    }
  };

  const confirmDelete = (item) => {
    dispatch(doDeleteItemCartAction(item._id));
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let sum = 0;
      cart.map((item) => {
        sum += item.quantity * item.detail.price;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  return (
    <div className="order-page-layout">
      <div
        className="order-page-container"
        style={{ maxWidth: 1290, margin: "0 auto" }}
      >
        <Row gutter={[20, 20]} style={{ justifyContent: "space-between" }}>
          <Col lg={17} md={15} xs={24} className="order-left-content">
            {cart?.length > 0 &&
              cart.map((item, index) => {
                return (
                  <div className="cart-item">
                    <img
                      className="item-img"
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                        item.detail.thumbnail
                      }`}
                    />
                    <div className="item-name">{item.detail.mainText}</div>
                    <div className="item-price">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.detail.price)}
                    </div>
                    <InputNumber
                      className="item-input"
                      onChange={(value) => handleChangeInput(value, item)}
                      value={item.quantity}
                    />
                    <div className="item-total-price">
                      Tổng:
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.detail.price * item.quantity)}
                    </div>
                    <div className="item-delete">
                      <Popconfirm
                        placement="top"
                        title={`Bạn có muốn xoá sản phẩm này không?`}
                        onConfirm={() => confirmDelete(item)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined />
                      </Popconfirm>
                    </div>
                  </div>
                );
              })}
          </Col>
          <Col lg={7} md={9} xs={24} className="order-right-content">
            <div className="order-content">
              <div className="order-tam-tinh">
                <span>Tạm tính:</span>
                <span>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice || 0)}
                </span>
              </div>

              <Divider />
              <div className="order-tong">
                <span>Tổng:</span>
                <span style={{ color: "red" }}>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice || 0)}
                </span>
              </div>
              <Divider />
              <div className="order-btn-paid">
                <span className="order-btn-paid-title">
                  Mua Hàng({cart?.length ?? 0})
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default OrderPage;
