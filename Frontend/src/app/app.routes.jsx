import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Protected from "../features/auth/components/Protected";
import Dashboard from "../features/products/pages/Dashboard";
import CreateProduct from "../features/products/pages/CreateProduct";
import Home from "../features/products/pages/Home";
import ProductDetailed from "../features/products/pages/ProductDetailed";
import SellerProductDetailed from "../features/products/pages/SellerProductDetailed";
import Cart from "../features/cart/pages/Cart";
import AppLayout from "./AppLayout";
import PaymentSuccess from "../features/payment/pages/PaymentSuccess";

export const router = createBrowserRouter([

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/seller/dashboard",
        element: <Protected role="seller"> <Dashboard /> </Protected>
      },
      {
        path: "/seller/create",
        element: <Protected role="seller"> <CreateProduct /> </Protected>
      },
      {
        path: "/product/detail/:productId",
        element: <ProductDetailed />
      },
      {
        path: "/sellerProductVarient/:productId",
        element: <Protected role="seller"> <SellerProductDetailed /> </Protected>
      },
      {
        path: "/cart",
        element: <Protected> <Cart /> </Protected>
      },
      {
        path: "/payment-success",
        element: <Protected> <PaymentSuccess /> </Protected>
      },
      {
        path:"/order-success",
        element: <Protected> <PaymentSuccess/> </Protected>
      }
    ]
  }


]);
