import React, { useState } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import "./Login.css";
import AuthService from "../../services/AuthService";
import { useHistory, useLocation, Redirect } from "react-router-dom";

const LoginPage = props => {
  const [loading, setLoading] = useState(false);
  const _authService = new AuthService();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/dashboard" } };
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      const { password, username } = values;
      if (!err) {
        console.log("Received values of form: ", values);
        setLoading(true);
        const responseJSON = await _authService.login(username, password);
        console.log("TCL: responseJSON", responseJSON);
        setLoading(false);
        if (responseJSON.success) {
          //   fakeAuth.authenticate(() => {
          window.localStorage.setItem("authenticated", "true");
          window.localStorage.setItem("dynamic_key",responseJSON.dynamic_key );
          history.replace(from);
          //   history.push("dashboard");
          //   });
        } else {
          message.error(`${responseJSON.error.message}`);
        }
      }
    });
  };
  const { getFieldDecorator } = props.form;
  let authenticated = window.localStorage.getItem("authenticated");

  return authenticated ? (
    <Redirect
      to={{
        pathname: "/dashboard",
        state: { from: "login" }
      }}
    />
  ) : (
    <Form onSubmit={handleSubmit} className="login-form">
      <div style={{ textAlign: "center" }}>
        <img
          style={{ width: 200, height: "auto", margin: "20px" }}
          src="https://abitstore.vn/assets/images/logo.png"
        />
      </div>
      <Form.Item hasFeedback>
        {getFieldDecorator("username", {
          rules: [
            { required: true, message: "Vui lòng nhập tài khoản của bạn!" }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Tài khoản"
            allowClear
          />
        )}
      </Form.Item>
      <Form.Item hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            {
              /* { pattern: /[0-9]/gi, message: "Mật khẩu bao gồm chữ, số và các kí tự đặc biệt " } */
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Mật khẩu"
            allowClear
          />
        )}
      </Form.Item>
      <Form.Item>
       {/*  {getFieldDecorator("remember", {
          valuePropName: "checked",
          initialValue: true
        })(<Checkbox>Nhớ tài khoản</Checkbox>)} */}
        <a
          className="login-form-forgot"
          onClick={e => {
            history.push("forget_password");
          }}
        >
          Quên mật khẩu
        </a>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Đăng nhập
        </Button>
        Hoặc{" "}
        <a
          onClick={e => {
            e.preventDefault();
            history.replace("/register");
          }}
        >
          Đăng ký!
        </a>
      </Form.Item>
    </Form>
  );
};

const WrappedLoginForm = Form.create({ name: "login_form" })(LoginPage);

export default WrappedLoginForm;
