import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
const ScreenFooter = props => {
  let year = new Date().getFullYear()
  return <></>
  return (
    <Footer style={{ textAlign: "center" }}>
       @{year} Develop by Nguyễn Hữu Thành
    </Footer>
  );
};

export default ScreenFooter;
