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
import Error from "./pages/error";
import Admin from "./pages/admin";
import ProductDetails from "./pages/product-details";
import Saler from "./pages/saler";
import ManagerRequest from "./pages/manager/request";
import ManagerOrder from "./pages/manager/order";
import ManagerAssign from "./pages/manager/assign";
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
      element: <Admin />,
    },
    {
      path: "/saler",
      element: <Saler />,
    },
    {
      path: "/manager/request",
      element: <ManagerRequest />,
    },
    {
      path: "/manager/order",
      element: <ManagerOrder />,
    },
    {
      path: "manager/assign",
      element: <ManagerAssign />,
    },
  ]);
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
