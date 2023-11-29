import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from '../store';

const PrivateRoute = () => {
    const {userInfo} = useSelector((state: RootState)=>state.authReducer);
  return userInfo ? <Outlet></Outlet>: <Navigate to="/login" replace></Navigate>
}

export default PrivateRoute