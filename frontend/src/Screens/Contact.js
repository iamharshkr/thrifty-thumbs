import { Button } from "@material-tailwind/react";
import React from "react";
import MetaData from "../Components/MetaData";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <MetaData title={"Contact Us - Thrifty Thumbs"} />
      <h1 className="text-2xl font-bold mb-10 mt-5 lg:mt-1">Contact Us</h1>
      <form className="w-1/2 p-10 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border p-2 rounded-lg"
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border p-2 rounded-lg"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full border p-2 rounded-lg"
            id="message"
            name="message"
            rows="5"
            required
          />
        </div>
        <Button type="submit" color="indigo" variant="filled">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Contact;
