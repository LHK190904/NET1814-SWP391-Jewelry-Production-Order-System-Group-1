// src/App.jsx
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
import Layout from "./components/layout";
import ProductDetails from "./pages/product-details";

function App() {
  const router = createBrowserRouter([
    {
      //cha
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
          path: "/product-details",
          element: <ProductDetails />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;