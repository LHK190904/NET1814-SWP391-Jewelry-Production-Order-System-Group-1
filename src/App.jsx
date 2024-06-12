import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import About from "./pages/about";
import Designs from "./pages/designs";
import Collections from "./pages/collections";
import Blog from "./pages/blog";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Layout from "./components/Layout";
import Error from "./pages/error";
import Admin from "./pages/admin";
import ProductDetails from "./pages/product-details";
import Saler from "./pages/saler";
import ManagerRequest from "./pages/manager/request";
import ManagerOrder from "./pages/manager/order";
import { CartProvider } from "./context/CartContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/designs",
          element: <Designs />,
        },
        {
          path: "/collections",
          element: <Collections />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/product-details/:productId",
          element: <ProductDetails />,
        },
      ],
    },
    {
      path: "/error",
      element: <Error />,
    },
    {
      path: "/admin",
      element: <ProtectedRoute element={<Admin />} isAllowed={isAdmin()} />,
    },
    {
      path: "/saler",
      element: (
        <ProtectedRoute element={<Saler />} isAllowed={isAuthenticated()} />
      ),
    },
    {
      path: "/manager/request",
      element: (
        <ProtectedRoute
          element={<ManagerRequest />}
          isAllowed={isAuthenticated()}
        />
      ),
    },
    {
      path: "/manager/order",
      element: (
        <ProtectedRoute
          element={<ManagerOrder />}
          isAllowed={isAuthenticated()}
        />
      ),
    },
    {
      path: "manager/assign",
      element: <ManagerAssign />,
    },
  ]);

  return (
    <CartProvider>
      <RequestProvider>
        <RouterProvider router={router} />
      </RequestProvider>
    </CartProvider>
  );
}

export default App;
