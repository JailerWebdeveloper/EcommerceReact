import { Fragment, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ProductID from "./pages/ProductID";
import Page404 from "./pages/404";
import {  CartcontextProvider } from "./context/cart-context";
import Carritovista from "./pages/Carritovista";
import Pagination from "./pages/Pagination";
import Tallas from "./pages/Tallas";
function App() {

  return (
    <Fragment>
    <CartcontextProvider>
      <BrowserRouter basename="">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Page404/>}/>
          <Route path="/Producto/:id" element={<ProductID />} />
          <Route path="/Compras" element={<Carritovista />} />
          <Route path="/Search" element={<Pagination />} />
          <Route path="/Tallas" element={<Tallas />} />


        </Routes>
      </BrowserRouter>
      </CartcontextProvider>
    </Fragment>
  );
}

export default App;
