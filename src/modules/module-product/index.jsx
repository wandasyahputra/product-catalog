import React, { useEffect } from "react";
import {
  fetchProducts,
  selectData,
  selectLastpage,
  selectStatus,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TableGrid } from "components/table";

const ModuleProduct = () => {
  const dispatch = useDispatch();
  const productList = useSelector(selectData);
  const loadStatus = useSelector(selectStatus);
  const lastPage = useSelector(selectLastpage);

  const fetchData = (page, numOfResult, textSearch) => {
    dispatch(fetchProducts({ page, numOfResult, textSearch }));
  };

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  const columns = [
    {
      name: "Name",
      binding: "product_name",
      template: (data) => (
        <Link to={`product/${data._id}`}>{data.product_name}</Link>
      ),
    },
    {
      name: "Price",
      binding: "product_price",
    },
    {
      name: "",
      binding: "action",
      template: () => (
        <Link to={"#"}>
          <Button variant="outline-primary">Add</Button>
        </Link>
      ),
    },
  ];

  return (
    <React.Fragment>
      <TableGrid
        columns={columns}
        data={productList}
        status={loadStatus}
        fetchData={fetchData}
        lastPage={lastPage}
      />
    </React.Fragment>
  );
};

export default ModuleProduct;
