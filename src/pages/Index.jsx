import { Fragment, useEffect, useState, useContext } from "react";
import Layout from "../Layout/Layout";
import { GetAllProducts } from "../Services/Getallprodutcs";
import ProductCard from "../Components/ProductCard";
import SubscribeCard from "../Components/shared/SubscribeCard";
import Amongus from "../Components/shared/Botonamongus";
import { Cartcontext } from "../context/cart-context";

const Index = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { updateFilter } = useContext(Cartcontext);

  const handlefilter = async (value) => {
    await updateFilter(value);

    window.location.href = "/Search";
  };
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

  const Filtered = data?.filter((filtrado) => filtrado.data.Stock === 777);
  const Filtered2 = data?.filter((filtrado) => filtrado.data.Stock === 555);

  return (
    <Fragment>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center flex-col gap-2 items-center">
          <img
            className=" w-36 my-2 mx-auto"
            src="https://backend-wolf.vercel.app/imagen/Logo.webp"
            alt="logo"
          />

          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <Layout title="Home">
          <main className="w-full h-full flex flex-col">
            <section
              id="HomeHero"
              className="w-full h-[90vh] flex flex-col border"
            >
              <div
                className="hero h-full w-full"
                style={{
                  backgroundImage:
                    "url(https://backend-wolf.vercel.app/imagen/Fondo2.webp)",
                }}
              >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-white">
                      BLACKWOLF
                    </h1>
                    <p className="mb-5 text-white">
                      Desde el Anime hasta lo Urbano, diseños que marcan la
                      diferencia. Envíos a toda Colombia 🇨🇴
                    </p>
                    <div className="flex justify-center">
                      <Amongus />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full textured md:px-24 px-5 py-20  flex flex-col  justify-center items-center">
              <h1 className="md:text-6xl  mb-10 text-4xl font-extrabold uppercase antialiased">
                Nueva coleccion
              </h1>
              <div className="divider"></div>
              <div className="w-full grid md:grid-cols-4 grid-cols-1 grid-rows-1 gap-4">
                {Filtered.slice(0, 4).map((shirt) => (
                  <ProductCard
                    key={shirt.id}
                    id={shirt.id}
                    codigo={shirt.data.Stock}
                    Image={shirt.data.Imagen}
                    ProductName={shirt.data.NombreProducto}
                    Price={shirt.data.Precio}
                  />
                ))}
              </div>

              <a
                href="/Search"
                className="rounded-full text-center mt-10 btn bg-transparent btn-wide link border-2"
              >
                Ver Más
              </a>
            </section>
            <section className="w-full textured md:px-24 px-5 py-20  flex flex-col  justify-center items-center">
              <h1 className="md:text-6xl  mb-10 text-4xl font-extrabold uppercase antialiased">
                Más vendidos
              </h1>
              <div className="divider"></div>
              <div className="w-full grid md:grid-cols-4 grid-cols-1 grid-rows-1 gap-4">
                {Filtered2.slice(0, 4).map((shirt) => (
                  <ProductCard
                    key={shirt.id}
                    id={shirt.id}
                    codigo={shirt.data.Stock}
                    Image={shirt.data.Imagen}
                    ProductName={shirt.data.NombreProducto}
                    Price={shirt.data.Precio}
                  />
                ))}
              </div>

              <a
                href="/Search"
                className="rounded-full text-center mt-10 btn bg-transparent btn-wide link border-2"
              >
                Ver Más
              </a>
            </section>
            <section className="w-full textured md:px-24 px-5 py-18  flex flex-col gap-10 justify-center items-center">
              <h1 className="text-4xl md:text-6xl uppercase font-extrabold antialiased text-center">
                Categorias
              </h1>
              <div className="bg-slate-200 rounded-2xl w-full h-[80vh] gap-4 p-10 grid md:grid-rows-1 grid-rows-3 grid-cols-1 md:grid-cols-3">
                <button
                  onClick={() =>
                    handlefilter(
                      "https://backend-wolf.vercel.app/produ/camisa/Anime"
                    )
                  }
                  className="col-span-1 relative w-full h-full hover:scale-105 transition-all hover:ring hover:cursor-pointer rounded-2xl"
                >
                  <img
                    src="https://backend-wolf.vercel.app/imagen/CamisasAnime.webp"
                    alt=""
                    className="object-cover w-full h-full rounded-2xl"
                  />
                  <p className="text-white font-extrabold absolute md:top-14 md:left-14 left-10 top-10 z-10 text-2xl uppercase md:text-6xl">
                    Anime
                  </p>
                </button>
                <button
                  onClick={() =>
                    handlefilter(
                      "https://backend-wolf.vercel.app/produ/camisa/Urbano"
                    )
                  }
                  className="col-span-1 relative w-full hover:scale-105 transition-all hover:ring hover:cursor-pointer h-full rounded-2xl"
                >
                  <img
                    src="https://backend-wolf.vercel.app/imagen/ModeloAngelcaido1.webp"
                    alt=""
                    className="object-cover w-full h-full rounded-2xl"
                  />
                  <p className="text-white font-extrabold absolute md:top-14 md:left-14 left-10 top-10 uppercase text-2xl md:text-6xl">
                    Urbano
                  </p>
                </button>
                <button onClick={() =>
                    handlefilter(
                      "https://backend-wolf.vercel.app/produ/camisa/Deportivo"
                    )
                  }
                   className="col-span-1 relative w-full transition-all hover:ring hover:cursor-pointer h-full rounded-2xl">

                  <img
                    src="https://backend-wolf.vercel.app/imagen/CamisasDeportiva.webp"
                    alt=""
                    className="object-cover w-full h-full rounded-2xl"
                  />
                  <p className="text-white font-extrabold absolute md:top-14 md:left-8 left-10 top-10 uppercase  text-2xl md:text-6xl">
                    Deportivo
                  </p>

                </button>
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
