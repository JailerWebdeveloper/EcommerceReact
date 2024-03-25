import { Fragment, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ProductID from "./pages/ProductID";
import Page404 from "./pages/404";
import {  CartcontextProvider } from "./context/cart-context";
function App() {

  return (
    <Fragment>
    <CartcontextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Page404/>}/>
          <Route path="/Producto/:id" element={<ProductID />} />
        </Routes>
      </BrowserRouter>
      </CartcontextProvider>
    </Fragment>
  );
}

export default App;
