import React, { useContext, useEffect, useState } from "react";

import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { StockTypes } from "../interface/Stock/StockStateType";
import CheckoutType from "../interface/TransferTypes/CheckoutType";
import StockContext from "../store/context/StockContext";

interface Props {}

const Checkout: React.FC<Props> = () => {
  const stockContext = useContext(StockContext);
  const [formValues, setFormValues] = useState<CheckoutType>({
    itemId: "",
    itemQuantityAval: "",
    quantityX: "",
    cllgId: "",
  });

  useEffect(() => {
    stockContext?.getChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    stockContext?.checkoutItem(formValues);
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className="row w-100 mx-0" style={{ height: "75vh" }}>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center w-50">
            <h2 className="text-4xl font-bold mb-4">Checkout</h2>
            {Number(formValues.itemQuantityAval) <
              Number(formValues.quantityX) && (
              <Alert variant="danger">
                Quantity entered is greater than available quantity
              </Alert>
            )}
            <Form
              onSubmit={handleSubmit}
              className="d-flex flex-column align-items-center w-100"
            >
              <Form.Group
                controlId="itemId"
                className="d-flex flex-column align-items-start w-100"
              >
                <Form.Label>
                  {stockContext &&
                  stockContext.stockState.loading &&
                  stockContext.stockState.loading === StockTypes.CHART ? (
                    <Spinner animation="border" variant="primary" />
                  ) : (
                    "Item"
                  )}
                </Form.Label>
                <Form.Control
                  as="select"
                  value={formValues.itemId}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      itemId: e.target.value,
                      itemQuantityAval: "2",
                    })
                  }
                  required
                >
                  <option value="" hidden>
                    Select Item
                  </option>
                  {stockContext &&
                    stockContext.stockState.chart &&
                    stockContext.stockState.chart.goodItems.map(
                      (row, index) => (
                        <option
                          key={row.id}
                          value={row.id}
                          data-quantity={row.Stock.quantity}
                        >
                          {`${row.ItemName}: ${row.Stock.quantity}`}
                        </option>
                      )
                    )}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="quantity" className="w-100">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0"
                  value={formValues.quantityX}
                  onChange={(e) => {
                    const stripped = e.target.value.replace(/[^0-9.]/g, "");
                    if (/^\d+(\.\d{0,2})?$/.test(stripped) || stripped === "") {
                      setFormValues({
                        ...formValues,
                        quantityX: stripped,
                      });
                    }
                  }}
                  required
                  pattern="^\d+(\.\d{1,2})?$"
                />
              </Form.Group>
              <Form.Group controlId="cllgId" className="w-100">
                <Form.Label>Cllg Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXXXXXXX"
                  value={formValues.cllgId}
                  onChange={(e) => {
                    const stripped = e.target.value.replace(/[^0-9.]/g, "");
                    if (/^\d+(\.\d{0,2})?$/.test(stripped) || stripped === "") {
                      setFormValues({
                        ...formValues,
                        cllgId: stripped,
                      });
                    }
                  }}
                  required
                  pattern="\d{9}"
                  minLength={9}
                  maxLength={9}
                />
              </Form.Group>
              {stockContext &&
              stockContext.stockState.loading &&
              stockContext.stockState.loading === StockTypes.CHECKOUT ? (
                <Spinner animation="border" className="my-3" />
              ) : (
                <Button
                  variant="secondary"
                  type="submit"
                  className="rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out w-100 p-grid dash-bg"
                >
                  checkout
                </Button>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
