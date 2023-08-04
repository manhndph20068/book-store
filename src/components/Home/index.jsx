import "./home.scss";
import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
} from "antd";
import { callGetListCategory, callListBookAdmin } from "../../services/api";
import { useEffect, useState } from "react";

const Home = () => {
  const [form] = Form.useForm();
  const [listCategory, setListCategory] = useState([]);
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);

  const handleChangePage = (pagination) => {
    console.log(">>> check pagination", pagination);
    if (pagination.current !== current) {
      setCurrent(pagination.current);
    }
    // if (pagination.pageSize !== pageSize) {
    //   setPageSize(pagination.current);
    // }
  };

  const handleChangeFilter = (changedValues, values) => {
    console.log(">>> check handleChangeFilter", changedValues, values);
  };

  const onFinish = (values) => {
    console.log(">>> check onFinish", values);
  };

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      let res = await callGetListCategory();
      console.log("res", res);
      if (res?.data) {
        setListCategory(res.data);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    let query = `current=${current}&pageSize=${pageSize}`;
    const fetchAllBook = async () => {
      let res = await callListBookAdmin(query);
      if (res?.data?.result) {
        setListBook(res.data.result);
        setTotal(res.data.meta.total);
      }
    };

    fetchAllBook();
  }, [current, pageSize]);

  const items = [
    {
      key: "1",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "2",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "3",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "4",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];

  return (
    <div className="layout_home">
      <div
        className="homepage-container"
        style={{ maxWidth: 1290, margin: "0 auto" }}
      >
        <Row gutter={[22, 22]} style={{ justifyContent: "space-between" }}>
          <Col xl={4} lg={0} md={0} sm={0} xs={0} className="left-content">
            <div>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FilterTwoTone />
                <h4>Bộ lọc tìm kiếm</h4>
                <ReloadOutlined title="Reset" />
              </span>
            </div>
            <Divider />
            <Form
              onFinish={onFinish}
              form={form}
              onValuesChange={(changedValues, values) =>
                handleChangeFilter(changedValues, values)
              }
            >
              <Form.Item
                name="category"
                label="Danh mục sản phẩm"
                labelCol={{ span: 24 }}
              >
                <Checkbox.Group>
                  <Row>
                    {listCategory.length > 0 &&
                      listCategory.map((item, index) => {
                        return (
                          <Col
                            span={24}
                            style={{ padding: "5px 0" }}
                            key={index + 1}
                          >
                            <Checkbox value={item}>{item}</Checkbox>
                          </Col>
                        );
                      })}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Divider />
              <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Form.Item name={["range", "from"]}>
                    <InputNumber
                      name="from"
                      min={0}
                      placeholder="đ TỪ"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <span>-</span>
                  <Form.Item name={["range", "to"]}>
                    <InputNumber
                      name="to"
                      min={0}
                      placeholder="đ ĐẾN"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </div>
                <div>
                  <Button
                    onClick={() => form.submit()}
                    style={{ width: "100%" }}
                    type="primary"
                  >
                    Áp dụng
                  </Button>
                </div>
              </Form.Item>
              <Divider />
              <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
                <div>
                  <Rate
                    value={5}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text"></span>
                </div>
                <div>
                  <Rate
                    value={4}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={3}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={2}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={1}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
              </Form.Item>
            </Form>
          </Col>

          <Col lg={20} md={24} xs={24} className="right-content">
            <Row>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Row>
            <Row className="customize-row">
              {listBook.length > 0 &&
                listBook.map((item, index) => {
                  return (
                    <div className="column">
                      <div className={`book-${index + 1}`}>
                        <div className="wrapper">
                          <div className="thumbnail">
                            <img
                              src={`${
                                import.meta.env.VITE_BACKEND_URL
                              }/images/book/${item.thumbnail}`}
                              alt="thumbnail book"
                            />
                          </div>
                          <div className="text">{item.mainText}</div>
                          <div className="price" style={{ fontSize: "1rem" }}>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}
                          </div>
                          <div className="rating">
                            <Rate
                              value={5}
                              disabled
                              style={{ color: "#ffce3d", fontSize: 10 }}
                            />
                            <span>Đã bán {item.sold}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Row>
            <Divider />
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                defaultCurrent={current}
                total={total}
                responsive
                pageSize={pageSize}
                onChange={(c, ps) =>
                  handleChangePage({ current: c, pageSize: ps })
                }
              />
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Home;
