import { Fragment, useState, useEffect, useRef, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GetIDproduct } from "../Services/GetProductbyid";
import Layout from "../Layout/Layout";
import { FaCartPlus, FaShoppingCart, FaGrinStars } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { IoShirt } from "react-icons/io5";
import { Cartcontext } from "../context/cart-context";
import axios from "axios";
import SimpleSlider from "../Components/shared/SliderProduct";
import { MdLocalLaundryService } from "react-icons/md";
import { TbIroningSteam } from "react-icons/tb";
import { GiWrappedSweet } from "react-icons/gi";
import { TbBleachOff } from "react-icons/tb";

import "../css/whattsap.css";
const ProductID = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cantidad, setcantidad] = useState(1);
  const [talla, settalla] = useState("");
  const [color, setcolor] = useState("");
  const modalRef = useRef(null);

  const { Addtocart } = useContext(Cartcontext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await GetIDproduct(id);
        if (products === "NotFound") {
          Navigate("/404", { replace: true });
        }
        setData(products.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        Navigate("/Lost", { replace: true });
      }
    };

    fetchData();
  }, [id]);

  const opciones = data ? data.TallasColores : null;

  const handlesend = () => {
    const producto = data;
    Addtocart(producto, talla, color, cantidad, id);
    modalRef.current.click();
  };

  const seleccionartalla = (value) => {
    settalla(value);
  };

  const seleccionarcolor = (value) => {
    setcolor(value);
  };

  const añadir = () => {
    setcantidad(cantidad + 1);
  };

  const disminuir = () => {
    setcantidad(cantidad - 1);
  };

  const modificar = () => {
    const input = document.getElementById("total");
    const newCantidad = parseInt(input.value, 10);
    setcantidad((prevCantidad) => Math.max(prevCantidad, newCantidad));
  };
  const handleCompraunica = async () => {
    const dataform = [
      {
        NombreProducto: data.NombreProducto,
        Cantidad: cantidad,
        Talla: talla,
        Material: data.Material,
        Color: color,
        Subtotal: data.Precio * cantidad,
      },
    ];
    const requestBody = { Productos: dataform, Total: data.Precio };
    try {
      const response = await axios.post(
        `https://backend-wolf.vercel.app/Creacion/factura`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data) {
        throw new Error("Failed to create factura");
      }
      const data = response.data;
      const facturaLink = data.whatsappLink;
      window.open(facturaLink, "_blank");
    } catch (error) {
      console.error("Error al intentar comprar:", error);
    }
  };

  return (
    <Fragment>
      {isLoading && !data ? (
        <div className="w-screen h-screen flex justify-center flex-col gap-2 items-center">
          <img className=" w-36 my-2 mx-auto" src="/Logo.webp" alt="logo" />

          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <Layout>
          <div className="w-full min-h-screen items-center flex md:flex-row py-4  flex-col ">
            <div className="h-full w-full self-start   md:w-1/2  md:px-10 p-2 flex ">
              <SimpleSlider Imagenes={data.Imagen} />
            </div>

            <div className="h-full md:w-1/2 w-full   px-4 justify-start items-start flex flex-col ">
              <p className="text-gray-400 capitalize antialiased font-bold ml-2">
                {" "}
                {data.Tematica}
              </p>
              <h1 className="Capitalize truncate ml-2 text-xl md:w-4/5 w-full font-bold text-black">
                {data.NombreProducto}
              </h1>
              <p className="truncate w-full ml-2 text-gray-500 font-semibold">
                BlackWolf | Material : {data.Material}
              </p>
              <p className="truncate md:w-4/5 w-full ml-2 my-1  font-semibold text-2xl uppercase">
                ${data.Precio}
              </p>

              <div className="divider w-full md:w-4/5" />
              <div className="md:w-4/5 w-full ">
                <p className="text-gray-500 ml-2  -mt-2 antialiased tracking-wide font-semibold text-sm mb-1 ">
                  Color
                </p>
                <div className="flex items-center gap-2 ml-2 w-full flex-wrap">
                  {opciones.map((valor) => (
                    <div
                      key={valor.Color}
                      className={` ${valor.Color ? "" : "hidden"}`}
                    >
                      <button
                        key={valor.index}
                        onClick={() => seleccionarcolor(valor.Color)}
                        className={`btn rounded-none w-30 hover:ring transition-all ${
                          valor.Color === color
                            ? "bg-black text-white border-none"
                            : "text-black border-2 border-gray-400 "
                        } `}
                      >
                        {valor.Color}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 ml-2 mt-3 antialiased tracking-wide font-semibold text-sm mb-1  ">
                  Talla
                </p>

                <div className="flex items-center gap-2  ml-3 w-full flex-wrap">
                  {opciones.map((valor, index) => (
                    <button
                      key={index}
                      onClick={() => seleccionartalla(valor.Talla)}
                      className={`btn rounded-none w-14 lg:w-16 hover:ring transition-all ${
                        valor.Talla === talla
                          ? "bg-black text-white border-none"
                          : "text-black border-2 border-gray-400 "
                      } `}
                    >
                      {valor.Talla}
                    </button>
                  ))}
                  {/*<a href="#tallas" className="text-gray-500 text-sm ml-1 lg:ml-32 mt-2 link  flex items-center gap-2">
                    <IoShirt />
                    Encuentra tu talla
                  </a>*/}
                </div>
                <div className="join col-span-1 rounded-none ml-3 lg:ml-2 mt-4 ">
                  <button
                    className={`btn  join-item ${
                      cantidad === 0 ? "btn-disabled" : ""
                    }`}
                    onClick={disminuir}
                  >
                    -
                  </button>
                  <input
                    id="total"
                    type="number"
                    value={cantidad}
                    onChange={modificar}
                    className="btn join-item"
                  />
                  <button className="btn  join-item" onClick={añadir}>
                    +
                  </button>
                </div>
                <div className="divider"></div>
                <div
                  id="añadircarrito"
                  className="grid md:grid-cols-1 grid-cols-1 w-full place-content-center place-items-center  gap-5"
                >
                  <button
                    className={`btn btn-primary w-full rounded-none col-span-1 ${
                      talla == "" || color == "" || cantidad == 0
                        ? "btn-disabled"
                        : "btn-primary"
                    }  `}
                    form="añadircarrito"
                    onClick={handlesend}
                  >
                    <FaCartPlus className="h-6 w-6 text-white " />
                    Añadir al carrito
                  </button>
                  <button
                    onClick={handleCompraunica}
                    className={`btn  w-full rounded-none flex  items-center  justify-center font-semibold Capitalize ${
                      talla == "" || color == "" || cantidad == 0
                        ? "btn-disabled"
                        : "text-green-500"
                    } `}
                  >
                    <RiWhatsappFill className="h-6 w-6" />
                    Comprar
                  </button>
                  <a
                    ref={modalRef}
                    href="#my_modal_8"
                    className="btn hidden absolute  "
                  >
                    open modal
                  </a>

                  <dialog className="modal  " id="my_modal_8">
                    <div className="modal-box w-full gap-2 flex flex-col justify-center">
                      <svg
                        className="w-10 h-10 self-center text-blue-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <h3 className="font-bold self-center  text-lg">
                        Producto Añadido!
                      </h3>
                      <p className="text-body text-gray-500 font-semibold ">
                        Detalles
                      </p>
                      <div className="border-b flex w-full justify-between">
                        <p className="text-body text-gray-500 font-semibold ">
                          Producto
                        </p>
                        <p className=" text-black uppercase tracking-tight font-semibold">
                          {data.NombreProducto}
                        </p>
                      </div>
                      <div className="border-b flex w-full justify-between">
                        <p className="text-body text-gray-500 font-semibold ">
                          Precio
                        </p>
                        <p className=" text-black uppercase tracking-tight font-semibold">
                          {" "}
                          ${data.Precio}
                        </p>
                      </div>
                      <div className="border-b flex w-full justify-between">
                        <p className="text-body text-gray-500 font-semibold ">
                          Cantidad
                        </p>
                        <p className=" text-black uppercase tracking-tight font-semibold">
                          {" "}
                          {cantidad}
                        </p>
                      </div>
                      <div className="border-b flex w-full justify-between">
                        <p className="text-body text-gray-500 font-semibold ">
                          Talla
                        </p>
                        <p className=" text-black uppercase tracking-tight font-semibold">
                          {" "}
                          {talla}
                        </p>
                      </div>
                      <div className="border-b flex w-full justify-between">
                        <p className="text-body text-gray-500 font-semibold ">
                          Color
                        </p>
                        <p className=" text-black uppercase tracking-tight font-semibold">
                          {" "}
                          {color}
                        </p>
                      </div>

                      <div className="modal-action flex justify-between">
                        <a
                          href={`/Producto/${id}`}
                          className="btn bg-green-300 text-black"
                        >
                          <FaGrinStars className="w-6 text-white" />
                          Seguir comprando
                        </a>

                        <a href="/Compras" className="btn bg-black text-white">
                          <FaShoppingCart className="h-6 w-6 text-white " />
                          Ir al carrito
                        </a>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
              <div
                id="collapse"
                className=" flex flex-col gap-2 mt-2 w-full lg:w-4/5 rounded-none"
              >
                <div className="collapse rounded-none   border-b collapse-arrow ">
                  <input type="radio" name="my-accordion-2" defaultChecked />
                  <div className="collapse-title capitalize text-xl font-medium">
                    Detalle del producto
                  </div>
                  <div className="collapse-content">
                    <p className=" w-full max-h-[50px] overflow-y-auto">
                      {data.Descripcion}
                    </p>
                  </div>
                </div>
                <div className="collapse  rounded-none border-b collapse-arrow ">
                  <input type="radio" name="my-accordion-2" />
                  <div
                    id="tallas"
                    className="collapse-title capitalize text-xl font-medium"
                  >
                    Nuestras tallas
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto">
                      <table className="table text-center">
                        {/* head */}
                        <thead>
                          <tr>
                            <th>Talla cm</th>
                            <th>S</th>
                            <th>M</th>
                            <th>L</th>
                            <th>XL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* row 1 */}
                          <tr className="bg-base-200">
                            <th>Hombro</th>
                            <td>46</td>
                            <td>48</td>
                            <td>49</td>
                            <td>50</td>
                          </tr>
                          {/* row 2 */}
                          <tr>
                            <th>Ancho</th>
                            <td>48</td>
                            <td>50</td>
                            <td>52</td>
                            <td>54</td>
                          </tr>
                          {/* row 3 */}
                          <tr>
                            <th>Manga</th>
                            <td>17</td>
                            <td>18</td>
                            <td>20</td>
                            <td>21</td>
                          </tr>
                          <tr>
                            <th>Largo</th>
                            <td>64</td>
                            <td>68</td>
                            <td>70</td>
                            <td>72</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="collapse rounded-none border-b collapse-arrow ">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title capitalize text-xl font-medium">
                    Composicion y cuidados
                  </div>
                  <div className="collapse-content">
                    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                      <p className="flex items-center w-full text-sm max-w-sm gap-2">
                        <MdLocalLaundryService className="h-6 w-6" />
                        Usa lavadora en ciclo delicado y agua fria
                      </p>

                      <p className="flex items-center w-full text-sm max-w-sm gap-2">
                        <svg
                          className="w-6 h-6 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlSpace="preserve"
                          id="Icons"
                          viewBox="0 0 32 32"
                        >
                          <style>
                            {
                              ".st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
                            }
                          </style>
                          <path
                            d="m29 7-2.5 18.3c-.1 1-1 1.7-2 1.7h-17c-1 0-1.8-.7-2-1.7L3 7"
                            className="st0"
                          />
                          <path
                            d="M27.7 16.3c-.9-.7-2.3-.6-3.1.2h0c-.9.9-2.5.9-3.4 0h0c-.9-.9-2.5-.9-3.4 0h0c-.9.9-2.5.9-3.4 0h0c-.9-.9-2.5-.9-3.4 0h0c-.9.9-2.5.9-3.4 0h0c-.9-.8-2.2-.9-3.1-.2"
                            className="st0"
                          />
                        </svg>
                        No laves en seco
                      </p>
                      <p className="flex items-center w-full text-sm max-w-sm gap-2">
                        <TbBleachOff className="w-6 h-6" />
                        No uses Blanqueador
                      </p>

                      <p className="flex items-center w-full text-sm max-w-sm gap-2">
                        <TbIroningSteam className="w-8 h-8" />
                        plancha temperatura baja, no planches el estampado
                      </p>
                      <p className="flex items-center w-full text-sm max-w-sm gap-2">
                        <GiWrappedSweet className="h-6 w-6" />
                        No la retuerzas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </Fragment>
  );
};

export default ProductID;
