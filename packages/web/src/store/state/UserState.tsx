import React, { useCallback, useReducer } from "react";

import UserReducer, { initState } from "../reducer/UserReducer";

import Register from "../../interface/TransferTypes/RegisterUser";
import { GeneralTypes } from "../../interface/User/UserStateType";
import {
  donorSuccessDispatcher,
  errDispatcher,
  loginSuccessDispatcher,
  signUpSuccessDispatcher,
  toggleLoading,
} from "../ActionCreators";
import UserCtx from "../context/UserContext";
import RegisterDonorType from "../../interface/TransferTypes/RegisterDonorType";
import { baseUrl } from "../Constants";

interface Props {
  children: React.ReactNode;
}

const UserState: React.FC<Props> = (props: Props) => {
  const [userState, dispatch] = useReducer(UserReducer, initState);

  const autoLogin = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token && !userState.token)
      // Token exists in localStorage
      dispatch(
        loginSuccessDispatcher({
          err: "",
          errMsg: "",
          username: localStorage.getItem("username") || "",
          token: token,
          userId: localStorage.getItem("userId") || "",
          loading: GeneralTypes.BLANK,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDonors = useCallback(async () => {
    dispatch(toggleLoading(GeneralTypes.DONOR));
    const token = localStorage.getItem("token");
    fetch(baseUrl + "/sale/donor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch donors");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(donorSuccessDispatcher(data.donors));
      })
      .catch((error) => {
        dispatch(donorSuccessDispatcher([]));
      });
  }, []);

  const login = useCallback(async (username: string, pwd: string) => {
    dispatch(toggleLoading(GeneralTypes.LOGIN));
    fetch(baseUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: pwd,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login Successful: ", data);
        dispatch(
          signUpSuccessDispatcher({
            err: "",
            errMsg: "",
            username: data.username,
            token: data.token,
            userId: data.id,
            loading: GeneralTypes.BLANK,
          })
        );
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.id);
      })
      .catch((error) => {
        dispatch(
          errDispatcher(GeneralTypes.LOGIN, "Invalid username or password")
        );
      });
  }, []);

  const registerDonor = useCallback(
    async (d: RegisterDonorType) => {
      dispatch(toggleLoading(GeneralTypes.DONOR));
      const token = localStorage.getItem("token");

      fetch(baseUrl + "/sale/donor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...d }),
      })
        .then((response) => response.json())
        .then((data) => getDonors())
        .catch((error) =>
          dispatch(errDispatcher(GeneralTypes.DONOR, "Invalid data"))
        );
    },
    [getDonors]
  );

  const logout = useCallback(() => {
    fetch(baseUrl + "/user/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error.message);
      });

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  }, []);

  const register = useCallback(async (register: Register) => {
    dispatch(toggleLoading(GeneralTypes.SIGNUP));
    fetch(baseUrl + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: register.username,
        email: register.email,
        password: register.password,
        phone: register.phone,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Registration failed");
        }
      })
      .then((data) => {
        dispatch(
          signUpSuccessDispatcher({
            err: "",
            errMsg: "",
            username: register.username,
            token: data.token,
            userId: data.id,
            loading: GeneralTypes.BLANK,
          })
        );
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", register.username);
        localStorage.setItem("userId", data.id);
      })
      .catch((error) => {
        dispatch(errDispatcher(GeneralTypes.SIGNUP, "Invalid data"));
      });
  }, []);

  return (
    <UserCtx.Provider
      value={{
        userState: userState,
        login: login,
        logout: logout,
        register: register,
        autoLogin: autoLogin,
        registerDonor: registerDonor,
        getDonors: getDonors,
      }}
    >
      {props.children}
    </UserCtx.Provider>
  );
};

export default UserState;
