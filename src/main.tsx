import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {store} from "./app/store"
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Users from "./components/users/Users.tsx";
import SingleUser from "./components/singleUser/SingleUser.tsx";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App /> }>
      <Route path="users">
        <Route index element={<Users />} />
        <Route path="user/:userId" element={<SingleUser />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
 
);
