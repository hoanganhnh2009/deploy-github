import React from "react";
import { useHistory } from "react-router-dom";

const RegistrationForm = props => {
  let history = useHistory();
  return (
    <div>
      Đăng kí
      <button onClick={() => history.push("/login")}>Về trang đăng nhập</button>
    </div>
  );
};

export default RegistrationForm;
