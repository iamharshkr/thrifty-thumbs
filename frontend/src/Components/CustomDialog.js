import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import useWindowDimensions from "./utils/useWindowDimensions";

const CustomDialog = ({ navBarOpt }) => {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return (
    <div className="relative">
      {navBarOpt ? (
        <Input
          color="blue-gray"
          onClick={handleOpen}
          variant="static"
          placeholder="Search Product"
          icon={<AiOutlineSearch className="text-lg" />}
        />
      ) : (
        <Button className="mt-5" onClick={handleOpen} variant="gradient">
          Search Product
        </Button>
      )}
      <Dialog
        size={width > 600 ? (width > 1050 ? "md" : "xl") : "xxl"}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="relative">
          <span>Search Products</span>
          <AiOutlineClose onClick={handleOpen} className="absolute top-1 right-1 m-2 cursor-pointer"/>
        </DialogHeader>
        <DialogBody divider>
          <SearchBar />
          <div className="mt-2 flex flex-col justify-center">
            <span className="text-justify text-amber-600">
              Please select more than one website to use our compare feature.
            </span>
            <span className="text-justify text-gray-700/80">
              Get the best deal with just a tap! Simply enter your desired
              product and we'll compare prices across top websites, delivering
              you the lowest price. Shop smart, shop ThriftyThumbs!
            </span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
