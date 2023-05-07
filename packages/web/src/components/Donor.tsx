import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Form, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RegisterDonorType from "../interface/TransferTypes/RegisterDonorType";
import { GeneralTypes } from "../interface/User/UserStateType";
import UserContext from "../store/context/UserContext";
interface Props {}

const Donor: React.FC<Props> = () => {
  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<RegisterDonorType>({
    name: "",
    location: "",
    email: "",
    type: "",
    phone: "",
  });

  useEffect(() => {
    userContext?.getDonors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    userContext?.registerDonor(formValues);
    // navigate("/stock");
    // submit the category to the server or do something else with it
  };
  const handleDonate = (id: string) => {
    navigate("/stock");
    // submit the category to the server or do something else with it
  };
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className="row w-100 mx-0" style={{ height: "75vh" }}>
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h2>Add Donor</h2>
            {userContext &&
              userContext.userState.err &&
              userContext.userState.err === GeneralTypes.DONOR && (
                <Alert variant="danger">{userContext.userState.errMsg}</Alert>
              )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={formValues.name}
                  required
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="ph">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="(xxx) xxx-xxxx"
                  value={formValues.phone}
                  onChange={(e) => {
                    const stripped = e.target.value.replace(/[^0-9.]/g, "");
                    if (/^\d+(\.\d{0,2})?$/.test(stripped) || stripped === "") {
                      setFormValues({
                        ...formValues,
                        phone: stripped,
                      });
                    }
                  }}
                  required
                  pattern="\d{10}"
                  minLength={10}
                  maxLength={10}
                />
              </Form.Group>
              <Form.Group controlId="loc">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter loc"
                  value={formValues.location}
                  onChange={(e) =>
                    setFormValues({ ...formValues, location: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="userType">
                <Form.Label>Type of User</Form.Label>
                <Form.Control
                  as="select"
                  required
                  value={formValues.type}
                  onChange={(e) =>
                    setFormValues({ ...formValues, type: e.target.value })
                  }
                >
                  <option value="">Select user type</option>
                  <option value="anonymous">Anonymous</option>
                  <option value="donor">Donor</option>
                  <option value="pantryUser">Pantry User</option>
                </Form.Control>
              </Form.Group>
              {userContext &&
              userContext.userState.loading &&
              userContext.userState.loading === GeneralTypes.DONOR ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Button
                  variant="secondary"
                  type="submit"
                  className="p-grid dash-bg w-100"
                >
                  Submit
                </Button>
              )}
            </Form>
          </div>
        </div>
        <div className="col-md-8 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="container">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>SrNo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Donate</th>
                  </tr>
                </thead>
                <tbody>
                  {userContext &&
                  userContext.userState.loading &&
                  userContext.userState.loading === GeneralTypes.DONOR ? (
                    <tr>
                      <td colSpan={5} className="text-center">
                        <Spinner animation="border" variant="primary" />
                      </td>
                    </tr>
                  ) : (
                    userContext &&
                    userContext?.userState.donors &&
                    userContext?.userState.donors.map((row, index) => (
                      <tr key={index}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.location}</td>
                        <td>
                          <Button
                            variant="secondary"
                            className="p-grid dash-bg w-100"
                            onClick={() => handleDonate(row.id)}
                          >
                            Donate
                          </Button>
                        </td>
                      </tr>
                    ))
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

export default Donor;
