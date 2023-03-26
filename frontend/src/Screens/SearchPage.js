import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  availableSites,
  clearError,
  getResult,
} from "../actions/scrapeActions";
import Loader from "../Components/Loader";
import { useAlert } from "react-alert";
import { AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import { Button, Radio } from "@material-tailwind/react";
import TabComponents from "../Components/TabComponents";
import MetaData from "../Components/MetaData";

const SearchPage = () => {
  const { loading, error, data } = useSelector((state) => state.result);
  const { available } = useSelector((state) => state.availableSites);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { store, keyword } = useParams("");
  const [stores, setStores] = useState("");
  let detectedStore = store.split("-");
  detectedStore = detectedStore.filter(
    (val) => val !== "" && val !== null && val !== undefined
  );
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (store.length > 0) {
      let finalStore = stores.join("-");
      return navigate(`/search/${finalStore}/${keyword}`);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, alert]);
  useEffect(() => {
    if (!available | (available.length === 0)) {
      dispatch(availableSites());
    }
    setStores(detectedStore);
    dispatch(getResult(store, keyword));
  }, [store, keyword]);

  const handleChange = (event) => {
    const { value } = event.target;
    const values = [...stores];
    const index = values.indexOf(value);
    if (index === -1) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }
    setStores(values);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {data && (
            <div className="container mx-auto bg-gray-50 rounded shadow-md">
              <MetaData title={`Search Result: ${keyword} - Thrifty Thumbs`}/>
              <div className="p-2 my-2">
                <p className="text-teal-500 text-lg">
                  Showing Result For{" "}
                  {keyword.charAt(0).toUpperCase() + keyword.slice(1)}:
                </p>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 lg:row-span-1 lg:col-span-1 p-2  border-b-2 lg:border-r-2 lg:border-b-0 border-gray-400">
                  <div className="px-2">
                    <span>Search on store</span>
                    <div>
                      {available &&
                        available.map((data, i) => (
                          <Radio
                            key={i}
                            id={data["name"]}
                            value={data["storeName"]}
                            label={data["name"]}
                            name={data["storeName"]}
                            onClick={handleChange}
                            icon={<AiOutlineCheck />}
                            checked={stores.includes(data["storeName"])}
                            readOnly
                          />
                        ))}
                    </div>
                    <div className="flex justify-center lg:justify-end">
                      <Button
                        onClick={handleSubmit}
                        color="teal"
                        className="flex flex-row justify-center items-center bg-teal-400 shadow-teal-400/20 hover:shadow-lg hover:shadow-teal-400/40"
                      >
                        <AiOutlineSearch className="text-lg mr-2" />
                        Show Results
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 lg:row-span-3 lg:col-span-3">
                  {data !== [] && (
                    <TabComponents result={data} firstStore={stores[0]} allStore={detectedStore} />
                  )}
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default SearchPage;
