/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import styled from "styled-components";

const StyledInfUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 200px;
  height: 70px;
  background: rgb(65, 63, 63);
  position: absolute;
  top: 70px;
  right: 30px;
  z-index: 10;
`;
const RowInf = styled.div`
  width: 180px;
  height: 25px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: "DM Mono", monospace;
`;

const tabInfUse = (props) => {
  return (
    <StyledInfUser>
      <RowInf>
        <i
          className="bx bx-user"
          style={{ color: "white", fontSize: "2rem" }}
        ></i>
        <span
          className="text-inf"
          style={{
            color: "white",
            fontSize: "2rem",
            display: "inline-block",
            padding: 0,
            margin: 0,
          }}
        >
          {props.username}
        </span>
      </RowInf>
      <RowInf>
        <i
          className="bx bx-log-out"
          style={{ color: "white", fontSize: "2rem" }}
        ></i>
        <span
          className="text-inf"
          style={{
            color: "white",
            fontSize: "2rem",
            display: "inline-block",
            padding: 0,
            margin: 0,
          }}
        >
          Log out
        </span>
      </RowInf>
    </StyledInfUser>
  );
};

export default tabInfUse;
