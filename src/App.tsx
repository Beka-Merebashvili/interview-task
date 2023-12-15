import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./components/login/Login";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
      <Header />
      {isHomePage && <Login />}
      <Outlet />
    </>
  );
}

export default App;
