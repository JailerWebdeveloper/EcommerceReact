import { Fragment } from "react";
import { BiDialpad } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { SlSocialInstagram } from "react-icons/sl";
import Shopcart from "../Shopcart";
const Navbar = () => {
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
                <BiDialpad className="w-full h-full" />
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
                  src="/Logo.webp"
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
                      <BiDialpad className="w-5" />
                      Categorias
                    </summary>
                    <ul className="p-2">
                      <li>
                        <a>Anime</a>
                      </li>
                      <li>
                        <a>Urbano</a>
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
                <li>
                  <a href="Tallas" >
                    Nuestras tallas
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <a
            href="/"
            className="md:w-42  flex justify-center items-center hover:bg-slate-300 rounded-xl p-2 transition-all hover:cursor-pointer"
          >
            <img src="/Logo.webp" className="w-40" alt="Blackwolf Logo" />
          </a>
          <ul className="menu menu-horizontal md:flex hidden px-1 z-10">
            <li>
              <a href="Search">Tienda</a>
            </li>
            <li>
              <details>
                <summary>Categorias</summary>
                <ul className="p-2">
                  <li>
                    <a>Anime</a>
                  </li>
                  <li>
                    <a>Urbano</a>
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
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
