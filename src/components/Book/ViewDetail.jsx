import { Col, Divider, Rate, Row } from "antd";
import "./ViewDetail.scss";
import ImageGallery from "react-image-gallery";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import BookLoader from "./BookLoader";

const ViewDetail = (props) => {
  const { bookData } = props;
  const images = bookData?.items ?? [];
  console.log("bookData", bookData);
  return (
    <>
      {bookData && bookData._id ? (
        <div style={{ background: "#f2f2f2", padding: "20px 0" }}>
          <div
            className="view-detail-book"
            style={{ maxWidth: 1290, margin: "0 auto" }}
          >
            <div
              style={{
                padding: "20px",
                background: "#FFFFFF",
                borderRadius: "6px",
              }}
            >
              <Row gutter={[25, 20]}>
                <Col md={10} sm={0} xs={0}>
                  <ImageGallery
                    items={images}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    renderLeftNav={() => <></>}
                    renderRightNav={() => <></>}
                    slideOnThumbnailOver={true}
                  />
                </Col>
                <Col md={14} sm={24} xs={24}>
                  <Col md={0} sm={24} xs={24}>
                    <ImageGallery
                      items={images}
                      showPlayButton={false}
                      showFullscreenButton={false}
                      renderLeftNav={() => <></>}
                      renderRightNav={() => <></>}
                      slideOnThumbnailOver={true}
                    />
                  </Col>
                  <Col span={24}>
                    <div className="right-content">
                      <div className="author">
                        Tác giả: <a href="#">{bookData.author}</a>
                      </div>
                      <div className="title">{bookData.mainText}</div>
                      <div className="rating">
                        <Rate
                          value={5}
                          disabled
                          style={{ color: "#ffce3d", fontSize: 10 }}
                        />
                        <span className="sold">
                          <Divider type="vertical" />
                          Đã bán: {bookData.sold}
                        </span>
                      </div>
                      <div className="price">
                        <span className="currency">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(bookData.price)}
                        </span>
                      </div>
                      <div className="delivery">
                        <span className="left-side">Vận chuyển</span>
                        <span className="right-side">Miễn phí vận chuyển</span>
                      </div>
                      <div className="quantity">
                        <span className="left-side">Số lượng:</span>
                        <span className="right-side">
                          <button className="btn">
                            <MinusOutlined />
                          </button>
                          <input defaultValue={1} className="btn inp" />
                          <button className="btn">
                            <PlusOutlined />
                          </button>
                        </span>
                      </div>
                      <div className="add-to-cart">
                        <button className="btn-add-to-cart">
                          Thêm vào giỏ hàng
                        </button>
                        <button className="btn-paid">Mua ngay</button>
                      </div>
                    </div>
                  </Col>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      ) : (
        <BookLoader />
      )}
    </>
  );
};
export default ViewDetail;
