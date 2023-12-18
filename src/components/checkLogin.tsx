import { Outlet } from "react-router-dom";
import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";



const CheckLogin = () => {
  const user = useSelector((state: RootState) => state.auth.user);
 
  return (
     <>
       {user == null ? <Navigate to={"/"} /> : <Outlet />}
     </>
  );
};

export default CheckLogin;
