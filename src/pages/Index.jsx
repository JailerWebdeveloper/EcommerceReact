import { Fragment, useEffect, useState } from "react";
import React from "react";
import Layout from "../Layout/Layout";
import { GetAllProducts } from "../Services/Getallprodutcs";
import ProductCard from "../Components/ProductCard";
import SubscribeCard from "../Components/shared/SubscribeCard";
const Index = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await GetAllProducts();
        setData(products);
        setIsLoading(false); // Cuando los datos se cargan, se establece isLoading en false
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false); // En caso de error, también se establece isLoading en false
      }
    };

    fetchData();
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center flex-col gap-2 items-center">
          <img className=" w-36 my-2 mx-auto" src="/Logo.webp" alt="logo" />

          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <Layout title="Home">
          <main className="w-full h-full flex flex-col">
            <section
              id="HomeHero"
              className="w-full h-[90vh] flex flex-col border"
            >
              <div className="hero w-full h-full bg-base-200">
                <div className="hero-content text-center">
                  <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                      Provident cupiditate voluptatem et in. Quaerat fugiat ut
                      assumenda excepturi exercitationem quasi. In deleniti
                      eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full textured md:px-24 px-5 py-20  flex flex-col  justify-center items-center">
              <h1 className="md:text-6xl  text-4xl font-extrabold mb-10 uppercase antialiased">
                Nueva coleccion
              </h1>
              <div className="w-full grid md:grid-cols-4 grid-cols-2  grid-rows-1 ">
                {data.slice(0, 4).map((shirt) => (
                  <ProductCard
                    key={shirt.id}
                    id={shirt.id}
                    Discount=""
                    alt={shirt.Descripcion}
                    Image={shirt.Imagen}
                    ProductName={shirt.NombreProducto}
                    Price={shirt.Precio}
                  />
                ))}
              </div>

              <a
                href="/Search"
                className="rounded-full mt-10 text-center btn bg-transparent btn-wide link border-2"
              >
                view more
              </a>
              <div className="divider text-slate-400 mx-auto w-4/5"></div>
            </section>

            <section className="w-full textured md:px-24 px-5 py-20  flex flex-col  justify-center items-center">
              <h1 className="md:text-6xl  mb-10 text-4xl font-extrabold uppercase antialiased">
                Top ventas
              </h1>
              <div className="w-full grid md:grid-cols-4 grid-cols-2 grid-rows-1 gap-4">
                {data.slice(0, 4).map((shirt) => (
                  <ProductCard
                    key={shirt.id}
                    id={shirt.id}
                    Discount=""
                    alt={shirt.Descripcion}
                    Image={shirt.Imagen}
                    ProductName={shirt.NombreProducto}
                    Price={shirt.Precio}
                  />
                ))}
              </div>

              <a
                href="/Search"
                className="rounded-full text-center mt-10 btn bg-transparent btn-wide link border-2"
              >
                view more
              </a>
            </section>

            <section className="w-full textured md:px-24 px-5 py-20  flex flex-col gap-10 justify-center items-center">
              <h1 className="text-4xl md:text-6xl uppercase font-extrabold antialiased text-center">
                Categorias
              </h1>
              <div className="bg-slate-200 rounded-2xl w-full h-[80vh] gap-4 p-10 grid md:grid-rows-2 grid-rows-3 grid-cols-2 md:grid-cols-3">
                <div className="col-span-2 relative w-full h-full hover:scale-105 transition-all hover:ring hover:cursor-pointer rounded-2xl">
                  <img
                    src="https://i.pinimg.com/736x/19/88/9f/19889f3a22ad71425b0ad054a249ad95.jpg"
                    alt=""
                    className="object-cover w-full h-full rounded-2xl"
                  />
                  <p className="text-white font-extrabold absolute md:top-14 md:left-14 left-10 top-10 z-10 uppercase md:text-6xl">
                    Aestetic
                  </p>
                </div>
                <div className="col-span-1 relative w-full hover:scale-105 transition-all hover:ring hover:cursor-pointer h-full rounded-2xl">
                  <img
                    src="https://i.pinimg.com/736x/19/88/9f/19889f3a22ad71425b0ad054a249ad95.jpg"
                    alt=""
                    className="object-cover w-full h-full rounded-2xl"
                  />
                  <p className="text-white font-extrabold absolute md:top-14 md:left-14 left-10 top-10 uppercase md:text-6xl">
                    Urban
                  </p>
                </div>
                <div className="col-span-1 relative w-full hover:scale-105 transition-all hover:ring hover:cursor-pointer h-full rounded-2xl">
                  <img
                    src="https://i.pinimg.com/736x/19/88/9f/19889f3a22ad71425b0ad054a249ad95.jpg"
                    alt=""
                    className="object-cover w-full h-full rounded-2xl"
                  />
                  <p className="text-white font-extrabold absolute md:top-14 md:left-14 left-10 top-10 uppercase md:text-6xl">
                    Urban
                  </p>
                </div>
                <div className="col-span-2 relative w-full h-full hover:scale-105 transition-all hover:ring hover:cursor-pointer rounded-2xl">
                  <img
                    src="https://i.pinimg.com/736x/19/88/9f/19889f3a22ad71425b0ad054a249ad95.jpg"
                    alt=""
                    className="object-cover w-full h-full rounded-2xl"
                  />
                  <p className="text-white font-extrabold absolute md:top-14 md:left-14 left-10 top-10 uppercase md:text-6xl">
                    Aestetic
                  </p>
                </div>
              </div>
              <SubscribeCard />
            </section>
          </main>
        </Layout>
      )}
    </Fragment>
  );
};

export default Index;
