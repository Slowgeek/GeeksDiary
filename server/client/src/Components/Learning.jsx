import React, { useEffect } from "react";
const axios = require("axios");

const Learning = () => {
  const Check = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");

      console.log(response);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };
  useEffect(() => {}, []);
  return (
    <div>
      <button className="bg-green-500" onClick={() => Check()}>
        Check
      </button>
    </div>
  );
};

export default Learning;
