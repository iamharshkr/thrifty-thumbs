import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import "./Loader.css";
import { availableSites } from "../actions/scrapeActions";

export default function Loader() {
  const { available } = useSelector((state) => state.availableSites);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const images = [];

  useEffect(() => {
    if (!available | (available.length === 0)) {
      dispatch(availableSites());
    }
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, images.length]);

  available && available.map((data) => {
    return images.push("/static/assets/stores/" + data["image"]);
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="relative w-48 h-32">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            className={`preview-image ${
              currentIndex === index ? "active" : ""
            }`}
            alt="store-logo"
          />
        ))}
      </div>
      <span className="text-lg text-center text-teal-500 font-extrabold">
        Hold on tight we are searching for you!
      </span>
    </div>
  );
}

export function SecLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <FaSpinner className="text-indigo-500 text-6xl animate-spin" />
    </div>
  );
}
