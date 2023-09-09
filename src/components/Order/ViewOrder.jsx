import { Col, Divider, Empty, InputNumber, Popconfirm, Row, Steps } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  LoadingOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  doDeleteItemCartAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice.js";

const ViewOrder = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const { setCurrentStep } = props;
  const cart = useSelector((state) => state.order.cart);
  const dispatch = useDispatch();

  const handleChangeInput = (value, item) => {
    console.log("value", value);
    console.log("item", item);
    if (value < 0 || !value) {
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
      setNextStep(1);
    } else {
      setTotalPrice(0);
      setNextStep(0);
    }
  }, [cart, nextStep]);

  const handlePayment = () => {
    setCurrentStep(1);
  };
  return (
    <>
      <Row gutter={[20, 20]} style={{ justifyContent: "space-between" }}>
        <Col lg={17} md={15} xs={24} className="order-left-content">
          {cart?.length && nextStep > 0 ? (
            cart.map((item, index) => {
              return (
                <div className="cart-item" key={`id${index}`}>
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
            })
          ) : (
            <div
              style={{
                minHeight: "11.8rem",
                backgroundColor: "white",
                padding: "15px",
                marginTop: "15px",
                borderRadius: "4px",
              }}
            >
              <Empty style={{ paddingTop: "20px" }} />
            </div>
          )}
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
            {nextStep > 0 ? (
              <div className="order-btn-paid" onClick={() => handlePayment()}>
                <span className="order-btn-paid-title">
                  Mua Hàng({cart?.length ?? 0})
                </span>
              </div>
            ) : (
              <div
                className="order-btn-paid"
                style={{ backgroundColor: "grey" }}
              >
                <span className="order-btn-paid-title">
                  Mua Hàng({cart?.length ?? 0})
                </span>
              </div>
            )}
            {/* <div className="order-btn-paid" onClick={() => handlePayment()}>
              <span className="order-btn-paid-title">
                Mua Hàng({cart?.length ?? 0})
              </span>
            </div> */}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default ViewOrder;
