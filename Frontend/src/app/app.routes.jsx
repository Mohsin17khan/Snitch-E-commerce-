import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Protected from "../features/auth/components/Protected";
import Dashboard from "../features/products/pages/Dashboard";
import CreateProduct from "../features/products/pages/CreateProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
   {
    path:"/seller/dashboard",
    element:  <Protected role="seller"> <Dashboard/> </Protected> 
  },
   {
    path:"/seller/create",
    element:  <Protected role="seller"> <CreateProduct/> </Protected> 
  },
  
  
]);
