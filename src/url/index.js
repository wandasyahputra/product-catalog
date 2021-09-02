const baseURL = process.env.REACT_APP_API_URL;
const ApiKey = process.env.REACT_APP_API_KEY;

export const FETCH_PRODUCT = `${baseURL}products?apikey=${ApiKey}`;

export const FIND_PRODUCT = (textSearch) =>
  `${baseURL}products/search?term=${textSearch}&apikey=${ApiKey}`;

export const FETCH_PRODUCT_DETAIL = (productId) =>
  `${baseURL}products/${productId}?apikey=${ApiKey}`;
