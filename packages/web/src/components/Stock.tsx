import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { StockTypes } from "../interface/Stock/StockStateType";
import AddStockType from "../interface/TransferTypes/AddStockType";
import StockContext from "../store/context/StockContext";
interface Props {}

// https://im1ages.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2848&q=80
const Stock: React.FC<Props> = (props) => {
  const stockContext = useContext(StockContext);

  useEffect(() => {
    stockContext?.getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [category, setCategory] = useState<string>("");

  const [formValues, setFormValues] = useState<AddStockType>({
    userType: "",
    itemName: "",
    category_id: "",
    quantity: "",
    ExpiryDate: new Date(),
    price: "",
    donorID: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    stockContext?.putStock(formValues);
  };

  const handleCatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    stockContext?.putCategory(category);
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className="row w-100 mx-0" style={{ height: "75vh" }}>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-4xl font-bold mb-4">Add Stock</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="userType">
                <Form.Label>Type of User</Form.Label>
                <Form.Control
                  as="select"
                  value={formValues.userType}
                  onChange={(e) =>
                    setFormValues({ ...formValues, userType: e.target.value })
                  }
                  required
                >
                  <option value="">Select user type</option>
                  <option value="anonymous">Anonymous</option>
                  <option value="donor">Donor</option>
                  <option value="pantryUser">Pantry User</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="itemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter item name"
                  value={formValues.itemName}
                  onChange={(e) =>
                    setFormValues({ ...formValues, itemName: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={formValues.category_id}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      category_id: e.target.value,
                    })
                  }
                  required
                >
                  <option value="" hidden>
                    Select category
                  </option>
                  {stockContext &&
                    stockContext?.stockState.categories &&
                    stockContext?.stockState.categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <br />
                <input
                  type="date"
                  id="date"
                  value={formValues.ExpiryDate.toISOString().substr(0, 10)}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      ExpiryDate: new Date(e.target.value),
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0"
                  value={formValues.quantity}
                  onChange={(e) => {
                    const stripped = e.target.value.replace(/[^0-9.]/g, "");
                    if (/^\d+(\.\d{0,2})?$/.test(stripped) || stripped === "") {
                      setFormValues({
                        ...formValues,
                        quantity: stripped,
                      });
                    }
                  }}
                  required
                  pattern="^\d+(\.\d{1,2})?$"
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0.0$"
                  value={formValues.price}
                  onChange={(e) => {
                    const stripped = e.target.value.replace(/[^0-9.]/g, "");
                    if (/^\d+(\.\d{0,2})?$/.test(stripped) || stripped === "") {
                      setFormValues({
                        ...formValues,
                        price: stripped,
                      });
                    }
                  }}
                  required
                  pattern="^\d+(\.\d{1,2})?$"
                />
              </Form.Group>
              {stockContext &&
              stockContext.stockState.loading &&
              stockContext.stockState.loading === StockTypes.STOCK ? (
                <Spinner animation="border" className="my-3" />
              ) : (
                <Button
                  variant="secondary"
                  type="submit"
                  className="p-grid dash-bg w-100"
                >
                  Add Stock
                </Button>
              )}
            </Form>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="container">
              <form onSubmit={handleCatSubmit} className="d-flex flex-column">
                <label htmlFor="category">
                  <h2>Add Category</h2>
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                {stockContext &&
                stockContext.stockState.loading &&
                stockContext.stockState.loading === StockTypes.CATEGORY ? (
                  <Spinner animation="border" className="my-3" />
                ) : (
                  <Button
                    variant="secondary"
                    type="submit"
                    className="p-grid dash-bg w-100"
                  >
                    Add Category
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
