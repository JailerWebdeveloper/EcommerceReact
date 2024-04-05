import React, { useState, useContext } from "react";
import { Cartcontext } from "../../context/cart-context";

const Sidebar = () => {
  const [minPrice, setMinPrice] = useState(25000);
  const [maxPrice, setMaxPrice] = useState(100000);
  const { filter, updateFilter } = useContext(Cartcontext);

  const handlefilter = async (value) => {
    updateFilter(value);
  };

  const handlePriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  return (
    <aside className="h-full hidden md:flex flex-col p-4 gap-2 w-1/5">
      <div className="rounded-2xl border border-gray-200 flex flex-col py-8 px-5 items-center justify-start w-full h-full">
        <div className="w-full flex justify-between">
          <h1 className="font-bold uppercase text-xl">Filtros</h1>
          <svg
            class="w-6 h-6 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
            />
          </svg>
        </div>
        <div className="divider h-1 rounded-full"></div>
        <ul className="flex flex-col justify-center gap-3 w-full">
          <li className="flex justify-between btn  items-center hover:bg-slate-200 hover:cursor-pointer p-2 transition-all rounded-md">
            <button
              onClick={() =>
                handlefilter(
                  "https://backend-wolf-psi.vercel.app/Product/camisa"
                )
              }
              className="text-lg w-full antialiased"
            >
              Camisetas
            </button>
          </li>
          <li className="flex justify-between btn items-center hover:bg-slate-200 hover:cursor-pointer p-2 transition-all rounded-md">
          <button
              onClick={() =>
                handlefilter(
                  "https://backend-wolf-psi.vercel.app/Product/oversize"
                )
              }
              className="text-lg w-full antialiased"
            >
              Oversizes
            </button>
          </li>
          <li className="flex justify-between btn items-center hover:bg-slate-200 hover:cursor-pointer p-2 transition-all rounded-md">
          <button
              onClick={() =>
                handlefilter(
                  "https://backend-wolf-psi.vercel.app/Product/pantaloneta"
                )
              }
              className="text-lg w-full antialiased"
            >
              Pantalonetas
            </button>
          </li>
          <li className="flex justify-between btn items-center hover:bg-slate-200 hover:cursor-pointer p-2 transition-all rounded-md">
          <button
              onClick={() =>
                handlefilter(
                  "https://backend-wolf-psi.vercel.app/Product/buzo"
                )
              }
              className="text-lg w-full antialiased"
            >
              Buzos
            </button>
          </li>
        </ul>
        <div className="divider h-1 rounded-full"></div>


        <div className="divider h-1 "></div>
        <button
          onClick={() =>
            handlefilter("https://backend-wolf-psi.vercel.app/Productos/todos")
          }
          className="w-4/5 mx-auto btn bg-black rounded-full text-white text-center"
        >
          Quitar filtros
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
