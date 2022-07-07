import React from "react";
import { useState } from "react";

function ImgAndDesc({ img, description }) {
  return (
    <div>
      <img
        className="profilepic h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
        src={img}
      />

      <h5>User Description:</h5>
      <p>{description}</p>
    </div>
  );
}

export default ImgAndDesc;
