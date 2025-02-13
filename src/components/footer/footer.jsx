import React from "react";

const Footer = ({ src, alt }) => {
  return (
<footer className="flex justify-center p-4 mt-auto">
  <img className="footer" src={src} alt={alt} />
  <p>placeholder footer</p>
</footer>
  );
};

export default Footer; // ✅ Ensure this is here
