import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import ErrorPage from "components/error-page";
import { Link } from "react-router-dom";

const defaultPage = {
  page: 1,
  numOfResult: 20,
};

export const TableGrid = (props) => {
  const { columns, data, status, fetchData, lastPage } = props;
  const [page, setPage] = useState(defaultPage.page);
  const [numOfResult, setNumOfResult] = useState(defaultPage.numOfResult);
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    fetchData(defaultPage.page, defaultPage.numOfResult, textSearch);
  }, []);

  const onChangePage = (newPage) => {
    setPage(newPage);
    fetchData(newPage, numOfResult, textSearch);
  };

  const onChangeNumOfResult = (newNumOfResult) => {
    setNumOfResult(newNumOfResult);
    setPage(1);
    fetchData(1, newNumOfResult, textSearch);
  };

  const onSearch = (text) => {
    setPage(1);
    setTextSearch(text);
    fetchData(1, numOfResult, text);
  };

  const renderLoading = () => {
    return (
      <>
        <tr>
          <td>
            <div className="shine me-2 shine-checkbox d-inline-block"></div>
          </td>
          {columns.map((_col, keyColumn) => (
            <td key={`loading-${keyColumn}`}>
              <div className="shine me-2 shine-line"></div>
            </td>
          ))}
        </tr>
        <tr>
          <td>
            <div className="shine me-2 shine-checkbox d-inline-block"></div>
          </td>
          {columns.map((_col, keyColumn) => (
            <td key={`loading-${keyColumn}`}>
              <div className="shine me-2 shine-line"></div>
            </td>
          ))}
        </tr>
        <tr>
          <td>
            <div className="shine me-2 shine-checkbox d-inline-block"></div>
          </td>
          {columns.map((_col, keyColumn) => (
            <td key={`loading-${keyColumn}`}>
              <div className="shine me-2 shine-line"></div>
            </td>
          ))}
        </tr>
      </>
    );
  };

  const renderCell = (col, item) => {
    if (col.link) {
      return (
        <Link to={col.link(item)}>
          {!col.template ? item[col.binding] : col.template(item)}
        </Link>
      );
    } else {
      return !col.template ? item[col.binding] : col.template(item);
    }
  };

  const renderPagination = () => {
    const items = [
      <Pagination.First
        disabled={page === 1}
        onClick={() => onChangePage(1)}
      />,
    ];
    if (page > 3) {
      items.push(<Pagination.Ellipsis />);
    }
    for (
      let number = page - 3 > 0 ? page - 3 : 1;
      number < page + 3 && number <= lastPage;
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => onChangePage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (page + 3 < lastPage) {
      items.push(<Pagination.Ellipsis />);
    }

    items.push(
      <Pagination.Last
        disabled={page === lastPage}
        onClick={() => onChangePage(lastPage)}
      />
    );

    return (
      <>
        <Pagination>{items}</Pagination>
        <div>
          <span className="me-3">Page Size</span>
          <span>
            <select
              onChange={(e) => onChangeNumOfResult(e.currentTarget.value)}
              defaultValue={defaultPage.numOfResult}
              className="w-25 mb-4 p-2"
            >
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </span>
        </div>
      </>
    );
  };

  const renderSearch = () => {
    return (
      <input
        onChange={(e) => onSearch(e.currentTarget.value)}
        className="w-50 mt-4"
        placeholder="Search Product"
      />
    );
  };

  return (
    <>
      {renderSearch()}
      <Table hover>
        <thead>
          <tr>
            <td>No</td>
            {columns.map((item, key) => (
              <td key={key}>{item.name}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {status === "loading" && renderLoading()}
          {status === "idle" &&
            data.map((item, keyRow) => (
              <tr key={`${item.name}-${keyRow}`}>
                <td>{keyRow + 1 + (page - 1) * numOfResult}</td>
                {columns.map((col, keyColumn) => (
                  <td key={`${col.binding}-${keyColumn}`}>
                    {renderCell(col, item)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
      {renderPagination()}
      {status === "error" && <ErrorPage reFetch={fetchData} />}
    </>
  );
};
