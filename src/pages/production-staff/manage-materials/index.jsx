import { Link } from "react-router-dom";
import LogoutButton from "../../../components/logoutButton";

function ManageMaterial() {
  return (
    <>
      <div className="mr-10">
        <LogoutButton />
      </div>
      <div className="mb-4">
        <Link
          className={`mr-4 ${
            location.pathname === "/production-staff/process-orders"
              ? "underline font-bold"
              : ""
          }`}
          to="/production-staff/process-orders"
        >
          Process orders
        </Link>
        <Link
          className={`${
            location.pathname === "/production-staff/manage-materials"
              ? "underline font-bold"
              : ""
          }`}
          to="/production-staff/manage-materials"
        >
          Manage materials
        </Link>
      </div>
    </>
  );
}

export default ManageMaterial;
