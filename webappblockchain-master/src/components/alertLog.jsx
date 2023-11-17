/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

import "../assets/custom/scss/alertLog.scss";

const alertLog = (props) => {
  let icon = {
    success: "bx bxs-happy-heart-eyes",
    fail: "bx bxs-sad",
  };
  let alert = {
    success: "Successful login",
    fail: "Fail Log",
  };
  const getMess = props.messLog;
  const [iconLog, setIconLog] = useState(icon.fail);
  const [alertLog, setAlertLog] = useState(alert.fail);

  useEffect(() => {
    if (getMess === "success") {
      setIconLog(icon.success);
      setAlertLog(alert.success);
    } else {
      setIconLog(icon.fail);
      setAlertLog(alert.fail);
    }
  });
  return (
    <div className="component-alert-log">
      <i className={iconLog}></i>
      <span className="alert-log">{alertLog}</span>
    </div>
  );
};

export default alertLog;
