import React, { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../AdminResources/components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchAdminData = async () => {
  //     try {
  //       const response = await axios.get("/api/admin/adminPanel", {
  //         credentials: "include",
  //       });

  //       if (response.status) {
  //         console.log(response);
  //       } else {
  //         // Handle unauthorized access or other errors
  //         const errorData = await response.json();

  //         if (
  //           response.status === 401 &&
  //           errorData.message === "Unauthorized: Token has expired"
  //         ) {
  //           // Token has expired, redirect to login
  //           console.error("Token has expired, redirecting to login.");
  //           navigate("/login");
  //         } else {
  //           console.error("Error fetching admin data:", response.statusText);
  //           // Redirect to login or handle as needed
  //           navigate("/");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error during admin data fetch:", error);
  //       navigate("/");
  //     }
  //   };

  //   fetchAdminData();
  // }, [navigate]);
  return (
    <div className="Admin__App">
      <div className="Admin__App__Glass">
        <Sidebar />
        <div className="admin__outlet">
          <Outlet />
          <ScrollRestoration
            getKey={(location, matches) => {
              return location.pathname;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
