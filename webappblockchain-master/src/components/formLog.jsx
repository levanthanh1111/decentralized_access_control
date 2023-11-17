/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";

import Home from ".././pages/home";

const formLog = (props) => {
  const [infLog, setInfLog] = useState();

  const getPustInfLog = async() => {
    await props.geteventpost(infLog.name);
  };

  function getInf(e) {
    setInfLog({ ...infLog, [e.target.name]: e.target.value });
  }
  // console.log(urlHome);

  return (
    <>
      <form className="form-register-log">
        <label>
          <input
            type="text"
            id="email"
            className="input-f"
            placeholder="Name"
            name="name"
            onChange={getInf}
          />
        </label>
        
      </form>

      <button id="butt-register-log" onClick={getPustInfLog}>
        <div id="link-home">Log In</div>
      </button>
    </>
  );
};

export default formLog;
