import { Fragment, React } from "react";

const ProductCard = ({ id, Image, codigo, ProductName, Price }) => {
  return (
    <Fragment>
      {/*<div className="w-full h-full ">
        <a href={`/Producto/${id}`}>
          <div className="flex flex-col gap-2 transition-all hover:cursor-pointer rounded-2xl   hover:ring p-2">
            <div className="w-full md:h-[298px] h-[238px] rounded-2xl border-2 bg-slate-500">
              <img
                src={`https://backend-wolf.vercel.app/imagen/${Image[0]}`}
                className="md:object-cover object-contain rounded-2xl w-full h-full"
                alt={alt}
              />
            </div>
            <p className="ml-2 font-bold antialiased text-[20px] truncate w-4/5 max-h-[200px]">
              {ProductName}
            </p>
            <p className="ml-2 font-bold antialiased text-2xl truncate w-4/5 tracking-wide">
              ${Price}
            </p>
          </div>
        </a>
  </div>*/}
      {id ? (
        <>
          <a
            href={`/Producto/${id}`}
            className="group relative block overflow-hidden"
          >
            <img
              src={`https://backend-wolf.vercel.app/imagen/${Image[0]}`}
              alt={ProductName}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-gray-100 bg-white p-6">
              {codigo === 777 && (
                <>
                  {" "}
                  <span className="whitespace-nowrap bg-blue-400 px-3  text-xs font-medium">
                    Nueva Coleccion!
                  </span>
                </>
              )}

              {codigo === 555 && (
                <>
                  {" "}
                  <span className="whitespace-nowrap bg-red-400 px-3  text-xs font-medium">
                    Mas Vendidos!
                  </span>
                </>
              )}

              <h3 className="mt-4 text-lg font-medium w-full truncate text-gray-900">
                {ProductName}
              </h3>

              <p className="mt-1.5 text-sm text-gray-700">${Price}</p>

              <form className="mt-4">
                <a
                  href={`/Producto/${id}`}
                  className="block w-full rounded text-center bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                >
                  Comprar
                </a>
              </form>
            </div>
          </a>
        </>
      ) : (
        <>loading...</>
      )}
    </Fragment>
  );
};

export default ProductCard;
