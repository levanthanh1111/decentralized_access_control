/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";

//import scss
import ".././assets/custom/scss/buttCreateProduct.scss";

const buttCreateProduct = (props) => {
  const [statusButtCreate, setStatusButtCreate] = useState(false);
  const [statusButtPer, setStatusButtPer] = useState(false);

  const isAdminButtCreate = async () => {
    const isAdmin = await props.connecttransaction.isAdministrator(
      props.address
    );
    return isAdmin;
  };

  isAdminButtCreate().then((isadmin) => {
    let hidden = document.querySelector(".butt-create-product");
    if (isadmin) {
      hidden.style.visibility = "visible";
    } else {
      hidden.style.visibility = "hidden";
    }
  });

  function createProduct() {
    if (!statusButtPer) {
      props.getstatusbuttcreate(statusButtCreate);
    } else {
      setStatusButtCreate(false);
    }
  }

  return (
    <div>
      <div className="butt-create-product" onClick={createProduct}>
        <i className="bx bx-plus-medical"></i>
      </div>
    </div>
  );
};

export default buttCreateProduct;
