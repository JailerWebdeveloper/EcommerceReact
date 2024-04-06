import { Fragment } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { SlSocialInstagram } from "react-icons/sl";
import Shopcart from "../Shopcart";
import React, { useState, useContext } from "react";
import { Cartcontext } from "../../context/cart-context";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaShirt } from "react-icons/fa6";

const Navbar = () => {
  const { filter, updateFilter } = useContext(Cartcontext);
  const navigate = useNavigate(); // Usa useNavigate para obtener la función de redirección
  const handlefilter = async (value) => {
    updateFilter(value);
    navigate("/Search");
  };
  return (
    <Fragment>
      <nav className="w-full flex md:justify-between z-20 md:gap-10 justify-center items-center md:px-20 px-2 py-2">
        <div className="flex gap-5 items-center z-30">
          <div className="drawer z-10 w-1/5 md:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost w-16 drawer-button"
              >
                <IoMdMenu className="w-full h-full" />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              <ul className="menu p-4 w-80 min-h-full py-10 px-2 bg-base-200 text-base content">
                <img
                  className=" w-36 my-2 mx-auto"
                  src="https://backend-wolf.vercel.app/imagen/Logo.webp"
                  alt="logo"
                />
                <div className="divider "></div>
                <li className="flex">
                  <a href="Search">
                    <FiSearch className="w-5 z-30" /> Buscar
                  </a>
                </li>
                <li>
                  <details>
                    <summary>
                      <IoMdMenu className="w-5" />
                      Categorias
                    </summary>
                    <ul className="p-2">
                      <li>
                        <details >
                          <summary>Camisetas</summary>
                          <ul>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/Product/camisa"
                                  )
                                }
                              >
                                Todas
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/camisa/Anime"
                                  )
                                }
                              >
                                Anime
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/camisa/Urbano"
                                  )
                                }
                              >
                                Aesthetic
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/camisa/Deportivo"
                                  )
                                }
                              >
                                Deportivas
                              </button>
                            </li>
                          </ul>
                        </details>
                      </li>
                      <li>
                        <details>
                          <summary>Buzos</summary>
                          <ul>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/Product/buzo"
                                  )
                                }
                              >
                                Todos
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/camisa/Anime"
                                  )
                                }
                              >
                                Anime
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/camisa/Urbano"
                                  )
                                }
                              >
                                Aesthetic
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/camisa/Deportivo"
                                  )
                                }
                              >
                                Deportivos
                              </button>
                            </li>
                          </ul>
                        </details>
                      </li>
                      <li>
                        <details>
                          <summary>Oversizes</summary>
                          <ul>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/Product/oversize"
                                  )
                                }
                              >
                                Todos
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/oversize/Anime"
                                  )
                                }
                              >
                                Anime
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/oversize/Urbano"
                                  )
                                }
                              >
                                Aesthetic
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/oversize/Deportivo"
                                  )
                                }
                              >
                                Deportivos
                              </button>
                            </li>
                          </ul>
                        </details>
                      </li>
                      <li>
                        <details>
                          <summary>Pantalonetas</summary>
                          <ul>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/Product/pantaloneta"
                                  )
                                }
                              >
                                Todas
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/pantaloneta/Anime"
                                  )
                                }
                              >
                                Anime
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full"
                                onClick={() =>
                                  handlefilter(
                                    "https://backend-wolf.vercel.app/produ/pantaloneta/Urbano"
                                  )
                                }
                              >
                                Aesthetic
                              </button>
                            </li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </li>
                <li className="flex">
                  <a href="https://www.instagram.com/blackwolf_col/">
                    <SlSocialInstagram className="w-5" />
                    Redes Sociales
                  </a>
                </li>
                <li className="flex">
                  <a href="https://www.instagram.com/blackwolf_col/">
                    <FaWhatsapp className="w-5" />
                    Contactanos!
                  </a>
                </li>
                <li className="flex">
                  <a href="Tallas">
                    <FaShirt className="w-5" />
                    Nuestras Tallas!
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <a
            href="/"
            className="md:w-42  flex justify-center items-center hover:bg-slate-300 rounded-xl p-2 transition-all hover:cursor-pointer"
          >
            <img
              src="https://backend-wolf.vercel.app/imagen/Logo.webp"
              className="w-40"
              alt="Blackwolf Logo"
            />
          </a>
          <ul className="menu menu-horizontal md:flex hidden px-1 z-10">
            <li>
              <a href="/Search">Tienda</a>
            </li>
            <li>
              <details>
                <summary>Categorias</summary>
                <ul className="p-2">
                  <li>
                    <ul className="menu xl:menu-horizontal lg:min-w-max  rounded-box">
                      <li>
                        <button
                          className="w-full"
                          onClick={() =>
                            handlefilter(
                              "https://backend-wolf.vercel.app/Product/camisa"
                            )
                          }
                        >
                          Camisetas
                        </button>
                        <ul>
                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/camisa/Urbano"
                                )
                              }
                            >
                              Urbano
                            </button>
                          </li>
                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/camisa/Anime"
                                )
                              }
                            >
                              Anime
                            </button>{" "}
                          </li>
                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/camisa/Deportivo"
                                )
                              }
                            >
                              Deportivas
                            </button>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <button
                          className="w-full"
                          onClick={() =>
                            handlefilter(
                              "https://backend-wolf.vercel.app/Product/buzo"
                            )
                          }
                        >
                          Buzos
                        </button>
                        <ul>
                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/buzo/Urbano"
                                )
                              }
                            >
                              Urbano
                            </button>
                          </li>
                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/buzo/Anime"
                                )
                              }
                            >
                              Anime
                            </button>
                          </li>

                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/buzo/Deportivo"
                                )
                              }
                            >
                              Deportivo
                            </button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <button
                          className="w-full"
                          onClick={() =>
                            handlefilter(
                              "https://backend-wolf.vercel.app/Product/oversize"
                            )
                          }
                        >
                          Oversizes
                        </button>
                        <ul>
                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/oversize/Urbano"
                                )
                              }
                            >
                              Urbano
                            </button>
                          </li>
                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/oversize/Anime"
                                )
                              }
                            >
                              Anime
                            </button>
                          </li>

                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/oversize/Deportivo"
                                )
                              }
                            >
                              Deportivo
                            </button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <button
                          className="w-full"
                          onClick={() =>
                            handlefilter(
                              "https://backend-wolf.vercel.app/Product/pantaloneta"
                            )
                          }
                        >
                          Pantalonetas
                        </button>
                        <ul>
                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/pantaloneta/Urbano"
                                )
                              }
                            >
                              Urbano
                            </button>
                          </li>
                          <li>
                            <button
                              className="w-full"
                              onClick={() =>
                                handlefilter(
                                  "https://backend-wolf.vercel.app/produ/pantaloneta/Anime"
                                )
                              }
                            >
                              Anime
                            </button>
                          </li>

            
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a
                href="https://www.instagram.com/blackwolf_col/"
                target="_blank"
              >
                Visitanos en redes sociales
              </a>
            </li>
            <li>
              <a href="Tallas" target="_blank">
                Nuestras tallas
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <Shopcart />
          <a
            href="https://api.whatsapp.com/send?phone=573004327856&text=😎Me%20interesa%20ver%20la%20mercancía"
            target="_blank"
            className="btn md:flex items-center hidden btn-success rounded-full text-white"
          >
            <FaWhatsapp className="w-[25px]" /> Contactanos!
          </a>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
