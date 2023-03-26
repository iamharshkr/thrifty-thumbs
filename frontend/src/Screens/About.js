import React from 'react';
import MetaData from '../Components/MetaData'

const About = () => {
  return (
    <div className="container mx-auto p-10">
      <MetaData title={"About Us - Thrifty Thumbs"}/>
      <h1 className="text-3xl font-bold text-center">About ThriftyThumbs</h1>
      <p className="text-xl text-gray-700 md:text-center text-justify mt-5">
        ThriftyThumbs is a one-stop solution for all your shopping needs. We gather products from popular websites like Amazon.in, Flipkart, Croma, Reliance Digital, and Myntra, to provide you with the best deals and prices.
      </p>
      <p className="text-xl text-gray-700 md:text-center text-justify mt-5">
        We use web scraping to extract product information, compare prices and show the results in a simple and user-friendly manner. With ThriftyThumbs, you can save time and money on your next purchase.
      </p>
      <p className="text-xl text-gray-700 md:text-center text-justify mt-5">
        And the best part, we're constantly adding more websites to our list, so you'll never miss out on a great deal!
      </p>
    </div>
  );
};

export default About;
