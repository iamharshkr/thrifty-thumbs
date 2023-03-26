import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { availableSites, clearError } from "../actions/scrapeActions";
import About from "../Components/About";
import Hero from "../Components/Hero";
import { SecLoader } from "../Components/Loader";

const Home = () => {
  const { loading, available, error } = useSelector(
    (state) => state.availableSites
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [alert, error, dispatch]);
  useEffect(() => {
    dispatch(availableSites());
  }, []);
  return (
    <Fragment>
      {loading ? (
        <SecLoader />
      ) : (
        <div>
          <Hero data={available} />
          <About />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
