import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Fragment } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import LazyLoad from "react-lazyload";
import Redirect from "./Redirect";

export default function ProductComponents({ data, storeName }) {
  const discount = (price, mrp) => {
    return Math.round(((mrp - price) / mrp) * 100);
  };
  return (
    <Fragment>
      {data?.length > 0 ? (
        data.map((item, i) => (
          <Card key={i} className="relative">
            {item.price>0 && item.mrp >0 && <div className="absolute top-2 right-1 z-50">
              <div className="flex flex-row items-center justify-center text-sm text-white bg-pink-500 rounded-full px-1 font-bold">
                <AiFillThunderbolt className="animate-pulse text-amber-500" />
                <span>{discount(item.price, item.mrp)}% off</span>
              </div>
            </div>}
            <CardHeader
              color="gray"
              className="relative h-40 w-40 mx-auto mt-2 transition-all duration-150 ease-linear scale-100 hover:scale-125"
            >
              <LazyLoad className="h-full w-full">
                <img
                  src={item.image}
                  alt="img-blur-shadow"
                  className="h-full w-full"
                />
              </LazyLoad>
            </CardHeader>
            <CardBody className="text-center">
              <Typography
                title={item.title}
                variant="h5"
                className="mb-2 text-sm h-[120px] overflow-hidden"
              >
                {item.title}
              </Typography>
              {item.mrp > 0 && item.price > 0 && <Typography className="text-sm text-red-400">
                MRP: <s>₹{item.mrp}</s>
              </Typography>}
              {item.price > 0 && <Typography className="font-bold text-green-400">
                Price: ₹{item.price}
              </Typography>}
              <Redirect url={item.url} storeName={storeName}/>
            </CardBody>
            <CardFooter
              divider
              className="flex items-center justify-between py-2"
            >
              <Typography variant="small" color="gray">
                Available on:
              </Typography>
              <LazyLoad className="h-12 w-12">
                <img
                  className="h-12 w-12"
                  src={`/static/assets/stores/${storeName}.svg`}
                  alt={`${storeName} logo`}
                />
              </LazyLoad>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div>
          <Typography className="w-screen" color="gray">
            Oh no, it looks like we couldn't find what you're looking for! Give
            it another go or try refreshing the page.
          </Typography>
        </div>
      )}
    </Fragment>
  );
}
