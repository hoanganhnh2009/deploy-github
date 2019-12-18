import React from "react";
import { useHistory } from "react-router-dom";

function ProtectedPage() {
  let history = useHistory();
  return (
    <div>
      <h3>Bình luận - Tin nhắn </h3>
      <button onClick={() => history.goBack()}>Quay về</button>
    </div>
  );
}

export default ProtectedPage;
