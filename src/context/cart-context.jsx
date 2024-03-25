import React, { createContext, useState, useEffect } from "react";

export const Cartcontext = createContext(null);
export const CartcontextProvider = ({ children }) => {
  const [Cartitems, setCartitems] = useState(() => {
    // Intenta cargar el estado del carrito desde localStorage, si no hay ninguno, devuelve un array vacío.
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const Addtocart = (producto, talla, color, cantidad, id) => {
    if (talla && color && cantidad > 0) {
      const existingItemIndex = Cartitems.findIndex(
        (item) => item.id === id && item.talla === talla && item.color === color
      );

      if (existingItemIndex !== -1) {
        // Clonar el array para actualizar el estado correctamente
        const updatedCart = [...Cartitems];
        updatedCart[existingItemIndex].quantity += cantidad;
        setCartitems(updatedCart);
      } else {
        setCartitems(prevCart => [
          ...prevCart,
          {
            key: talla + "_" + color + "_" + id,
            id: id,
            quantity: cantidad,
            talla: talla,
            color: color,
            price: producto.Precio,
            nombre: producto.NombreProducto,
            imagen: producto.Imagen[0],
          }
        ]);
      }
    } else {
      console.error("Por favor selecciona color, talla y cantidad válida.");
    }
  };

  useEffect(() => {
    // Guardar el estado del carrito en localStorage cada vez que cambie
    localStorage.setItem("cartItems", JSON.stringify(Cartitems));
  }, [Cartitems]);

  const contextValue = {
    Cartitems,
    Addtocart,
  };

  return <Cartcontext.Provider value={contextValue}>{children}</Cartcontext.Provider>;
};
