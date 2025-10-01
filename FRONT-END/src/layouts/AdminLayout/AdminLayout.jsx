import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "../../styles/layout/admlayout.scss";
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header />
      <div className="admin-main">
        <SideBar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
