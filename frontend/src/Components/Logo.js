import React from "react";

const LogoMain = ({ col }) => {
  return (
    <div
      className={`text-xl lg:text-4xl font-bold text-white ${
        col ? "text-start" : "text-center"
      }`}
    >
      <span className="bg-blue-500 p-1">Thrifty</span>
      <span className="bg-pink-500 p-1">Thumbs</span>
    </div>
  );
};

export default LogoMain;
