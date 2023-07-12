import React, { useEffect, useState } from "react";
import { Row, Table, Col } from "antd";
import "./UserTable.scss";
import { callGetAllUserWithPaginate } from "../../../services/api";
import InputSearch from "./InputSearch";
import {
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, Space } from "antd";
import ViewUserDetail from "./ViewUserDetail";
import UserModelCreate from "./UserModelCreate";
import UserModelImport from "./UserModelImport";

const UserTable = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setQuery] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState({});
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalImportOpen, setIsModalImportOpen] = useState(false);

  const handleSearch = (querySearch) => {
    setFilter(querySearch);
  };

  const fetchUser = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    console.log("query", query);
    let res = await callGetAllUserWithPaginate(query);

    if (res?.data?.result) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
      // setCurrent(1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [current, pageSize, filter, sortQuery]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              setOpenViewDetail(true);
              setDataViewDetail(record);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: true,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setCurrent(1);
      setPageSize(pagination.pageSize);
    }
    if (sorter && sorter.field) {
      let q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setQuery(q);
    }

    console.log("params", pagination, filters, sorter, extra);
  };

  const renderHeaderTable = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table Data Users</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={() => {
              setFilter("");
              setQuery("");
            }}
          >
            Export
          </Button>

          <Button
            type="primary"
            icon={<ImportOutlined />}
            onClick={() => {
              setIsModalImportOpen(true);
            }}
          >
            Import
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalCreateOpen(true);
            }}
          >
            Thêm mới
          </Button>

          <Tooltip title="Refresh Data Table">
            <Button
              shape="circle"
              icon={<ReloadOutlined />}
              onClick={() => {
                setFilter("");
                setQuery("");
              }}
            />
          </Tooltip>
        </span>
      </div>
    );
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="table-container">
            <InputSearch
              handleSearch={handleSearch}
              setFilter={setFilter}
              filter={filter}
            />
          </div>
        </Col>
        <Col span={24}>
          <div className="table-container">
            <Table
              columns={columns}
              title={renderHeaderTable}
              loading={isLoading}
              dataSource={listUser}
              onChange={onChange}
              rowKey="_id"
              pagination={{
                current: current,
                pageSize: pageSize,
                showSizeChanger: true,
                total: total,
              }}
            />
          </div>
        </Col>
      </Row>
      <ViewUserDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <UserModelCreate
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
        fetchUser={fetchUser}
      />
      <UserModelImport
        isModalImportOpen={isModalImportOpen}
        setIsModalImportOpen={setIsModalImportOpen}
        fetchUser={fetchUser}
      />
    </>
  );
};
export default UserTable;
