import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import LogoMain from "./Logo";
import Arrow from "./utils/Arrow";
import useWindowDimensions from "./utils/useWindowDimensions";

const Redirect = ({ url, storeName, colorCus, title }) => {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        let encodedUrl = `https://tracking.subhdeals.com/?subid=thriftythumbs&url=${encodeURIComponent(
          url
        )}`;
        setOpen(false);
        window.location.href = encodedUrl;
        // console.log(encodedUrl)
      }, 3000);
    }
  }, [open]);
  return (
    <Fragment>
      <div className="w-full flex justify-center items-center">
        <Button
          title={title}
          className="flex flex-row items-center justify-center"
          variant={`${colorCus === "red" ? "text" : "outlined"}`}
          color={`${colorCus === "red" ? "red" : "light-blue"}`}
          onClick={handleOpen}
        >
          <p>{colorCus === "red" ? storeName : "Shop Now"}</p>
          <AiOutlineShoppingCart className="text-lg ml-2" />
        </Button>
      </div>
      <Dialog
        size={width > 600 ? (width > 1050 ? "md" : "xl") : "xxl"}
        open={open}
        handler={handleOpen}
      >
        <DialogHeader className="mx-auto">
          <Typography as="h3">
            Redirecting to{" "}
            {storeName.charAt(0).toUpperCase() + storeName.slice(1)}...
          </Typography>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col md:flex-row justify-around items-center">
            <LogoMain col={true} />
            {/* arrow */}
            <Arrow />
            <img
              className="h-32 w-32"
              alt={`${storeName}-logo`}
              src={`/static/assets/stores/${storeName}.svg`}
            />
          </div>
          <div className="text-center">
            <span>
              Say farewell to boredom and hello to a fun shopping experience
              with ThriftyThumbs. Make sure to come back and visit us again
              soon!
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
    </Fragment>
  );
};

export default Redirect;
