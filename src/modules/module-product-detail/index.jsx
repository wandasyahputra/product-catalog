import React, { useEffect, useRef, useState } from "react";
import { fetchProductDetail, selectData, selectStatus } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AsyncButton } from "components/button";

const ModuleProductDetail = (props) => {
  const { productId } = props;
  const dispatch = useDispatch();
  const productDetail = useSelector(selectData);
  const [localComment, setLocalComment] = useState([]);
  const loadStatus = useSelector(selectStatus);
  const commentRef = useRef(null);
  const ratingRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
    if (localStorage.getItem(productId)) {
      setLocalComment(JSON.parse(localStorage.getItem(productId)));
    }
  }, []);

  const handleAddComment = () => {
    const data = {
      review_details: commentRef.current.value,
      review_rating: ratingRef.current.value,
    };
    commentRef.current.value = "";
    ratingRef.current.value = "";
    setLocalComment((prev) => {
      const newComment = [...prev, data];
      localStorage.setItem(productId, JSON.stringify(newComment));
      return newComment;
    });
  };

  return (
    <React.Fragment>
      <div>
        <AsyncButton
          variant="outline-primary"
          className="mb-3 mt-3"
          onClick={() => window.history.back()}
        >
          Back
        </AsyncButton>
        {loadStatus === "idle" && (
          <>
            <table>
              <tr>
                <td>Product Name</td>
                <td className="me-2">:</td>
                <td>{productDetail.product_name}</td>
              </tr>
              <tr>
                <td>Product Price</td>
                <td className="me-2">:</td>
                <td>{productDetail.product_price}</td>
              </tr>
              <tr>
                <td>Product Description</td>
                <td className="me-2">:</td>
                <td>{productDetail.product_description}</td>
              </tr>
            </table>
            <Table>
              <thead>
                <tr>
                  <td>Comments</td>
                  <td>Ratings</td>
                </tr>
              </thead>
              <tbody>
                {productDetail.product_reviews.map((item, key) => (
                  <tr key={`comment-${key}`}>
                    <td>{item.review_details}</td>
                    <td>{item.review_rating}</td>
                  </tr>
                ))}
                {localComment.map((item, key) => (
                  <tr key={`local-comment-${key}`}>
                    <td>{item.review_details}</td>
                    <td>{item.review_rating}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <table>
              <tr>
                <td>Comment</td>
                <td>:</td>
                <td>
                  <input ref={commentRef} />
                </td>
              </tr>
              <tr>
                <td>Rating</td>
                <td>:</td>
                <td>
                  <input type="number" ref={ratingRef} />
                </td>
              </tr>
            </table>
            <div>
              <AsyncButton onClick={() => handleAddComment()}>
                Add Review
              </AsyncButton>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default ModuleProductDetail;
