import { Fragment } from "react";
import { FaFacebook,FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";


const Footer = () => {
  return (
    <Fragment>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img className=" w-36 my-2 mx-auto" src="/Logo.webp" alt="logo" />
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2024 blackwolf_col —
          </p>
          <div className="flex sm:ml-auto sm:mt-0 mt-4  gap-2 items-center justify-center sm:justify-start">
            <a href="https://www.threads.net/@blackwolf_col" target="_blank" className=" hover:text-blue-600 transition-all text-gray-500">
              <FaFacebook className="text-2xl"/>
            </a>
            
            <a href="https://www.instagram.com/blackwolf_col/" target="_blank" className=" hover:text-blue-600 transition-all text-gray-500">
            <FaInstagram className="text-2xl"/>
            </a>
            <a href="https://www.threads.net/@blackwolf_col" target="_blank" className=" hover:text-blue-600 transition-all text-gray-500">
            <FaThreads className="text-2xl"/>
            </a>
          </div>
        </div>
      </footer>
      ;
    </Fragment>
  );
};

export default Footer;
