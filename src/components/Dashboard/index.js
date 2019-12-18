import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Protected from "../Protected";
import Product from "../Product";
import ProductDetail from "../Product/ProductDetail";
import Storage from "../Storage";
import Company from "../Company";
import Config from "../Config";
import ScreenDashboard from "./Dashboard";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Typography,
  PageHeader,
  Button,
  Dropdown,
  message,
  Avatar,
  Input
} from "antd";
import Navigation from "../../layouts/Navigation";
import { connect } from "react-redux";
import "./Dashboard.css";
import ScreenFooter from "../UI/ScreenFooter";
const { Header, Content } = Layout;

const Dashboard = props => {
  const [collapsed, setCollapsed] = useState(false);
  let onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  let history = useHistory();
  const logOut = () => {
    // history.push("/login");
    window.localStorage.removeItem("authenticated");
    history.replace({ pathname: "/login" });
  };
  let { path, url } = useRouteMatch();
  const menu = (
    <Menu>
      <Menu.Item>
        <Button
          onClick={() => history.push(`${path}/config`)}
          type="link"
          icon="setting"
        >
          Cài đặt
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={logOut} type="link" icon="poweroff">
          Đăng xuất
        </Button>
        ,
      </Menu.Item>
    </Menu>
  );
  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={menu}>
        <Button
          style={{
            border: "none",
            padding: 0
          }}
        >
          <Avatar
            style={{
              backgroundColor: "#00a2ae",
              verticalAlign: "middle"
            }}
            size="small"
          >
            T
          </Avatar>
          <Typography.Text>Thành</Typography.Text>
        </Button>
      </Dropdown>
    );
  };
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navigation collapsed={collapsed} onCollapse={onCollapse} />
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <PageHeader
            // style={{
            //   border: "1px solid rgb(235, 237, 240)"
            // }}
            onBack={toggle}
            backIcon={
              <Icon
                className="trigger"
                type={collapsed ? "menu-unfold" : "menu-fold"}
              />
            }
            // title="Quản lý chiến dịch"
            // subTitle="Quản lý chiến dịch remarketing"
            extra={[
              <Input.Search
                placeholder="Tìm kiếm"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
                allowClear
              />,
              <Button
                key="btn2"
                type="link"
                icon="bell"
                onClick={() => message.warn("Chưa có thông báo")}
              />,
              <Button
                key="btn3"
                type="link"
                icon="question-circle"
                onClick={() => message.warn("Chưa có thông báo")}
              />,
              <DropdownMenu key="more" />,
              <Button
                key="btn4"
                type="link"
                icon="global"
                onClick={() => message.warn("Chưa có thông báo")}
              />
            ]}
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item onClick={() => history.push(`${path}`)}>
              Trang chủ
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Switch>
              <Route exact path={path}>
                <ScreenDashboard />
              </Route>
              <Route path={`${path}/protected`}>
                <Protected />
              </Route>
              <Route path={`${path}/product`}>
                <Product />
              </Route>
              <Route path={`${path}/product/:productId`}>
                <ProductDetail />
              </Route>
              <Route path={`${path}/Storage`}>
                <Storage />
              </Route>
              <Route path={`${path}/company`}>
                <Company />
              </Route>
              <Route path={`${path}/config`}>
                <Config />
              </Route>
            </Switch>
          </div>
        </Content>
        <ScreenFooter />
      </Layout>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}
export default connect(mapStateToProps)(Dashboard);
