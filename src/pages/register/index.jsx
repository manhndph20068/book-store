import React, { useState } from "react";
import "./index.scss";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Divider,
  Space,
  notification,
  message,
} from "antd";
import { callRegister } from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    setIsLoading(true);
    const res = await callRegister(fullName, email, password, phone);
    setIsLoading(false);
    if (res?.data?._id) {
      message.success("Đăng kí thành công");
      navigate("/login");
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };

  return (
    <div className="form-register" style={{ padding: "15px" }}>
      <h3 style={{ textAlign: "center" }}>Đăng kí</h3>
      <Divider />
      {/* <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500, margin: "auto" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Fullname"
            name="fullName"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email không được để trống!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Pasword không được để trống!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Phone number không được để trống!",
                pattern: new RegExp(/^0\d{9}$/),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            // style={{ paddingLeft: "200px" }}
            className="btn-register"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Register
            </Button>
            Or <a href="/login">login now!</a>
          </Form.Item>
        </Form> */}

      <Form
        name="normal_login"
        className="login-form"
        style={{ maxWidth: 400, margin: "auto" }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "FullName không được để trống!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="FullName"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Email không được để trống!",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your PhoneNumber!",
              pattern: new RegExp(/^0\d{9}$/),
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Phone"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Register
          </Button>
          Or <a href="/login">login now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterPage;
