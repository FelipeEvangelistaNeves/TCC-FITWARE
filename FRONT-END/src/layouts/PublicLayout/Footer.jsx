import React from "react";
import "../../styles/pages/public/public.scss";

const Footer = () => {
  return (
    <footer className="public-footer text-center py-4">
      <p>© {new Date().getFullYear()} FitWare. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
