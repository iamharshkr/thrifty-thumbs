import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import "./Arrow.css";
import useWindowDimensions from "./useWindowDimensions";

const Arrow = () => {
  const { width } = useWindowDimensions();
  const [arrows, setArrows] = useState([
    { id: 1, className: "hidden" },
    { id: 2, className: "hidden" },
    { id: 3, className: "hidden" },
    { id: 4, className: "hidden" },
    { id: 5, className: "hidden" },
  ]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      const newArrows = [...arrows];
      newArrows[index].className = "";
      setArrows(newArrows);
      index++;
      if (index === arrows.length) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5 lg:mt-0 h-24 lg:h-auto lg:w-24 flex justify-center items-center flex-col md:flex-row">
      {arrows.map((arrow, index) => (
        <Fragment key={arrow.id}>
          {width > 719 ? (
            <AiOutlineArrowRight
              key={arrow.id}
              className={`text-2xl font-bold ${arrow.className} animate-pulse`}
            />
          ) : (
            <AiOutlineArrowDown
              key={arrow.id}
              className={`text-2xl font-bold ${arrow.className} animate-pulse`}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Arrow;
