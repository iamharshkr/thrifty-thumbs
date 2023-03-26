import React, { Fragment } from "react";
import phone from "./phone.png";
import CustomDialog from "./CustomDialog";
const Hero = ({data}) => {
  return (
    <Fragment>
      {data && (
        <div className="mx-auto container lg:h-screen flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="w-full lg:w-1/2">
              <img className="w-full lg:w-[80%]" src={phone} alt="Phone" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-full lg:w-1/2">
                <h2 className="font-extrabold text-justify text-2xl lg:text-5xl text-teal-500">
                  Effortlessly Find the Best Prices Online
                </h2>
              </div>
              <CustomDialog />
              <div className="my-2">
                <span className="text-pink-500 font-bold">
                  Available Sites:{" "}
                </span>
                <div className="flex items-center overflow-x-auto">
                  {data.map((data, i) => (
                    <img
                      key={i}
                      className={`w-[30%] sm:w-20 mx-2`}
                      src={`/static/assets/stores/${data["image"]}`}
                      alt={`${data["name"]} logo`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Hero;
