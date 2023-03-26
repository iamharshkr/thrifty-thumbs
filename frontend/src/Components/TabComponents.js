import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import { Fragment, lazy, useEffect, useState } from "react";
import { findSimilarProducts } from "./utils/matchSimilar";
const ComparisonComponents = lazy(() => import("./ComparisonComponents"));
const ProductComponents = lazy(() => import("./ProductComponents"));

export default function TabComponents({ result, firstStore, allStore }) {
  const [filter, setFilter] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [data, setData] = useState([]);
  const addInitialData = (prevResult) => {
    const finalData = [];
    Object.keys(prevResult).map((item) => {
      let newItem = {
        label: item.charAt(0).toUpperCase() + item.slice(1),
        value: item,
        children: (
          <ProductComponents
            data={prevResult[item]["result"]}
            storeName={item}
          />
        ),
      };
      return finalData.push(newItem);
    });
    if (allStore?.length > 1 && prevResult[allStore[1]]) {
      finalData.push({
        label: "Compare",
        value: "compare",
        children: (
          <ComparisonComponents data={findSimilarProducts(prevResult)} />
        ),
      });
    }
    return setData(finalData);
  };
  useEffect(() => {
    if (data.length < 1) {
      addInitialData(result);
    }
    setSelectedStore(firstStore);
  }, [firstStore]);
  const filterLabels = [
    {
      label: "Price: Low to high",
      value: "lowtohigh",
    },
    {
      label: "Price: High to Low",
      value: "hightolow",
    },
    {
      label: "Most Discount",
      value: "mostdiscount",
    },
  ];

  const handleTabChange = (value) => {
    setSelectedStore(value);
    setFilter("");
  };

  useEffect(() => {
    if (filter === "lowtohigh") {
      let sortedResult = result[selectedStore]["result"].sort(
        (a, b) => a.price - b.price
      );
      setData((prevItems) =>
        prevItems.map((item) => {
          if (item.value === selectedStore) {
            return {
              ...item,
              children: (
                <ProductComponents data={sortedResult} storeName={item.value} />
              ),
            };
          }
          return item;
        })
      );
    } else if (filter === "hightolow") {
      let sortedResult = result[selectedStore]["result"].sort(
        (a, b) => b.price - a.price
      );
      setData((prevItems) =>
        prevItems.map((item) => {
          if (item.value === selectedStore) {
            return {
              ...item,
              children: (
                <ProductComponents data={sortedResult} storeName={item.value} />
              ),
            };
          }
          return item;
        })
      );
    } else if (filter === "mostdiscount") {
      let sortedResult = result[selectedStore]["result"].sort((a, b) => {
        const discountA = ((a.mrp - a.price) / a.mrp) * 100;
        const discountB = ((b.mrp - b.price) / b.mrp) * 100;
        return discountB - discountA;
      });
      setData((prevItems) =>
        prevItems.map((item) => {
          if (item.value === selectedStore) {
            return {
              ...item,
              children: (
                <ProductComponents data={sortedResult} storeName={item.value} />
              ),
            };
          }
          return item;
        })
      );
    }
  }, [filter, result, selectedStore]);
  return (
    <Fragment>
      {firstStore && (
        <Tabs id="custom-animation" value={firstStore.toString()}>
          <TabsHeader className="max-w-full">
            {data.map(({ label, value }, i) => (
              <Tab
                className="max-w-[50%] lg:max-w-[10%]"
                key={i}
                onClick={() => handleTabChange(value)}
                value={value}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            <div className="flex justify-between items-center my-2 px-2 w-full rounded-md bg-blue-gray-100/20 py-1">
              <span className="text-base">Filter: </span>
              <div className="lg:mr-5 xl:mr-0 lg:w-1/4">
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e)}
                  size="md"
                  label="Filter"
                  disabled={
                    result[selectedStore]?.result.length < 1 ||
                    selectedStore === "compare"
                  }
                >
                  {filterLabels.map(({ label, value }) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            {data?.map(({ value, children }, i) => (
              <TabPanel key={i} value={value}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {children}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      )}
    </Fragment>
  );
}
