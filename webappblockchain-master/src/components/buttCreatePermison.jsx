/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";

//import scss
import ".././assets/custom/scss/buttCreateProduct.scss";

const buttCreatePermisson = (props) => {
  const [statusButtCreate, setStatusButtCreate] = useState(false);
  const [statusButtPer, setStatusButtPer] = useState(false);

  const isAdminButtCreate = async () => {
    const isAdmin = await props.connecttransaction.checkAdmin(
      props.address
    );
    return isAdmin;
  };

  isAdminButtCreate().then((isadmin) => {
    let hidden = document.querySelector(".butt-create-product2");
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
      <div className="butt-create-product2" onClick={createProduct}>
        <i class='bx bx-message-alt-add'></i>
      </div>
    </div>
  );
};

export default buttCreatePermisson;
