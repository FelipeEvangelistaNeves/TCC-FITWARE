import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./../../styles/pages/public/public.scss";
import Footer from "./Footer";
const PublicLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
