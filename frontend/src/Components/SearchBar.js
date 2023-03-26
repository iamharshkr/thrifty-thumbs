import React, { Fragment, useState } from "react";
import { Input, Radio } from "@material-tailwind/react";
import { AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import {
  addToLocalStorage,
  getLocalStorage,
  removeFromLocalStorage,
} from "./utils/searchesHandler";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchBar = ({ staticInp }) => {
  const [text, setText] = useState("");
  const [recent, setRecent] = useState(false);
  const [store, setStore] = useState([]);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(getLocalStorage())
  );
  const { available } = useSelector((state) => state.availableSites);
  const navigate = useNavigate();
  const [validate, setValidate] = useState({});

  const handleSubmit = () => {
    if (text.length < 1) {
      return setValidate({
        text: "Please enter the product name.",
      });
    } else {
      setValidate({
        text: false,
      });
    }
    if (store.length < 1) {
      return setValidate({
        store: "Please select at least one store.",
      });
    } else {
      setValidate({
        store: false,
      });
    }
    addToLocalStorage(text);
    setRecentSearches(JSON.parse(getLocalStorage()));
    let finalStore = store.join("-");
    return navigate(`/search/${finalStore}/${text}`);
  };
  const handleRemove = (key) => {
    removeFromLocalStorage(key);
    setRecentSearches(JSON.parse(getLocalStorage()));
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    setRecent(true);
    if (text.length > 1) {
      if (recentSearches?.length > 0) {
        setRecentSearches(
          recentSearches.filter((item) =>
            item.toLowerCase().includes(text.toLowerCase())
          )
        );
      }
    } else {
      setRecentSearches(recentSearches);
    }
  };
  const handleChange = (event) => {
    const { value } = event.target;
    const values = [...store];
    const index = values.indexOf(value);
    if (index === -1) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }
    setStore(values);
  };
  return (
    <Fragment>
      <div className="relative mx-auto m-2 w-full md:w-5/6">
        <Input
          variant={staticInp ? "static" : "outlined"}
          label={staticInp ? null : "Start Typing Product Name"}
          placeholder={staticInp ? "Search Product" : null}
          icon={
            <AiOutlineSearch
              className="text-xl cursor-pointer"
              onClick={handleSubmit}
            />
          }
          onFocus={() => setRecent(true)}
          onBlur={() => setRecent(false)}
          onChange={(e) => handleInputChange(e)}
          value={text}
          autoFocus={false}
        />
        <span
          className={`text-red-500 font-semibold transition-all ease-in-out ${
            validate?.text ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-1/2"
          }`}
        >
          {validate?.text}
        </span>
        {recentSearches?.length > 0 && !staticInp && (
          <div
            className={`absolute w-full top-10 transition-all ease-linear h-48 overflow-y-auto z-40 ${
              recent
                ? "visible opacity-100 translate-y-0"
                : "invisible opacity-0 -translate-y-5"
            }`}
          >
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-sm">Recent Searches</span>
              {recentSearches.map((item, i) => (
                <div
                  className="my-2 flex flex-row justify-between items-center px-2 py-1 bg-gray-200 text-black"
                  key={i}
                >
                  <span
                    onClick={() => setText(item)}
                    className="cursor-pointer transition-all hover:pl-3 ease-in-out hover:text-blue-500"
                  >
                    {item}
                  </span>
                  <span
                    onClick={() => handleRemove(item)}
                    className="text-sm cursor-pointer hover:text-blue-500 transition-all ease-in-out hover:pr-3"
                  >
                    Clear
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center">
        {!staticInp &&
          available &&
          available.map((data) => (
            <Radio
              key={data["name"]}
              id={data["name"]}
              value={data["storeName"]}
              name={data["storeName"]}
              label={data["name"]}
              onClick={handleChange}
              icon={<AiOutlineCheck />}
              checked={store.includes(data["storeName"])}
              readOnly
            />
          ))}
        <span
          className={`text-red-500 font-semibold transition-all ease-in-out px-2 ${
            validate?.store ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-1/2"
          }`}
        >
          {validate?.store}
        </span>
      </div>
    </Fragment>
  );
};

export default SearchBar;
