import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Row,
  Steps,
  message,
} from "antd";

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
  clearCart,
  doDeleteItemCartAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice.js";
import TextArea from "antd/es/input/TextArea.js";
import { callCreateAnOrder, callFetchAccount } from "../../services/api.jsx";
const ViewPayment = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const { setCurrentStep } = props;
  const cart = useSelector((state) => state.order.cart);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

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

  const onFinish = async (values) => {
    const { username, phone, address, typePaid } = values;
    console.log("values", values);
    const detailOrder = cart.map((item) => {
      return {
        bookName: item.detail.mainText,
        quantity: item.quantity,
        _id: item._id,
      };
    });

    const data = {
      name: username,
      address: address,
      phone: phone,
      totalPrice: totalPrice,
      detail: detailOrder,
    };

    await callFetchAccount();
    const res = await callCreateAnOrder(data);
    if (res?.statusCode === 201) {
      setCurrentStep(2);
      dispatch(clearCart());
      message.success(res.data);
    }
  };

  return (
    <>
      <Row gutter={[20, 20]} style={{ justifyContent: "space-between" }}>
        <Col lg={15} md={15} xs={24} className="order-left-content">
          {cart?.length > 0 &&
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

                  <div style={{ width: "100px" }}>
                    Số lượng: {item.quantity}
                  </div>
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
        <Col lg={9} md={9} xs={24} className="order-right-content">
          <div className="order-content">
            {/* <div className="order-title">Thông tin đơn hàng</div> */}
            <div className="order-title-input">
              <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                scrollToFirstError={true}
                layout={"vertical"}
              >
                <Form.Item
                  label="Tên người nhận"
                  // style={{ fontSize: "3rem" }}
                  name="username"
                  labelCol={{ span: 24 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Tên người nhận không được để trống!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Số điện thoại không được để trống!",
                      pattern: new RegExp(/^0\d{9}$/),
                    },
                  ]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Địa chỉ không được để trống!",
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>

                <Form.Item
                  name="typePaid"
                  label="Hình thức thanh toán"
                  rules={[
                    {
                      required: true,
                      message: "Phương thức thanh toán không được để trống!",
                    },
                  ]}
                  initialValue={1}
                >
                  <Radio.Group>
                    <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                  </Radio.Group>
                </Form.Item>
                <Divider />
                <div className="order-tong">
                  <span>Tổng tiền:</span>
                  <span style={{ color: "red", fontSize: "1.5rem" }}>
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice || 0)}
                  </span>
                </div>
                <Divider />
                {nextStep > 0 ? (
                  <div
                    className="order-btn-paid"
                    htmlType="submit"
                    onClick={() => form.submit()}
                  >
                    <span className="order-btn-paid-title">
                      Đặt Hàng({cart?.length ?? 0})
                    </span>
                  </div>
                ) : (
                  <div
                    className="order-btn-paid"
                    htmlType="submit"
                    style={{ backgroundColor: "gray" }}
                  >
                    <span className="order-btn-paid-title">
                      Đặt Hàng({cart?.length ?? 0})
                    </span>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default ViewPayment;
