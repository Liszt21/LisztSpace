import React, { useState, useEffect } from "react";
import axios from "axios";

function Tools() {
  const [ ping, setPing ] = useState("Ping");
  useEffect(()=>{
    axios.get("http://localhost:5000/api/ping")
      .then(function (response) {
        setPing(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])
  
  return (
      <p>{ping}</p>
  )
}

export default Tools;
