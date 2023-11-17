/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

// import conponent
import TabInfUser from ".././components/tabInfUse";

import ".././assets/custom/scss/logo.scss";

import logo from ".././assets/images/Picture1.png";

const nav =  (props) => {
  // const [userName, setUserName] = useState();

  // const getUserName = async()=>{
  //   const userName = await props.connecttransaction.userInfo(props.address)
  //   return userName
  // }
  // useEffect(()=>{
  //   getUserName().then(data=>{
  //     setUserName(data.name)
  //     console.log(data.name);
  //   })
  // },[])
 

  const [tabInfo, setTabInfo] = useState();
  const [statusTabInf, setStatusTabInfo] = useState(false);
  function showInf() {
    if (statusTabInf) {
      setTabInfo();
      setStatusTabInfo(false);
    } else {
      setTabInfo(<TabInfUser username={props.username} />);

      setStatusTabInfo(true);
    }
  }


  return (
    <div className="header">
      <div className="container-left">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="title">Ứng dụng định giá sản phẩm phi tập trung</h1>
      </div>
      <div className="icon-inf-account" onClick={showInf}>
        <i className="bx bx-user"></i>
      </div>
      {tabInfo}
      {/* <TabInfUser /> */}
    </div>
  );
};
export default nav;
React.memo(nav);
