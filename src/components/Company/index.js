import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import {
  Input,
  Icon,
  List,
  Skeleton,
  Avatar,
  Tag,
  message,
  Select,
  AutoComplete
} from "antd";
import "./Company.css";
import moment from "moment";
const { Search, Group } = Input;
const { Option } = Select;

const defaultProps = {
  permissions: [
    {
      label: "Tất cả quyền",
      value: ""
    },
    {
      label: "Tư Vấn Bán Hàng  (Telesale)",
      value: "H28"
    },
    {
      label: "BP Kho",
      value: "H18"
    },
    {
      label: "BP Kế Toán",
      value: "H9"
    },

    {
      label: "Kế toán in",
      value: "H30"
    },
    {
      label: "BP Marketing",
      value: "H8"
    },
    {
      label: "Quản lý bán hàng",
      value: "H4"
    },
    {
      label: "BP Chăm Sóc Khách Hàng",
      value: "H23"
    }
  ]
};

const Company = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [member, setMember] = useState([]);
  const [params, setParams] = useState({
    idcongty: 1
  });
  let { path, url } = useRouteMatch();
  let handleSearch = async s => {
    console.log("TCL: s", s);
    // let paper = { ...params, idcongty: s };
    let result = await fetchDynamicKey();
  };
  function queryString(query = {}) {
    const esc = encodeURIComponent;
    return Object.keys(query)
      .filter(pair => pair[1] !== "")
      .map(k => esc(k) + "=" + esc(query[k]))
      .join("&");
  }

  let fetchDynamicKey = async (qs = {}) => {
    if (!navigator.onLine) {
      // true|false
      return message.error("Không có kết nối internet");
    }
    try {
      setLoading(true);
      qs = {
        ...params,
        ...qs
      };
      let response = await fetch(
        `https://common.abitstore.vn/common/dynamic_key?${queryString(qs)}`
        //   { qs: params }
      );
      let responseJSON = await response.json();
      setLoading(false);
      if (responseJSON.success) {
        let resultData = responseJSON.data.map(e => {
          return {
            ...e,
            expired: moment(
              window.atob(e.dynamic_key).split("|")[0] * 1000
            ).valueOf(), //.add(8, "hours")
            atob: window.atob(e.dynamic_key)
          };
        });
        console.log("TCL: fetchDynamicKey -> resultData", resultData);
        setData(resultData);
        responseJSON.member &&
          setMember(
            responseJSON.member.map(e => {
              return {
                ...e,
                value: e.staff_id.toString()
              };
            })
          );
        return responseJSON.data;
      } else {
        setData([]);
        return [];
      }
    } catch (error) {
      setLoading(false);
      console.log("TCL: fetchDynamicKey -> error", error);
      message.error("Rất tiếc, có lỗi xảy ra.");
    }
  };
  let handleCopy = str => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    message.success("Copied to clipboard!");
  };
  const now = new Date().getTime();
  function handleChange(value) {
    console.log(`selected ${value}`);
    params.roleid = value;
    setParams(params);
    fetchDynamicKey(params);
  }
  function getPermissionName(roleid) {
    try {
      return props.permissions.find(x => x.value === roleid).label;
    } catch (error) {
      return "Chưa xác định";
    }
  }
  function onSelect(value) {
    // console.log("onSelect", value);
    setParams({ ...params, user_id: value });
  }
  function getUserName(user_id) {
    try {
      return member.find(x => x.staff_id === user_id).staff_name;
    } catch (error) {
      return "";
    }
  }
  useEffect(() => {
    fetchDynamicKey();
    document.title = `Thông tin công ty`;
  }, []);

  return (
    <Switch>
      <Route exact path={path}>
        <>
          <h1>Thông tin công ty (Get dynamic_key)</h1>

          <Group compact>
            <Select
              defaultValue="Tất cả quyền"
              style={{ width: 150 }}
              onChange={handleChange}
              disabled={params.user_id ? true : false}
            >
              {props.permissions.map(e => {
                return (
                  <Option key={e.value} value={e.value}>
                    {e.label}
                  </Option>
                );
              })}
            </Select>
            <Input
              style={{ width: 120 }}
              placeholder="User ID"
              value={params.user_id}
              type="number"
              onChange={e => {
                setParams({ user_id: e.target.value });
              }}
              onBlur={handleSearch}
              allowClear
              onPressEnter={handleSearch}
            />
            <Search
              style={{ width: 350, marginBottom: 15 }}
              placeholder="Nhập id công ty"
              loading={loading}
              enterButton
              type="number"
              onSearch={handleSearch}
              value={params.idcongty}
              onChange={e => setParams({ idcongty: e.target.value })}
              onBlur={handleSearch}
              allowClear
            />
          </Group>
          <List
            bordered
            dataSource={data}
            loading={loading}
            style={{ height: 400, overflow: "auto" }}
            // locale={{ emptyText: "Không có dữ liệu." }}
            renderItem={item => (
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={() => handleCopy(item.dynamic_key)}
                  >
                    <Icon type="copy" style={{ fontSize: 30, color: "rgba(0, 0, 0, 0.45)" }} />
                  </a>
                ]}
              >
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: "rgb(245, 106, 0)",
                          verticalAlign: "middle"
                        }}
                        size="large"
                      >
                        {getUserName(item.user_id)}
                      </Avatar>
                    }
                    title={
                      <>
                        <a href="#">ID công ty: {item.idcongty}</a> - Kiểu chia:{" "}
                        {item.type_delivery_conversion}- Vị trí:{" "}
                        {getPermissionName(item.roleid)}
                      </>
                    }
                    description={`${item.atob}`} //${item.dynamic_key} 
                  />
                  <Tag
                    color={item.expired < now ? "#f50" : "#87d068"}
                    key={"tag"}
                  >
                    Ngày hết hạn:{" "}
                    {moment(item.expired).format("DD/MM/YYYY hh:mm")}
                  </Tag>
                </Skeleton>
              </List.Item>
            )}
          />
        </>
      </Route>
      <Route path={`${path}/:companyId`}>
        <h1 style={{ color: "#f50" }}>Get User Info</h1>
      </Route>
    </Switch>
  );
};

Company.defaultProps = defaultProps;

export default Company;
