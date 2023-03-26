import React from "react";
import MetaData from "../Components/MetaData";

const Terms = () => {
  return (
    <div className="container mx-auto p-10">
      <MetaData title={"Terms And Conditions -  Thrifty Thumbs"} />
      <h1 className="text-3xl font-bold">Terms and Conditions</h1>
      <p>
        Welcome to ThriftyThumb, a website that provides a platform to compare
        prices and make informed purchasing decisions. By using our website, you
        agree to comply with the following terms and conditions.
      </p>

      <h2 className="text-2xl font-bold mt-10">Affiliate Disclosure Policy</h2>
      <p>
        ThriftyThumb uses affiliate partnerships with websites such as
        Amazon.in, Flipkart, Croma, Reliance Digital, and Myntra to provide the
        best deals and prices to our users. By clicking on the links provided on
        our website and making a purchase, you acknowledge that we may receive a
        commission for the referral. This commission helps us maintain and
        improve our website and services.{" "}
      </p>

      <h2 className="text-2xl font-bold mt-10">Security</h2>
      <p>
        ThriftyThumb takes the security of our users' information seriously. We
        have implemented appropriate technical and organizational measures to
        protect your personal data from unauthorized access, alteration,
        disclosure, or destruction. However, please note that no system is
        completely secure and we cannot guarantee the complete safety of your
        information.
      </p>

      <h2 className="text-2xl font-bold mt-10">Privacy</h2>
      <p>
        ThriftyThumb is committed to protecting the privacy of our users. We
        collect and use your personal information only in accordance with our
        Privacy Policy. We encourage you to read our Privacy Policy in detail to
        understand how we collect, use, and protect your information.
      </p>

      <h2 className="text-2xl font-bold mt-10">Disclaimer</h2>
      <p>
        ThriftyThumb provides a platform to compare prices and make informed
        purchasing decisions. We are not responsible for the products or
        services you purchase through our affiliate partner websites. The
        products and services offered by our affiliate partners are subject to
        their terms and conditions. Please make sure to read and understand
        their policies before making a purchase.
      </p>
    </div>
  );
};

export default Terms;
