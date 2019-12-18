import React, { useEffect } from "react";

const Store = props => {
  useEffect(() => {
    document.title = `Quản lý kho`;
  });
  return (
    <div>
      <h1 style={{ color: "blue" }}>Đây là trang quản lý Kho nhé</h1>
    </div>
  );
};

export default Store;
