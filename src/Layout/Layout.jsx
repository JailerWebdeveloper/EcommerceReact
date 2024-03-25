import { Fragment } from "react";
import BarraAnuncio from "../Components/shared/BarraAnuncio";
import Navbar from "../Components/shared/Navbar";
import Footer from "../Components/shared/Footer";
import React from "react";
const Layout = ({children}) => {
  return (
    <Fragment>
      <div>
      <BarraAnuncio />
      <Navbar />
      {children}
      <Footer />
      </div>
    </Fragment>
  );
};

export default Layout;
