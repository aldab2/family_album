import { Navigate, Outlet } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

const PrivateRoute = () => {
    const {userInfo} = useSelector((state)=>state.authReducer);
  return userInfo ? <Outlet></Outlet>: <Navigate to="/login" replace></Navigate>
}

export default PrivateRoute