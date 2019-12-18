import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { fakeAuth } from "../../helpers";
import AuthService from "../../services/AuthService";
const LoginPage = props => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [username, setUserName] = useState("demo1");
  const [password, setPassword] = useState("demo");
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/dashboard" } };
  const _authService = new AuthService();
  let login = async () => {
    if (!username) return message.error(`Bạn chưa nhập tài khoản`);
    if (!password) return message.error(`Bạn chưa nhập mật khẩu`);
    setLoading(true);
    const responseJSON = await _authService.login(username, password);
    setLoading(false);
    if (responseJSON.success) {
      fakeAuth.authenticate(() => {
        window.localStorage.setItem("authenticated", "true");
        history.replace(from);
      });
    } else {
      message.error(`${responseJSON.error.message}`);
    }
  };
  let authenticated = window.localStorage.getItem("authenticated");

  return authenticated ? (
    <Redirect
      to={{
        pathname: "/dashboard",
        state: { from: "login" }
      }}
    />
  ) : (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>

      <div style={{ margin: 16 }}>
        <Input
          value={username}
          addonBefore="Tài khoản"
          onChange={e => setUserName(e.target.value)}
          allowClear
        />
      </div>
      <div style={{ margin: 16 }}>
        <Input.Password
          value={password}
          addonBefore="Mật khẩu"
          allowClear
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div style={{ margin: 16, textAlign: "center" }}>
        <Button loading={loading} type="primary" onClick={login} icon="login">
          Đăng nhập
        </Button>
      </div>
      <div style={{ margin: 16, textAlign: "center" }}>
        <Button type="danger" onClick={() => history.push("/")} icon="rollback">
          Quay lại
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  console.log("TCL: mapStateToProps -> state", state);
  return {
    test: state.test,
    counter: state.counter
  };
}

export default LoginPage;
