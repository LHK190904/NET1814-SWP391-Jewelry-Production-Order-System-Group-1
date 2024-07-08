import Header from "../header";
import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Navbar from "../navbar";

function Layout() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
