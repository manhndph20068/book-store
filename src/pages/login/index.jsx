import React, { useState } from "react";
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
import { callLogin } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/account/accountSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsLoading(true);
    const res = await callLogin(username, password);
    setIsLoading(false);
    if (res?.data?.user) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLogin(res.data.user));
      console.log("res", res);
      message.success("Đăng Nhập thành công");
      navigate("/");
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };

  return (
    <div>
      <div className="form-register">
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <Divider />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: "auto" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="username"
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
            rules={[
              { required: true, message: "Pasword không được để trống!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
