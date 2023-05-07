import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Register from "../../interface/TransferTypes/RegisterUser";
import {
  ErrType,
  GeneralTypes,
  LoadingComponent,
} from "../../interface/User/UserStateType";
import UserContext from "../../store/context/UserContext";

interface Props {}

const SignUp: React.FC<Props> = () => {
  const userContext = useContext(UserContext);
  const [register, setRegister] = useState<Register>({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const [showAlert, setShowAlert] = useState<ErrType>("");
  const [loading, setLoading] = useState<LoadingComponent>(GeneralTypes.BLANK);

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
    userContext?.register(register);
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center w-100"
      >
        <h2 className="text-4xl font-bold mb-4">Sign Up</h2>
        {showAlert === GeneralTypes.SIGNUP && (
          <Alert variant="danger" className="w-100 mb-4">
            {userContext?.userState?.errMsg}
          </Alert>
        )}
        <Form.Group className="mb-4 w-100">
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={register.username}
            onChange={(e) =>
              setRegister({ ...register, username: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-4 w-100">
          <Form.Control
            type="email"
            placeholder="Email"
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-4 w-100">
          <Form.Control
            type="password"
            placeholder="Password"
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-4 w-100">
          <Form.Control
            type="text"
            placeholder="(xxx) xxx-xxxx"
            value={register.phone}
            onChange={(e) => {
              const stripped = e.target.value.replace(/[^0-9.]/g, "");
              if (/^\d+(\.\d{0,2})?$/.test(stripped) || stripped === "") {
                setRegister({
                  ...register,
                  phone: stripped,
                });
              }
            }}
            required
            // pattern="\d{10}"
            // minLength={10}
            // maxLength={10}
          />
        </Form.Group>
        {loading === GeneralTypes.SIGNUP ? (
          <Spinner animation="border" className="my-3" />
        ) : (
          <Button
            type="submit"
            variant="secondary"
            className="btn btn-primary rounded-lg py-2 px-4 mb-3 p-grid dash-bg"
          >
            Sign Up
          </Button>
        )}
      </Form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary">
          Login
        </Link>
      </p>
    </React.Fragment>
  );
};
export default SignUp;
