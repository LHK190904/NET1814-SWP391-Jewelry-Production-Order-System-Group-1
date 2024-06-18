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
// import Saler from "./pages/saler";
import ManagerRequest from "./pages/manager/request";
import ManagerOrder from "./pages/manager/order";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import authService from "./services/authService";
// import { RequestProvider } from "./context/RequestContext";
import Designer from "./pages/designer";
import ProductionStaff from "./pages/production-staff";
import ProcessRequests from "./pages/saler/process_requests";
import ReceiveRequests from "./pages/saler/receive_requests";

const getCurrentUser = () => {
  return authService.getCurrentUser();
};

const isAuthenticated = () => {
  const user = getCurrentUser();
  return user && user.token;
};

const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.title === "ADMIN";
};

const isCustomer = () => {
  const user = getCurrentUser();
  return user && user.title === "CUSTOMER";
};

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
    // {
    //   path: "/saler",
    //   element: (
    //      <Saler />
    //     <ProtectedRoute element={<Saler />} isAllowed={isAuthenticated()} />
    //   ),
    // },
    {
      path: "/saler/receive_requests",
      element: (   
        <ProtectedRoute
          element={<ReceiveRequests />}
          isAllowed={isAuthenticated()}
        />
      ),
    },
    {
      path: "/saler/process_requests",
      element: (
        <ProtectedRoute
          element={<ProcessRequests />}
          isAllowed={isAuthenticated()}
        />
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
      path: "/designer",
      element: (
        <ProtectedRoute element={<Designer />} isAllowed={isAuthenticated()} />
      ),
    },
    {
      path: "/production-staff",
      element: (
        <ProtectedRoute
          element={<ProductionStaff />}
          isAllowed={isAuthenticated()}
        />
      ),
    },
  ]);

  return (
    <CartProvider>
      {/* <RequestProvider> */}
        <RouterProvider router={router} />
      {/* </RequestProvider> */}
    </CartProvider>
  );
}

export default App;
