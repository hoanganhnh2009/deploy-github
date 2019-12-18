import React, { useState, useEffect } from "react";
import { Table, Divider, Button, Icon, Input } from "antd";

import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import _ from "lodash";
import ProductDetail from "./ProductDetail";
const { Search } = Input;

const Product = () => {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageSize: 50, total: 0 });

  useEffect(() => {
    fetchData();
    document.title = `Quản lý sản phẩm`;
  }, []);
  const fetchData = async (params = {}) => {
    try {
      setLoading(true);
      console.time("s");
      const dynamic_key = window.localStorage.getItem("dynamic_key");
      const body = JSON.stringify([
        {
          limit: "50",
          s: "",
          page: "0",
          status: "1",
          offset: "0",
          productstoreid: "1",
          productcategoryid: "",
          tonhang: "all",
          ...params
        }
      ]);
      console.log("TCL: fetchData -> body", body);
      let response = await fetch(
        `https://new.abitstore.vn/products/listsanpham?dynamic_key=${dynamic_key}`,
        {
          method: "POST",
          body
        }
      );
      let responseJSON = await response.json();
      console.log("TCL: fetchData -> responseJSON", responseJSON)
      if (responseJSON.error) {
        window.localStorage.clear();
        history.push("/login");
      }
      setLoading(false);
      console.log("TCL: loadData -> responseJSON", responseJSON);
      if (!_.isEqual(responseJSON.listproduct, data)) {
        setData(responseJSON.listproduct);
        setPagination({ ...pagination, total: responseJSON.number_product });
      } else {
        console.warn("Trùng dữ liệu mẹ rồi");
      }
      console.timeEnd("s");
    } catch (error) {
      console.log("TCL: fetchData -> error", error);
    }
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "productid",
      key: "productid",
      width: 200,
      render: text => (
        <a onClick={() => history.push(`${url}/${text}`)}>{text}</a>
      ),
      fixed: "left"
    },
    {
      title: "Tên",
      dataIndex: "productname",
      key: "productname"
    },
    {
      title: "Đơn vị tính",
      dataIndex: "usageunit",
      key: "usageunit"
    },
    {
      title: "Giá bán lẻ",
      dataIndex: "gia_daily",
      key: "gia_daily"
    },
    {
      title: "#",
      key: "action",
      render: () => (
        <span>
          <a>Sửa</a>
          <Divider type="vertical" />
          <a>Xoá</a>
        </span>
      )
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: record => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name
    })
  };
  const handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...pagination };
    pager.current = pagination.current;
    setPagination({
      pagination: pager
    });
    fetchData({
      page: (pager.current - 1).toString()
    });
  };
  const handleChangeText = e => {
    // console.log(e.target.value)
    fetchData({ s: e.target.value });
  };
  return (
    <Switch>
      <Route exact path={path}>
        <>
          <div style={{marginVertical:10}}>
            <Search
              placeholder="Tìm kiếm theo mã, tên sản phẩm"
              onSearch={value => console.log(value)}
              style={{ width: 400 }}
              enterButton
              onChange={handleChangeText}
            />
          </div>

          <Button icon="reload" type="link" onClick={() => fetchData()}>
            Tải lại
          </Button>
          <Table
            rowKey="productcode"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={pagination}
            scroll={{ x: 2000, y: 410 }}
            // loading={loading}
            loading={{
              spinning: loading,
              indicator: <Icon type="loading" style={{ fontSize: 24 }} spin />
            }}
            size="small"
            onChange={handleTableChange}
            // locale={{ emptyText: "Không có dữ liệu." }}
          />
        </>
      </Route>
      <Route path={`${path}/:productId`}>
        <ProductDetail />
      </Route>
    </Switch>
  );
};

export default React.memo(Product);
