import React from "react";
import MetaData from "../Components/MetaData";
const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6">
      <MetaData title="Privacy Policy - Thrifty Thumbs" />
      <h1 className="text-2xl font-bold text-center">Privacy Policy</h1>
      <p className="mt-6 text-lg">
        ThriftyThumb values the privacy of its users and is committed to
        protecting it. This Privacy Policy outlines the types of personal
        information we collect and how it is used and protected.
      </p>
      <h2 className="mt-6 text-xl font-bold">Information Collection and Use</h2>
      <p className="mt-2 text-lg">
        ThriftyThumb collects personal information such as name, email address,
        and any other information that you voluntarily provide when using our
        website. We use this information to improve our services and provide you
        with a better user experience.
      </p>
      <h2 className="mt-6 text-xl font-bold">
        Information Sharing and Disclosure
      </h2>
      <p className="mt-2 text-lg">
        ThriftyThumb will not sell, rent or share your personal information with
        any third parties, except as required by law or to protect the rights
        and safety of our users and the general public.
      </p>
      <h2 className="mt-6 text-xl font-bold">Security</h2>
      <p className="mt-2 text-lg">
        ThriftyThumb takes the security of its users' information very seriously
        and implements appropriate security measures to protect it from
        unauthorized access, alteration, disclosure or destruction.
      </p>
      <h2 className="mt-6 text-xl font-bold">Changes to this Privacy Policy</h2>
      <p className="mt-2 text-lg">
        ThriftyThumb reserves the right to modify this Privacy Policy at any
        time. If we make changes, we will update this page and post the new
        policy on our website.
      </p>
      <h2 className="mt-6 text-xl font-bold">Contact Us</h2>
      <p className="mt-2 text-lg">
        If you have any questions or concerns about our Privacy Policy, please
        contact us at info@subhdeals.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
