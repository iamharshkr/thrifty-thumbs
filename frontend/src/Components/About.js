import React, { useEffect, useRef } from "react";
import girlWithPhone from "./girl-using-phone.svg";
import "./About.css";

const About = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const position = elementRef.current.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.5;

      if (position < screenPosition) {
        elementRef.current.classList.add("visible");
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="mx-auto container lg:h-screen flex justify-center items-center mt-2">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div ref={elementRef} className="w-full lg:w-1/2 element">
          <img className="mx-auto lg:w-3/4" src={girlWithPhone} alt="Phone" />
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="font-semibold text-center text-xl lg:text-xl text-purple-600 leading-6">
            ThriftyThumbs is solving the problem of endless searches for the
            best deals and offers across multiple e-commerce platforms. With
            ThriftyThumbs, users can find the best prices for products in one
            place, saving them time and money. Our platform is designed to make
            shopping smart, fast and easy. Say goodbye to the hassle of
            switching between multiple websites and hello to a seamless shopping
            experience with ThriftyThumbs. Shop smarter, not harder, with
            ThriftyThumbs.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default About;
