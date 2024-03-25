import React, { Fragment, useState, useEffect, useRef, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GetIDproduct } from "../Services/GetProductbyid";
import Layout from "../Layout/Layout";
import { FaCartPlus, FaShoppingCart, FaGrinStars } from "react-icons/fa";
import { Cartcontext } from "../context/cart-context";
import SimpleSlider from "../Components/shared/SliderProduct";

const ProductID = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cantidad, setcantidad] = useState(1);
  const [talla, settalla] = useState("");
  const [color, setcolor] = useState("");
  const modalRef = useRef(null);

  const {Addtocart,Cartitems} = useContext(Cartcontext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await GetIDproduct(id);
        if (products === "NotFound") {
          Navigate("/404", { replace: true });
        }
        setData(products.producto);
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
    const producto= data
    Addtocart(producto,talla,color,cantidad,id)
    console.log(Cartitems)
//    modalRef.current.click();
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

  return (
    <Fragment>
      {isLoading && !data ? (
        <div className="w-screen h-screen flex justify-center flex-col gap-2 items-center">
          <img className=" w-36 my-2 mx-auto" src="/Logo.webp" alt="logo" />

          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <Layout>
          <div className="w-full min-h-[80vh] items-center flex md:flex-row py-4  flex-col ">
            <div className="h-full w-full md:w-1/2  md:px-10 p-2 flex ">
              <SimpleSlider Imagenes={data.Imagen}/>
            </div>

            <div className="h-full md:w-1/2 w-full  gap-2 px-4 justify-start items-start flex flex-col ">
              <h1 className="uppercase truncate text-5xl md:w-4/5 w-full font-extrabold text-black">
                {data.NombreProducto}
              </h1>
              <p className="truncate w-full ml-2 text-gray-500 font-semibold">
                BlackWolf | Tematica: {data.Tematica} | Material:{" "}
                {data.Material}
              </p>
              <p className="truncate md:w-4/5 w-full ml-2 text-black font-semibold text-4xl uppercase">
                ${data.Precio}
              </p>
              <p className="md:w-4/5 w-full h-[70px] overflow-y-auto ml-2">
                {data.Descripcion}
              </p>
              <div className="divider w-full md:w-4/5" />
              {/*aca todo se va al garete */}
              <div className="md:w-4/5 w-full ">
                <>
                  <p className="text-gray-500 antialiased tracking-wide font-semibold mb-1 ">
                    Selecciona el Color
                  </p>
                  <div className="grid md:grid-cols-4 p-1 grid-cols-2 mb-5 grid-rows-auto overflow-auto w-full gap-2">
                    {opciones.map((valor) => (
                      <div className={` ${valor.Color ? "" : "hidden"}`}>
                        <button
                          key={valor.index}
                          onClick={() => seleccionarcolor(valor.Color)}
                          className={`btn w-full hover:ring transition-all ${
                            valor.Color === color
                              ? "bg-black text-white border-none"
                              : "text-black border-2 border-gray-400 border-dashed"
                          } `}
                        >
                          {valor.Color}
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-500 antialiased tracking-wide font-semibold mb-1 ">
                    Selecciona la Talla
                  </p>

                  <div className="grid md:grid-cols-4 p-1 grid-cols-2 grid-rows-auto overflow-auto w-full gap-2">
                    {opciones.map((valor) => (
                      <button
                        key={valor.index}
                        onClick={() => seleccionartalla(valor.Talla)}
                        className={`btn w-full hover:ring transition-all ${
                          valor.Talla === talla
                            ? "bg-black text-white border-none"
                            : "text-black border-2 border-gray-400 border-dashed"
                        } `}
                      >
                        {valor.Talla}
                      </button>
                    ))}
                  </div>
                  <div className="divider"></div>
                  <div
                    id="añadircarrito"
                    className=" flex md:flex-row flex-col  w-full items-center justify-center gap-5"
                  >
                    <div className="join md:w-1/2 ">
                      <button
                        className={`btn btn-primary join-item ${
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
                      <button
                        className="btn btn-primary join-item"
                        onClick={añadir}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={`btn btn-primary mx-auto md:w-1/2 w-full ${
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

                    <a
                      ref={modalRef}
                      href="#my_modal_8"
                      className="btn hidden absolute  "
                    >
                      open modal
                    </a>
                    <div className="modal  " role="dialog" id="my_modal_8">
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
                            {" "}
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

                          <a
                            href="/Compras"
                            className="btn bg-black text-white"
                          >
                            <FaShoppingCart className="h-6 w-6 text-white " />
                            Ir al carrito
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>{" "}
              </div>
            </div>
          </div>
        </Layout>
      )}
    </Fragment>
  );
};

export default ProductID;
