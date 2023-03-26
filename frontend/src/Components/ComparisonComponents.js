import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import Redirect from "./Redirect";

export default function ComparisonComponents({ data }) {
  const [keys, setKeys] = useState("");

  useEffect(() => {
    addKeys(data);
  }, [data]);

  const addKeys = (res) => {
    if (!res) return;
    let temp = [];
    let keysDetected = false;
    res.forEach((item) => {
      if (keysDetected) return; // stop the loop if keys have been detected
      if (item?.title) {
        Object.keys(item)?.map((key) => {
          if (key === "title") return;
          if (temp?.length > 0) keysDetected = true; // check if the desired key has been detected
          return temp.push(key);
        });
      }
    });
    return setKeys(temp);
  };

  return (
    <Fragment>
      {keys?.length > 0 && data?.length > 0 ? (
        data.map((item, i) => (
          <Fragment key={i}>
            {item?.title && (
              <Card className="relative">
                <CardHeader
                  color="gray"
                  className="relative h-40 w-40 mx-auto mt-2 transition-all duration-150 ease-linear scale-100 hover:scale-125"
                >
                  <LazyLoad className="h-full w-full">
                    <img
                      src={item[keys[0]].image}
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
                  <div className="flex flex-col">
                    {Object.keys(item).map((key, i) =>
                      key !== "title" ? (
                        <div
                          key={i}
                          className="flex flex-row justify-between items-center w-full"
                        >
                          <Redirect
                            colorCus="red"
                            url={item[key].url}
                            title={item[key].title}
                            storeName={key}
                          />

                          <Typography className="font-bold text-green-400">
                            ₹{item[key].price}
                          </Typography>
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                </CardBody>
                <CardFooter
                  divider
                  className="flex flex-col items-center justify-between py-2"
                >
                  <Typography variant="small" color="gray">
                    Available On:
                  </Typography>
                  <div className="flex flex-row flex-wrap items-center justify-center">
                    {Object.keys(item).map((key, i) =>
                      key !== "title" ? (
                        <LazyLoad
                          key={i}
                          className="h-12 w-12 flex items-center mx-2"
                        >
                          <img
                            className="h-12 w-12"
                            src={`/static/assets/stores/${key}.svg`}
                            alt={`${key} logo`}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                </CardFooter>
              </Card>
            )}
          </Fragment>
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
