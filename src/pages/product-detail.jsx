import React from "react";

import ModuleProductDetail from "modules/module-product-detail";

const ProductDetail = (props) => {
  const productId = props.match.params.productId;
  return <ModuleProductDetail productId={productId} />;
};

export default ProductDetail;
