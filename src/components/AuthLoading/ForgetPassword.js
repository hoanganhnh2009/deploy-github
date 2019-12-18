import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";

const ForgetPassword = props => {
  let history = useHistory();

  const location = useLocation();
  useEffect(() => {
    return () => {
      //   if (history.action === "POP") {
      //     history.replace(location.pathname);
      //   }
      //   history.goBack();
    };
  }, [history]);
  return (
    <div>
      <button onClick={() => history.goBack()}>Quay lại nè</button>
      <h1>Quên mật khẩu</h1>
      <button onClick={() => history.push("protected")}>
        Go to protected Page
      </button>
    </div>
  );
};

export default ForgetPassword;
