import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "antd";
import { callListBookAdmin, callDeletetBook } from "../../../services/api";
import InputSearchBook from "./InputSearchBook";
import ViewBookDetail from "./ViewBookDetail";
import {
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Tooltip,
  Space,
  Popconfirm,
  message,
  notification,
} from "antd";
import * as XLSX from "xlsx";
import BookModalCreate from "./BookModalCreate";
import BookModalUpdate from "./BookModalUpdate";

const BookTable = () => {
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [querySort, setQuerySort] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState({});
  const [modalCreateBookOpen, setModalCreateBookOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const fetchAllBooks = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;

    if (filter) {
      query += `&${filter}`;
    }
    if (querySort) {
      query += `&${querySort}`;
    }
    let res = await callListBookAdmin(query);
    if (res?.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const handleFilter = (queryFilter) => {
    console.log("queryFilter", queryFilter);
    setFilter(queryFilter);
  };

  const confirm = async (id) => {
    const res = await callDeletetBook(id);
    console.log(res);
    if (res?.data) {
      message.success("Xóa thành công");
      await fetchAllBooks();
      setCurrent(1);
    } else {
      notification.error({
        message: "Error",
        description: "Something Wrong!",
      });
    }
  };

  useEffect(() => {
    if (filter) {
      setCurrent(1);
    }
  }, [filter]);

  useEffect(() => {
    fetchAllBooks();
  }, [current, pageSize, filter, querySort]);

  const columns = [
    {
      title: "Id",
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
      title: "Tên sách",
      dataIndex: "mainText",
      sorter: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", gap: 20 }}>
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDataUpdate(record);
                setOpenModalUpdate(true);
              }}
            />
            <Popconfirm
              placement="left"
              title={`Are you sure to delete ${record.mainText}?`}
              description={`Delete the ${record.category} book?`}
              onConfirm={() => confirm(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        );
      },
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
      setQuerySort(q);
    }
  };

  const renderHeaderTable = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table Data Books</span>
        <span style={{ display: "flex", gap: 15 }}>
          {/* <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={() => handleExportUsers()}
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
          </Button> */}

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setModalCreateBookOpen(true);
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
                setQuerySort("");
              }}
            />
          </Tooltip>
        </span>
      </div>
    );
  };

  return (
    <>
      <Row style={{ justifyContent: "center", padding: "20px 0px 20px 0px" }}>
        <Col span={23}>
          <InputSearchBook handleFilter={handleFilter} />
        </Col>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col span={23}>
          <Table
            title={renderHeaderTable}
            columns={columns}
            dataSource={listBook}
            rowKey="_id"
            onChange={onChange}
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
            }}
          />
        </Col>
      </Row>
      <ViewBookDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <BookModalCreate
        modalCreateBookOpen={modalCreateBookOpen}
        setModalCreateBookOpen={setModalCreateBookOpen}
        fetchAllBooks={fetchAllBooks}
      />
      <BookModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchAllBooks={fetchAllBooks}
      />
    </>
  );
};
export default BookTable;
