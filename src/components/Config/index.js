import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import { Typography, Radio, Input, message } from "antd";

const Config = props => {
  const [value, setValue] = useState(null);
  const [loading,setLoading] = useState(false)
  let { path, url } = useRouteMatch();
  const history = useHistory();
  useEffect(() => {
    fetchConfig();
    document.title = "Cấu hình chia tin nhắn - bình luận";
  });
  let fetchConfig = async () => {
    if (value) return;
    try {
      const dynamic_key = window.localStorage.getItem("dynamic_key");
      let response = await fetch(
        `https://new.abitstore.vn/config/view?dynamic_key=${dynamic_key}`
      );
      let responseJSON = await response.json();
      console.log("TCL: fetchConfig -> responseJSON", responseJSON);
      if (responseJSON[0]) {
        setValue(responseJSON[0].type_delivery_conversion);
      } else {
        window.localStorage.clear();
        history.push("/login");
      }
    } catch (error) {
      console.log("TCL: fetchConfig -> error", error);
    }
  };
  const onChange = async e => {
    setValue(e.target.value);
    setLoading(true)
    let key = "update_config";
    message.loading({ content: "Đang lưu...", key });

    const dynamic_key = window.localStorage.getItem("dynamic_key");
    const body = JSON.stringify([
      { type_delivery_conversion: e.target.value.toString() }
    ]);
    let response = await fetch(
      `https://new.abit.vn/config/configAbitmes?dynamic_key=${dynamic_key}`,
      {
        method: "POST",
        body
      }
    );
    let responseJSON = await response.json();
    setLoading(false)
    if (responseJSON.status === "success") {
      message.success({ content: responseJSON.message, key, duration: 2 });
    } else {
      message.error(responseJSON.message);
      message.error({ content: responseJSON.message, key, duration: 2 });
    }
  };
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
  };
  return (
    <Switch>
      <Route exact path={path}>
        <>
          <Typography.Title level={4} type="secondary">
            Cấu hình chia tin nhắn - Bình Luận
          </Typography.Title>
          <Radio.Group onChange={onChange} value={value} disabled={loading}>
            <Radio style={radioStyle} value={2}>
              Chia vòng tròn (Chia đều cho các nhân viên chăm sóc page, ưu tiên
              nhân viên Online)
            </Radio>
            <Radio style={radioStyle} value={1}>
              Chia cho nhân viên click đầu tiên (Nhân viên khác không xem tin
              nhắn được)
            </Radio>
            <Radio style={radioStyle} value={3}>
              Chia cho nhân viên click đầu tiên (Nhân viên khác vẫn xem và bình
              luận - nhắn tin được)
            </Radio>
            <Radio style={radioStyle} value={4}>
              Không chia
            </Radio>
          </Radio.Group>
        </>
      </Route>
      <Route path={`${path}/:messageId`}>
        <div>Kiểu chia tin</div>
      </Route>
    </Switch>
  );
};

export default Config;
