import React from "react";

const LoadState = ({ src, alt }) => {
  return <img className="load-state" src={src} alt={alt} />;
};

export default LoadState; // ✅ Ensure this is here
