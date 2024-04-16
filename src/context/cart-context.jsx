import  { createContext, useState, useEffect } from "react";

export const Cartcontext = createContext(null);
export const CartcontextProvider = ({ children }) => {
  const [Cartitems, setCartitems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem("Filter");
    return storedFilter
      ? storedFilter
      : "https://backend-wolf.vercel.app/Productos/todos";
  });

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    localStorage.setItem("Filter", filter);
  }, [filter]);
  const Addtocart = (producto, talla, color, cantidad, id) => {
    if (talla && color && cantidad > 0) {
      const existingItemIndex = Cartitems.findIndex(
        (item) => item.id === id && item.talla === talla && item.color === color
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...Cartitems];
        updatedCart[existingItemIndex].quantity += cantidad;
        setCartitems(updatedCart);
      } else {
        setCartitems((prevCart) => [
          ...prevCart,
          {
            key: talla + "_" + color + "_" + id,
            id: id,
            quantity: cantidad,
            talla: talla,
            color: color,
            Material: producto.Material,
            price: producto.Precio,
            nombre: producto.NombreProducto,
            imagen: producto.Imagen[0],
          },
        ]);
      }
    } else {
      console.error("Por favor selecciona color, talla y cantidad válida.");
    }
  };

  const RemoveFromCart = (key) => {
    const updatedCart = Cartitems.filter((item) => item.key !== key);
    setCartitems(updatedCart);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(Cartitems));
  }, [Cartitems]);

  const contextValue = {
    Cartitems,
    Addtocart,
    RemoveFromCart,
    filter,
    updateFilter,
  };

  return (
    <Cartcontext.Provider value={contextValue}>{children}</Cartcontext.Provider>
  );
};
