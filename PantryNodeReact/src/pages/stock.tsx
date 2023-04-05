import React from "react";

import { useAppSelector,useAppDispatch } from '../hooks'
import { login } from '../redux-features/user';

const Stock = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => {
    return state.user.name
  })
  const clicked = () => {
    let payload = {
      name:"Kevin Buffardi",
      email:"kb@gmail.com",
      token:"tokengotfromapicall"
    }
    dispatch(login(payload));
  }
  //Delete lines 7-18
  return (
    <div>
      <p>To demo the redux state management.</p>
      <p>Click the button below which will send a dispatch action to store and update the state which has name, email and token value.</p>
      <button onClick={clicked}>Click Here</button>
      <p>{name}</p>
      {/* Delete lines 22-25 its just for demo purposes */}
    </div>);
};

export default Stock;
