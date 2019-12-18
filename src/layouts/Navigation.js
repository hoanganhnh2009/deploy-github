import React from "react";
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
  Avatar
} from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/bubblegum",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/shoelaces",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>,
    child: []
  }
];
const Navigation = props => {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  return (
    <Sider
      width={256}
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
    >
      <div className="logo" style={{ textAlign: "center" }}>
        <Typography.Text
          style={{
            color: "rgba(255, 255, 255, 0.65)",
            fontWeight: "bold",
            fontSize: "22px"
          }}
        >
          <img
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          ></img>
          {/* {!collapsed&&<h1>Abitstore</h1>}  */}
        </Typography.Text>
      </div>
      <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
        <Menu.Item onClick={() => history.push(`${url}/protected`)} key="1">
          <Icon type="pie-chart" />
          <span>Bình luận - Tin nhắn</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => history.push("/forget_password")}>
          <Icon type="desktop" />
          <span>Kết nối đa kênh</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              <span>Xử lý đơn hàng</span>
            </span>
          }
        >
          <Menu.Item key="3">Đơn hàng theo NV</Menu.Item>
          <Menu.Item key="4">Quản lý vận đơn</Menu.Item>
          <Menu.Item key="5">Inbox theo TT đơn</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="team" />
              <span>Sản phẩm</span>
            </span>
          }
        >
          <Menu.Item key="6" onClick={() => history.push(`${url}/product`)}>
            Quản lý sản phẩm
          </Menu.Item>
          <Menu.Item key="8" onClick={() => history.push(`${url}/storage`)}>
            Quản lý kho
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="9"
          onClick={() => {
            history.push(`${url}/topic/rendering`);
          }}
        >
          <Icon type="file" />
          <span>Nhà cung cấp</span>
        </Menu.Item>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="team" />
              <span>Thông tin công ty</span>
            </span>
          }
        >
          <Menu.Item key="10" onClick={() => history.push(`${url}/company`)}>
            Get dynamic_key
          </Menu.Item>
          <Menu.Item
            key="11"
            onClick={() => history.push(`${url}/company/userInfo`)}
          >
            Get User Info
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
// sidebar
export default Navigation;
