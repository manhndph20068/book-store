import { Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { callGetOrders } from "../../../services/api";

const OrderTable = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const initOrderData = async () => {
      const res = await callGetOrders();
      if (res && res?.data && res?.data?.result) {
        setOrderData(res?.data?.result);
      }
    };
    initOrderData();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
    },
  ];

  return (
    <div style={{ padding: "15px" }}>
      <Table columns={columns} dataSource={orderData} pagination={false} />
    </div>
  );
};
export default OrderTable;
