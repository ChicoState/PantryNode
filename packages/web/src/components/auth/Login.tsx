import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Form, Button, Alert, Spinner } from "react-bootstrap";
import UserContext from "../../store/context/UserContext";
import {
  ErrType,
  GeneralTypes,
  LoadingComponent,
} from "../../interface/User/UserStateType";

interface Props {}

const Login: React.FC<Props> = () => {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<LoadingComponent>(GeneralTypes.BLANK);
  const [showAlert, setShowAlert] = useState<ErrType>(GeneralTypes.BLANK);

  const navigate = useNavigate();
  useEffect(() => {
    if (userContext && userContext?.userState.token !== "") navigate("/home");
    if (
      userContext &&
      userContext?.userState.err !== undefined &&
      userContext?.userState.err !== showAlert
    )
      setShowAlert(userContext?.userState.err);
    if (
      userContext &&
      userContext?.userState.loading !== undefined &&
      userContext?.userState.loading !== loading
    )
      setLoading(userContext?.userState.loading);
  }, [userContext, showAlert, loading, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userContext?.login(email, password);
    setPassword("");
    // Add your Auth logic here
    // history.push("/dashboard");
  };

  return (
    <React.Fragment>
      <h2 className="text-4xl font-bold mb-4">Login</h2>
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center w-100"
      >
        {showAlert === GeneralTypes.LOGIN && (
          <Alert variant="danger" className="w-100 mb-4">
            Incorrect email or password.
          </Alert>
        )}
        <Form.Group controlId="formBasicEmail" className="mb-4 w-100">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mb-4 w-100">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {loading === GeneralTypes.LOGIN ? (
          <Spinner animation="border" className="my-3" />
        ) : (
          <Button
            variant="secondary"
            type="submit"
            data-testid="loginBtn"
            className="p-grid dash-bg rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Login
          </Button>
        )}
      </Form>
      <p className="mt-4">
        Don't have an account?
        <Link
          to="/auth/signup"
          className="text-primary hover:text-secondary transition duration-300 ease-in-out"
        >
          Register
        </Link>
      </p>
    </React.Fragment>
  );
};
export default Login;
