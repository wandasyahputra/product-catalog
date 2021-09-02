import axios from "axios";

import { FETCH_PRODUCT, FIND_PRODUCT } from "url/index";

export const fetchRemoteProduct = async (page, numOfResults, textSearch) => {
  if (textSearch === "") {
    return await axios({
      method: "get",
      url: `${FETCH_PRODUCT}&page=${page}&limit=${numOfResults}`,
    });
  } else {
    return await axios({
      method: "get",
      url: `${FIND_PRODUCT(textSearch)}&page=${page}&limit=${numOfResults}`,
    });
  }
};
