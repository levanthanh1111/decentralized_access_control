import React from "react";

const priceValua = (props) => {
  return (
    <>
      <span className="name-client">{props.namePersion} :</span>
      <span className="gia-tri-client">{props.valuePricePerSion} $</span>
    </>
  );
};

export default priceValua;
