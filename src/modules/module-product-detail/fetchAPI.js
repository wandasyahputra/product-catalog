import axios from "axios";

import { FETCH_PRODUCT_DETAIL } from "url/index";

export const fetchRemoteProductDetail = async (productId) => {
  return await axios({
    method: "get",
    url: FETCH_PRODUCT_DETAIL(productId),
  });
};
