import React from "react";
import { AiOutlineShopping, AiFillHeart } from "react-icons/ai";
import {
  TbBrandFacebook,
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandTelegram,
} from "react-icons/tb";
import { RiEarthLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center lg:text-left text-gray-600">
      <div className="flex justify-center items-center lg:justify-between p-6 border-b border-gray-300">
        <div className="mr-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex justify-center">
          <a href="https://deals.subhdeals.com" target="_blank">
            <RiEarthLine className="text-xl mx-1" />
          </a>
          <a href="https://telegram.me/subhdeals" target="_blank">
            <TbBrandTelegram className="text-xl mx-1" />
          </a>
          <a href="https://facebook.com/subhdeals" target="_blank">
            <TbBrandFacebook className="text-xl mx-1" />
          </a>
          <a href="https://instagram.com/iamharshk" target="_blank">
            <TbBrandInstagram className="text-xl mx-1" />
          </a>
          <a href="https://github.com/iamharshkr" target="_blank">
            <TbBrandGithub className="text-xl mx-1" />
          </a>
        </div>
      </div>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="w-full md:w-1/3">
            <h6
              className="
            uppercase
            font-semibold
            mb-4
            flex
            items-center
            justify-center
            md:justify-start
          "
            >
              <AiOutlineShopping className="text-lg w-5 mr-3" />
              Thrifty Thumbs
            </h6>
            <p>
              ThriftyThumbs is the ultimate solution for savvy shoppers who want
              to save money while shopping online. Our platform allows users to
              compare prices from different e-commerce websites in one place,
              making it easier to find the best deals. Our advanced search
              algorithms help users discover the best deals and savings on their
              favorite products, including tech gadgets, clothing, and home
              goods. Our user-friendly interface is designed to make shopping
              simple, so users can find the best prices with just a few clicks.
              Whether you're looking to save money on your next purchase or want
              to find the best deals online, ThriftyThumbs is the smart choice.
              Start discovering the best deals and savings on your favorite
              products today!
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
              Useful links
            </h6>
            <p className="mb-4">
              <Link to="/about" className="text-gray-600">
                About
              </Link>
            </p>
            <p className="mb-4">
              <Link to="/contact" className="text-gray-600">
                Contact Us
              </Link>
            </p>
            <p className="mb-4">
              <Link to="/privacy-policy" className="text-gray-600">
                Privacy Policy
              </Link>
            </p>
            <p>
              <Link to="/terms-and-conditions" className="text-gray-600">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center p-6 bg-gray-200 flex flex-col justify-center sm:flex-row sm:justify-between">
        <div className="mr-2">
          <span>© 2023 Copyright:</span>
          <Link className="text-gray-600 font-semibold" to="/">
            ThriftyThumbs
          </Link>
        </div>
        <Link
          to={{ pathname: "https//subhdeals.com/" }}
          className="flex flex-row items-center justify-center"
          target="_blank"
        >
          <span className="mr-1">Made with</span>
          <AiFillHeart color="red" />
          <span className="ml-1">by: Subhdeals</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
