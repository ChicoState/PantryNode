import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Table } from "react-bootstrap";
import { StockTypes } from "../interface/Stock/StockStateType";
import StockContext from "../store/context/StockContext";
interface Props {}

const Home: React.FC<Props> = (props) => {
  const stockContext = useContext(StockContext);
  const navigate = useNavigate();
  useEffect(() => {
    stockContext?.getChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className="row w-100 mx-0" style={{ height: "75vh" }}>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Button
              variant="secondary"
              className="mb-3 m-3 btn-custom p-grid dash-bg"
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Checkout
            </Button>
            <Button
              variant="secondary"
              className="mb-3 m-3 btn-custom p-grid dash-bg"
              onClick={() => {
                navigate("/donor");
              }}
            >
              Donor
            </Button>
            <Button
              variant="secondary"
              className="mb-3 m-3 btn-custom p-grid dash-bg"
              onClick={() => {
                navigate("/");
              }}
            >
              Expiry Check
            </Button>
            <Button
              variant="secondary"
              className="mb-3 m-3 btn-custom p-grid dash-bg"
              onClick={() => {
                navigate("/sale");
              }}
            >
              Sale Report
            </Button>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="container">
              <h2>Feed</h2>
              <Table striped bordered className="w-100">
                <thead>
                  <tr>
                    <th>SrNo</th>
                    <th>Feed</th>
                  </tr>
                </thead>
                <tbody>
                  {stockContext &&
                  stockContext.stockState.loading &&
                  stockContext.stockState.loading === StockTypes.CHART ? (
                    <tr>
                      <td
                        colSpan={2}
                        data-testid="spinner"
                        className="text-center"
                      >
                        <Spinner animation="border" variant="secondary" />
                      </td>
                    </tr>
                  ) : (
                    stockContext &&
                    stockContext.stockState.chart &&
                    stockContext.stockState.chart.soonToBeExpired.map(
                      (row, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {<strong>{row.ItemName}</strong>} getting expired on{" "}
                            {
                              <strong>
                                {new Date(row.ExpiryDate).toDateString()}
                              </strong>
                            }
                          </td>
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

export default Home;
