import { Fragment, React } from "react";

const ProductCard = ({ id, Image, alt, Discount, ProductName, Price }) => {
  return (
    <Fragment>
      <div className="w-full h-full ">
        <a  href={`/Producto/${id}`}>
          <div className="flex flex-col gap-2 transition-all hover:cursor-pointer rounded-2xl   hover:ring p-2">
            <div className="w-full md:h-[298px] h-[238px] rounded-2xl border-2 bg-slate-500">
              <img
                src={`https://backend-wolf-psi.vercel.app/imagen/${Image[0]}`}
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
      </div>
    </Fragment>
  );
};

export default ProductCard;
