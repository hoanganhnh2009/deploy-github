import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory
} from "react-router-dom";
const ProductDetail = props => {
  let { productId } = useParams();
  return (
    <div>
      <h1 style={{ color: "green" }}>
        Chi tiết sản phẩm <span>{productId}</span>
      </h1>
    </div>
  );
};

export default ProductDetail;
