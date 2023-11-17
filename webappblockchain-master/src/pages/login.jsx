/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from "react";

import FormLogRegister from "../components/formLogRegister";
import AlertLog from "../components/alertLog";
import { useNavigate } from "react-router-dom";

import ".././assets/custom/scss/login.scss";


function login(props) {

  let navigate = useNavigate();

  // ==================== trans =======
  // connectWeb3.register();
  const [messLog, setMessLog] = useState("fail");

  const eventInfoPost = async function eventinfopost(username) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    //  function sendAddress(){
    // }
    await props.address(account);

    // get info user
    const check = await props.connecttransaction.userInfo(account);

    // check accout registed
    const checkRegisted = async function checkRegister() {
      if (check.registered) {
        console.log("da ton tai");
        navigate("/home");
      } else {
        console.log("ban chua dang ky, chung toi se dang ky cho ban");
        props.connecttransaction.register(username, account);
        navigate("/home");
        // console.log(username);
      }
      //log check data req from smart contract
      // console.log(check);
    };
    checkRegisted();
    // console.log(accAdmin);
    // console.log(account);
    const checkAdmin = await props.connecttransaction.checkAdmin(account);
    // console.log(checkAdmin);
    console.log(props.connecttransaction);

    // check admin
    const functCheckAdmin = async function () {
      if (checkAdmin) {
        console.log("admin");
        await props.isadmin(true);
      } else {
        console.log("client");
        await props.isadmin(false);
      }

      // if(checkAdmin===)
    };
    functCheckAdmin();

    // send data -> app -> home => show/hidden buttCreateProduct)
    // const sendDataToHome = async () => {
    //   await props.getconnecttransaction(props.connecttransaction);
    // };
    // sendDataToHome();
  };
  // eventInfoPost()

  return (
    <div className="layout-login">
      <div className=" layout-form">
        {/*<div className="contaiter-left">*/}
        {/*  <p id="text-review" className="">*/}
        {/*    Ở đây, chúng ta, những người trên mạng, cùng nhau định giá các loại*/}
        {/*    sản phẩm. Các sản phẩm đa dạng mọi loại từ hữu hình đến vô hình.*/}
        {/*    Giúp cho những người đang gặp khó khăn, khi họ không biết thứ mình*/}
        {/*    đang sở hữu có giá trị như thế nào. Hãy chung tay!*/}
        {/*  </p>*/}
        {/*  <div className="butt-infapp">*/}
        {/*    <span className="title-if">Thông tin thêm</span>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <FormLogRegister geteventpostinfo={eventInfoPost} />
      </div>
      {/* getusername={getNameUser}  */}
      {/* alert log */}
      <AlertLog messLog={messLog} />

      {/* <BrowserRouter> */}

      {/* <Routes> */}

      {/* <Route path="/home" element={<Home/>} /> */}
      {/* </Routes> */}

      {/* </BrowserRouter> */}
      {/* <button onClick={testthu}>ok</button> */}
    </div>
  );
}

export default login;
