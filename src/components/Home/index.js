import React from "react";
import { useHistory, Redirect } from "react-router-dom";

const Home = props => {
  let history = useHistory();
  const login = () => {
    // history.push("/login");
    history.replace({ pathname: "/login" });
  };
  let authenticated = window.localStorage.getItem("authenticated");
  return (
    <div>
      <h1>Trang chủ giới thiệu Abitstore</h1>
      <button onClick={login}>Tới trang đăng nhập</button>
    </div>
  );
};

export default Home;
