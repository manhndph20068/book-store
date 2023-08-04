import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
const InputSearchBook = (props) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("values", values);
    let query = "";
    if (values.mainText) {
      query += `&mainText=/${values.mainText}/i`;
    }
    if (values.author) {
      query += `&author=/${values.author}/i`;
    }
    if (values.category) {
      query += `&category=/${values.category}/i`;
    }
    if (query) {
      props.handleFilter(query);
    }
  };
  return (
    <div
      className=""
      style={{
        border: "1px solid",
        border: "none",
        background: "#ECECEC",
        borderRadius: "5px",
        padding: "20px 10px 20px 10px",
      }}
    >
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row
          gutter={[25, 25]}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Col span={7}>
            <Form.Item label="Tên Sách" name="mainText">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Tác Giả" name="author">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Thể loại" name="category">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <div
          wrappercol={{ offset: 8, span: 16 }}
          style={{ textAlign: "right", paddingRight: "75px" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "7px" }}
          >
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default InputSearchBook;
