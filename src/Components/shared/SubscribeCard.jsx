import React, { useState, useRef } from "react";
import axios from "axios";
import { FcLike } from "react-icons/fc";

const SubscribeCard = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const modalRef = useRef(null);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        `https://backend-wolf.vercel.app/Registro/Clientes`,
        {
          Correo: email,
          Telefono: phone,
          Nombre: name,
        }
      );
      console.log("Respuesta del servidor:", response.data);
      if (response.status === 201 || response.status === 200)
        modalRef.current.click();
    } catch (error) {
      console.error("Error al suscribirse:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="bg-black flex md:flex-row rounded-2xl p-4 flex-col md:justify-around w-full h-full items-center">
      <div className="w-full md:w-3/5">
        <h2 className="text-white font-extrabold md:text-5xl text-2xl  text-center  uppercase antialiased">
          Subscríbete para recibir grandes promociones
        </h2>
      </div>
      <div className="flex gap-4 flex-col justify-center w-full md:w-2/5 items-center">
        <input
          type="email"
          className="input w-full"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          className="input w-full"
          placeholder="Teléfono"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          className="input w-full"
          placeholder="Nombre"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="btn bg-white text-black w-full rounded-full text-center"
          onClick={handleSubscribe}
        >
          ¡Suscríbete!
        </button>
      </div>
      <label ref={modalRef} htmlFor="my_modal_7" className="btn hidden">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box ">
          <FcLike className="mx-auto my-2 text-2xl"></FcLike>
          <h3 className="text-lg font-bold text-center">Gracias por subscribirte!</h3>
          <p className="py-4">Te estaremos enviando nuestras mejores ofertas y descuentos!</p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default SubscribeCard;
