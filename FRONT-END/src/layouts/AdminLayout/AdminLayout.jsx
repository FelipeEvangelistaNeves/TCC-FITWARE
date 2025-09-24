import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "../../styles/layout/admhead.scss";
const AdminLayout = () => {
  return (
    <div className="admin-layout-fixed">
      <Header />
      <div className="admin-main-fixed">
        <SideBar />
        <main className="admin-content-scrollable">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
