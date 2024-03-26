import { Fragment, React } from "react";

const ProductCard2 = ({ id, Imagen, alt, Discount, ProductName, Price }) => {
  return (
    <Fragment>
      <a href={`/Producto/${id}`} className="group  h-full w-full block">
        <img
          src={`https://backend-wolf-psi.vercel.app/imagen/${Imagen}`}
          alt={alt}
          className="h-[350px] w-full object-cover sm:h-[450px]"
        />

        <div className="mt-1.5">
          <p className="text-xs text-gray-500">Space Grey</p>


          <div className="mt-3 flex justify-between text-sm">
            <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
            {ProductName}
            </h3>

            <p className="text-gray-900">${Price}</p>
          </div>
        </div>
      </a>
    </Fragment>
  );
};

export default ProductCard2;
