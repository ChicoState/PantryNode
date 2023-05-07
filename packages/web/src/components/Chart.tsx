import React, { useContext, useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { StockTypes } from "../interface/Stock/StockStateType";
import StockContext from "../store/context/StockContext";
interface Props {}

const Chart: React.FC<Props> = (props) => {
  const stockContext = useContext(StockContext);

  useEffect(() => {
    stockContext?.getChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDaysRemaining = (date: Date): number => {
    const today = new Date();
    const dueDate = new Date(date);
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining;
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className="row w-100 mx-0" style={{ marginTop: "5vh" }}>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <h2>Purchase</h2>
              <p>
                Total Checkout:{" "}
                {stockContext &&
                stockContext.stockState.chart &&
                stockContext.stockState.chart.checkoutHistory &&
                stockContext.stockState.chart.checkoutHistory.length > 0
                  ? stockContext.stockState.chart.checkoutHistory.length
                  : "0"}
                | Total Quantity Checked Out:
                {stockContext &&
                  stockContext.stockState.chart &&
                  stockContext.stockState.chart.checkoutHistory &&
                  stockContext.stockState.chart.checkoutHistory.length > 0 &&
                  stockContext.stockState.chart.checkoutHistory.reduce(
                    (total, row) => total + Number(row.quantity),
                    0
                  )}
              </p>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SrNo</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stockContext &&
                stockContext.stockState.loading &&
                stockContext.stockState.loading === StockTypes.CHART ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      <Spinner animation="border" variant="primary" />
                    </td>
                  </tr>
                ) : (
                  stockContext &&
                  stockContext.stockState.chart &&
                  stockContext.stockState.chart.checkoutHistory &&
                  stockContext.stockState.chart.checkoutHistory.length > 0 &&
                  stockContext.stockState.chart.checkoutHistory.map(
                    (row, index) => (
                      <tr key={index}>
                        <td>{row.id}</td>
                        <td>{row.itemName}</td>
                        <td>{row.itemType}</td>
                        <td>{row.quantity}</td>
                        <td>{new Date(row.datePur).toDateString()}</td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="container">
              <div>
                <h2>Current Stock </h2>
                <p>
                  Total Items in Stock:{" "}
                  {stockContext &&
                    stockContext.stockState.chart &&
                    stockContext.stockState.chart.goodItems.reduce(
                      (total, row) => total + Number(row.Stock.quantity),
                      0
                    )}
                </p>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>SrNo</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Stock Date</th>
                    <th>Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stockContext &&
                  stockContext.stockState.loading &&
                  stockContext.stockState.loading === StockTypes.CHART ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <Spinner animation="border" variant="primary" />
                      </td>
                    </tr>
                  ) : (
                    stockContext &&
                    stockContext.stockState.chart &&
                    stockContext.stockState.chart.goodItems &&
                    stockContext.stockState.chart.goodItems.length > 0 &&
                    stockContext.stockState.chart.goodItems.map(
                      (row, index) => (
                        <tr key={index}>
                          <td>{row.id}</td>
                          <td>{row.ItemName}</td>
                          <td>{row.Category.name}</td>
                          <td>{row.Stock.quantity}</td>
                          <td>{new Date(row.createdAt).toDateString()}</td>
                          <td>{new Date(row.ExpiryDate).toDateString()}</td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="row w-100 mx-0">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <h2>Waste Management </h2>
              <p>
                Total Expired:
                {stockContext &&
                  stockContext.stockState.chart &&
                  stockContext.stockState.chart.expiredItems.reduce(
                    (total, row) => total + Number(row.Stock.quantity),
                    0
                  )}
              </p>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SrNo</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stockContext &&
                stockContext.stockState.loading &&
                stockContext.stockState.loading === StockTypes.CHART ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      <Spinner animation="border" variant="primary" />
                    </td>
                  </tr>
                ) : (
                  stockContext &&
                  stockContext.stockState.chart &&
                  stockContext.stockState.chart.expiredItems &&
                  stockContext.stockState.chart.expiredItems.length > 0 &&
                  stockContext.stockState.chart.expiredItems.map(
                    (row, index) => (
                      <tr key={index}>
                        <td>{row.id}</td>
                        <td>{row.ItemName}</td>
                        <td>{row.Stock.quantity}</td>
                        <td>{new Date(row.ExpiryDate).toDateString()}</td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="container">
              <div>
                <h2>Soon to Expire </h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>SrNo</th>
                    <th>Name</th>
                    <th>Days Remaining</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stockContext &&
                  stockContext.stockState.loading &&
                  stockContext.stockState.loading === StockTypes.CHART ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        <Spinner animation="border" variant="primary" />
                      </td>
                    </tr>
                  ) : (
                    stockContext &&
                    stockContext.stockState.chart &&
                    stockContext.stockState.chart.soonToBeExpired &&
                    stockContext.stockState.chart.soonToBeExpired.length > 0 &&
                    stockContext.stockState.chart.soonToBeExpired.map(
                      (row, index) => (
                        <tr key={index}>
                          <td>{row.id}</td>
                          <td>{row.ItemName}</td>
                          <td>{getDaysRemaining(row.ExpiryDate)}</td>
                          <td>{new Date(row.createdAt).toDateString()}</td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
