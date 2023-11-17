/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

//import scss
import ".././assets/custom/scss/product.scss";

//import img test

const product = (props) => {
 
  function selectPhienDauGia() {
    // di toi phien dau gia :
    props.geteventshowphiendinhgia(props.productHash,props.nameProduct, props.imgProduct, props.timeEnd, props.description)

  }
 

  return (
    <div className="product" onClick={selectPhienDauGia}>
      <img src={props.imgProduct} alt="" />
      <div className="detail-prod">
        <span style={{ color: "orangered", fontWeight: 500 }}>Product:</span>
        <span>{props.nameProduct}</span>
      </div>
    </div>
  );
};

export default product;
