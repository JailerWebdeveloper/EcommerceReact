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
  const [selectedAnime, setSelectedAnime] = useState(""); // Nuevo estado para almacenar el anime seleccionado en el select
  const [searchQuery, setSearchQuery] = useState(""); // Nuevo estado para almacenar la consulta de búsqueda
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

  const filteredData = data.filter((item) => {
    // Filtrar por anime seleccionado
    if (selectedAnime !== "" && item.data.Tematica !== selectedAnime) {
      return false;
    }
    // Filtrar por consulta de búsqueda
    if (
      searchQuery !== "" &&
      !item.data.NombreProducto.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
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
                <div className="w-full h-18 justify-between flex px-6  border-b py-5">
                  <div className="flex justify-center  md:justify-end w-full gap-2 items-center">
                    <select
                      onChange={(e) => setSelectedAnime(e.target.value)}
                      className="select select-primary md:w-[255px] w-1/2 max-w-xs"
                    >
                      <option disabled selected>
                        Selecciona tu anime favorito
                      </option>
                      <option value="">Todo</option>
                      <option value="One Piece">One Piece</option>
                      <option value="Naruto">Naruto</option>
                      <option value="Death Note">Death Note</option>
                      <option value="Attack on Titan">Attack on Titan</option>
                      <option value="Bleach">Bleach</option>
                      <option value="Fullmetal Alchemist">Fullmetal Alchemist</option>
                      <option value="Jojo's Bizarre Adventure">Jojo's Bizarre Adventure</option>
                    </select>
                    <label className="input input-bordered md:w-[355px] w-1/2 input-primary flex items-center gap-2">
                      <input
                        type="text"
                        className="grow"
                        placeholder="Buscar"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                  </div>
                </div>

                <div class="w-full h-full flex flex-col">
                  {currentItems.length !== 0 ? (
                    <div class="grid md:grid-cols-4 py-5 px-5 grid-cols-2 gap-5 grid-rows-1">
                      {currentItems.map((item) => (
                        <div key={item.id}>
                          <ProductCard
                            id={item.id}
                            Image={item.data.Imagen}
                            ProductName={item.data.NombreProducto}
                            alt={item.data.Tematica}
                            Price={item.data.Precio}
                            Discount=""
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <img
                        src={`https://backend-wolf-psi.vercel.app/imagen/easter.jpg`}
                        className="w-[250px]"
                      />
                    </>
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
