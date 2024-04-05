import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Navigate, useParams } from "react-router-dom";
import { GetIDproduct } from "../Services/GetProductbyid";
import Layout from "../Layout/Layout";
import { FaCartPlus, FaShoppingCart, FaGrinStars } from "react-icons/fa";
import { Cartcontext } from "../context/cart-context";
import axios from "axios";
import SimpleSlider from "../Components/shared/SliderProduct";
import "../css/whattsap.css";
const ProductID = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cantidad, setcantidad] = useState(1);
  const [talla, settalla] = useState("");
  const [color, setcolor] = useState("");
  const modalRef = useRef(null);

  const { Addtocart, Cartitems } = useContext(Cartcontext);

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
    console.log(Cartitems);
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
        `https://backend-wolf-psi.vercel.app/Creacion/factura`,
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
          <div className="w-full min-h-[80vh] items-center flex md:flex-row py-4  flex-col ">
            <div className="h-full w-full md:w-1/2  md:px-10 p-2 flex ">
              <SimpleSlider Imagenes={data.Imagen} />
            </div>

            <div className="h-full md:w-1/2 w-full  gap-2 px-4 justify-start items-start flex flex-col ">
              <h1 className="uppercase truncate text-3xl md:w-4/5 w-full font-extrabold text-black">
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
                        key={valor.Talla}
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
                    className="grid md:grid-cols-2 grid-cols-1 w-full place-content-center  gap-5"
                  >
                    <div className="join col-span-1 mx-auto  ">
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
                      className={`btn btn-primary col-span-1 ${
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
                      className={`button2 md:col-span-2  items-center gap-5 justify-center font-semibold uppercase ${
                        talla == "" || color == "" || cantidad == 0
                          ? "btn-disabled"
                          : "btn-primary"
                      } `}
                    >
                      <svg
                        viewBox="0 0 48 48"
                        y="0px"
                        x="0px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                          fill="#cfd8dc"
                        ></path>
                        <path
                          d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                          fill="#40c351"
                        ></path>
                        <path
                          clip-rule="evenodd"
                          d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                          fill-rule="evenodd"
                          fill="#fff"
                        ></path>
                      </svg>
                      Comprar Directamente
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
