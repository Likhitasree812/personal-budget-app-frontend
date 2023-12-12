import React from "react";
import contactus from "./contact-us.jpg";

const Contact = () => {
  return (
    <div className="container">
      <img src={contactus} alt="Contact Us" />
      <br />

      <p>
        <b>Email:</b> latla@uncc.edu{" "}
      </p>
      <p>
        <b>Phone No:</b>+1 669-224-0933{" "}
      </p>
    </div>
  );
};

export default Contact;
