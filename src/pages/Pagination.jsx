import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Sidebar from "../Components/shared/Sidebar";
import Layout from "../Layout/Layout";
import { Cartcontext } from "../context/cart-context";
import ProductCard from "../Components/ProductCard";

const Pagination = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { filter } = useContext(Cartcontext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(filter);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al recuperar los datos:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]); // Se ejecuta solo una vez al montar el componente

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex justify-center flex-col gap-2 items-center">
          <img className=" w-36 my-2 mx-auto" src="/Logo.webp" alt="logo" />
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <Layout>
          <div class="md:flex hidden ml-10 text-sm breadcrumbs"></div>
          <div class="bg-base overflow-y-auto w-full antialiased">
            <div class="flex flex-row relative h-full">
              <Sidebar />
              <div class="flex-1 overflow-auto h-full w-4/5">
                <div class="w-full h-full flex flex-col">
                  {currentItems.length !== 0 ? (
                    <div class="grid md:grid-cols-4 py-5 px-5 grid-cols-2 gap-5 grid-rows-1">
                      {currentItems.map((item) => (
                        <div key={item.id}>
                          <ProductCard
                            id={item.id}
                            Image={item.Imagen}
                            ProductName={item.NombreProducto}
                            alt={item.Tematica}
                            Price={item.Precio}
                            Discount=""
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>ta vacio</>
                  )}

                  {/* Botones de paginación */}

                  <div className="join mx-auto">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="join-item btn"
                    >
                      «
                    </button>
                    <button className="join-item btn">{currentPage}</button>
                    <button
                      onClick={nextPage}
                      disabled={indexOfLastItem >= data.length}
                      className="join-item btn"
                    >
                      »
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Pagination;
