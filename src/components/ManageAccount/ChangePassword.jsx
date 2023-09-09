import { Button, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { callChangePassword } from "../../services/api";
import { useEffect } from "react";

const ChangePassword = (props) => {
  const { setIsModalManageAcconut, isModalManageAcconut, setTab } = props;
  const [form] = Form.useForm();
  const user = useSelector((state) => state.account.user);

  const onFinish = async (values) => {
    const { email, oldpass, newpass } = values;
    const res = await callChangePassword(email, oldpass, newpass);
    if (res && res?.data) {
      message.success("Đổi mật khẩu thành công");
      setIsModalManageAcconut(false);
    } else {
      message.error("Đổi mật khẩu thất bại");
    }
  };

  useEffect(() => {
    if (!isModalManageAcconut) {
      form.resetFields();
      setTab(1);
    }
  }, [isModalManageAcconut, form]);

  return (
    <div style={{ paddingLeft: "3rem", minHeight: 200 }}>
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="email"
          labelCol={{ span: 5 }}
          label="Email"
          initialValue={user?.email}
        >
          <Input
            style={{ maxWidth: "350px" }}
            readOnly={true}
            disabled={true}
          />
        </Form.Item>
        <Form.Item
          name="oldpass"
          label="Mật khẩu cũ"
          labelCol={{ span: 5 }}
          rules={[{ required: true }]}
        >
          <Input.Password style={{ maxWidth: "350px" }} />
        </Form.Item>

        <Form.Item
          name="newpass"
          label="Mật khẩu mới"
          labelCol={{ span: 5 }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password style={{ maxWidth: "350px" }} />
        </Form.Item>

        <div style={{ paddingLeft: "7.6rem" }}>
          <Button onClick={() => form.submit()} htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default ChangePassword;
