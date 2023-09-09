import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { callGetHistory } from "../../services/api";
import ReactJson from "react-json-view";

const History = () => {
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await callGetHistory();
      console.log("res", res.data);
      if (res?.data) {
        setDataHistory(res.data);
        console.log("da", dataHistory);
      }
    };
    fetchHistory();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "id",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalPrice",
    },
    {
      title: "Trạng thái",
      render: (_, record, data) => {
        return (
          // <Tag color={record.status === "Đã giao" ? "green" : "red"}>
          //   {record.status}
          // </Tag>
          <Tag bordered={false} color="success">
            Thành công
          </Tag>
        );
      },
    },
    {
      title: "Chi tiết",

      // dataIndex: "age",
      render: (_, record, data) => {
        return (
          <ReactJson
            collapsed={true}
            iconStyle={"triangle"}
            src={record.detail}
            name="Chi tiết đơn hàng"
            displayObjectSize={false}
            displayDataTypes={false}
          />
        );
      },
    },
  ];

  return (
    <div style={{ maxWidth: 1290, margin: "0 auto", padding: "50px" }}>
      <Table columns={columns} dataSource={dataHistory} pagination={false} />
    </div>
  );
};
export default History;
