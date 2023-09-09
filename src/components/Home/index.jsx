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
  Spin,
} from "antd";
import { callGetListCategory, callListBookAdmin } from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [form] = Form.useForm();
  const [listCategory, setListCategory] = useState([]);
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [loadingProd, setLoadingProd] = useState(false);
  const [sortQuery, setSortQuery] = useState("sort=-sold");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

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

    if (changedValues.category) {
      const category = values.category;
      if (category && category.length > 0) {
        const f = category.join(",");
        setFilter(`category=${f}`);
      } else {
        setFilter("");
      }
    }
  };

  const onFinish = (values) => {
    console.log(">>> check onFinish", values);

    if (values?.range?.from >= 0 && values?.range?.to >= 0) {
      console.log("checkedddd");
      let f = `price>=${values?.range?.from}&price<=${values?.range?.to}`;
      if (values?.category?.length) {
        const cate = values?.category?.join(",");
        f += `&category=${cate}`;
      }
      setFilter(f);
    }
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
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    if (filter) {
      query += `&${filter}`;
    }
    const fetchAllBook = async () => {
      setLoadingProd(true);
      let res = await callListBookAdmin(query);
      if (res?.data?.result) {
        setListBook(res.data.result);
        setTotal(res.data.meta.total);
        setLoadingProd(false);
      }
    };

    fetchAllBook();
  }, [current, pageSize, sortQuery, filter]);

  const items = [
    {
      key: "sort=-sold",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "sort=-updatedAt",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "sort=price",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "sort=-price",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];

  const toNonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    return str;
  };

  const convertSlug = (str) => {
    str = toNonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const handleRedirectBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };

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
              <Tabs
                defaultActiveKey="sort=-sold"
                items={items}
                onChange={(value) => {
                  setSortQuery(value);
                }}
                style={{ overflowX: "auto" }}
              />
            </Row>
            <Spin spinning={loadingProd}>
              <Row className="customize-row">
                {listBook.length > 0 &&
                  listBook.map((item, index) => {
                    return (
                      <div
                        className="column"
                        onClick={() => handleRedirectBook(item)}
                      >
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
            </Spin>

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
