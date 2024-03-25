import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider({ Imagenes }) {
  var settings = {
    customPaging: function (i) {
      return (
        <a className="w-full rounded-2xl h-full">
          <img
            className="object-cover h-full w-full rounded-2xl hover:ring"
            src={`https://backend-wolf-psi.vercel.app/imagen/${Imagenes[i]}`}
            alt={`slide-${i}`}

          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    swipeToSlide: true,

    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="slider-container rounded-2xl w-full h-full">
      {Imagenes.map(
        (
          imagen,
          index // Ajuste aquí
        ) => (
          <div key={index} className="h-[400px] rounded-2xl w-full">
            {" "}
            {/* Agrega la propiedad key */}
            <img
              className="object-cover rounded-2xl h-full hover:scale-125 transition-all w-full"
              src={`https://backend-wolf-psi.vercel.app/imagen/${imagen}`}
              alt={`slide-${index}`}
            />
          </div>
        )
      )}
    </Slider>
  );
}
