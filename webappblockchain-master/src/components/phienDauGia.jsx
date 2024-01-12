/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

//import scss
import ".././assets/custom/scss/phiendaugia.scss";

//   import
import PriceValue from "./priceValua";

const phienDauGia = (props) => {
  const [inputClientDinhGia, setInputClientDinhGia] = useState(<></>);
  const [buttCloseOrPost, setButtonCloseOrPost] = useState();
  const [valuePrice, setValuePrice] = useState();
  const [listRenderPrice, setListRenderPrice] = useState([]);
  const [showPriceF, setShowPriceF] = useState();
  const [showTimeOut, setShowTimeOut] = useState();
  const [chuyenDoiTime, setChuyenDoiTime] = useState();
  // var <> close and post
  const buttClose = (
    <div className="butt-close-phien" onClick={closePhien}>
      Close
    </div>
  );
  const buttDone = (
    <div className="butt-done-client" onClick={postPrice}>
      Done
    </div>
  );

  const isAdmin = async () => {
    const adminReq = await props.connecttransaction.checkAdmin(
      props.address
    );
    return adminReq;
  };
  isAdmin().then((data) => {
    if (data) {
      setButtonCloseOrPost(buttClose);
    } else {
      setButtonCloseOrPost(buttDone);

      setInputClientDinhGia(
        <input
          type="number"
          className="client-input-dinh-gia"
          placeholder="Nhap gia tri"
          onChange={clientInputPri}
        />
      );
    }
  });

  // =======================
  const getPersionPrice = async (index) => {
    const dataPersionPrice = await props.connecttransaction.getValuator(
      props.productHash,
      index
    );
    // console.log(dataPersionPrice);
    return dataPersionPrice;
  };

  const countPersonPrice = async () => {
    const data = await props.connecttransaction.productInfo(props.productHash);
    return data;
  };

  function clientInputPri(e) {
    setValuePrice(e.target.value);
  }

  function postPrice(e) {
    props.connecttransaction.addPrice(
      props.productHash,
      valuePrice,
      props.address
    );
    finalPrice(props.productHash).then((data) => {
      if (data.finalPrice > 0) {
        setShowPriceF(
          <div className="show-final-price">
            <div className="text-linear-final-price">
              FinalPrice: {data.finalPrice}
            </div>
          </div>
        );
      }
    });
    //=======
    timeOutValuation();
  }

  ///=======

  const calculateFinalPrice = async (hash, address) => {
    const finalPrice = props.connecttransaction.calculateFinalPrice(
      hash,
      address
    );
    return finalPrice;
  };
  const finalPrice = async (hash) => {
    const finalPriceProduct = await props.connecttransaction.productInfo(hash);
    return finalPriceProduct;
  };
  const closePhienProduct = async (hash, address) => {
    const closePhien = await props.connecttransaction.closeValuation(
      hash,
      address
    );
    return closePhien;
  };
  async function closePhien(e) {
    // ==============
    await calculateFinalPrice(props.productHash, props.address);
    // ======
    await finalPrice(props.productHash).then((data) => {
      // console.log(data.finalPrice);
      setShowPriceF(
       <div className="show-final-price">
            <div className="text-linear-final-price">
              FinalPrice: {data.finalPrice}
            </div>
          </div>
      );
    });
    //=================================
    await closePhienProduct(props.productHash, props.address);
    //======
    await finalPrice(props.productHash).then((data) => {
      if (data.finalPrice > 0) {
        setShowPriceF(
           <div className="show-final-price">
            <div className="text-linear-final-price">
              FinalPrice: {data.finalPrice}
            </div>
          </div>
        );
      }
    });
  }
  console.log();
  const buttRefresh = async (e) => {
    // console.log('refresh');
    // await setListValuePrice([]);

    let listValuePrice = [];
    setListRenderPrice([]);
    await countPersonPrice().then((count) => {
      for (let i = 0; i < count.evaluatorsCount; i++) {
        getPersionPrice(i).then((dataPerPrice) => {
          listValuePrice.push({
            namePerson: dataPerPrice._name,
            pricePerson: dataPerPrice._price,
          });
        });
      }
      setListRenderPrice(listValuePrice);

      console.log(listRenderPrice);
    });
  };

  function closeClientPhien() {
    props.statusphien(false);
  }

  const timeOutValuation = async () => {
    const time = Math.floor(new Date().getTime() / 1000.0);
    if (props.timeEnd <= time && props.timeEnd !== 0) {
      setShowTimeOut(<div className="show-time-out">Đã hết giờ!</div>);
    }
  };
  useEffect(() => {
    timeOutValuation();
  }, []);

  const ChangeTime = async () => {
    var myDate = new Date(props.timeEnd * 1000);
    let time = myDate.toLocaleString();
    setChuyenDoiTime(time);
  };
  useEffect(() => {
    ChangeTime();
  }, []);

  return (
    <div className="layout-phien-dau-gia">
      <div className="contaier-phien-dau-gia">
        <i
          className="bx bx-x close-client-phien"
          onClick={closeClientPhien}
        ></i>
        <div className="container-left thong-tin-dinh-gia">
          <span
            className="title-container-left"
            style={{ fontWeight: "600", color: "#11ff00" }}
          >
            Thông tin định giá
          </span>
          <div className="border-bottom"></div>
          <div className="time-count">
            <span
              className="text-w-dm"
              style={{ color: "orange", fontWeight: "600" }}
            >
              Time End
            </span>
            <span className="text-w-dm">{chuyenDoiTime}</span>
          </div>
          <div className="container-chill-thong-tin-phien-dinh-gia">
            <div className="container-chill-left-img">
              <img src={`${props.imgProduct}`} alt="" />
            </div>
            <div className="container-chill-right-detail">
              <div className="detail-phien">
                <div
                  className="detail-phien-row"
                  style={{ textAlign: "start" }}
                >
                  <span
                    className="text-w-dm"
                    style={{
                      marginLeft: "20px",
                      marginRight: "10px",
                      color: "#00bfff",
                      fontWeight: "600",
                    }}
                  >
                    Tên sản phẩm:{" "}
                  </span>
                  <span className="text-w-dm">{props.productName}</span>
                </div>
                <div className="detail-phien-row">
                  <span
                    className="text-w-dm"
                    style={{
                      marginRight: "10px",
                      display: "block",
                      color: "#00bfff",
                      fontWeight: "600",
                      textAlign: "start",
                      marginLeft: "20px",
                    }}
                  >
                    Mô tả:{" "}
                  </span>
                  <span
                    className="text-w-dm"
                    style={{
                      display: "block",
                      textAlign: "start",
                      marginLeft: "20px",
                    }}
                  >
                    {props.description}
                  </span>
                </div>

                {inputClientDinhGia}
                {/* <input type="number" className="client-input-dinh-gia" placeholder="Nhap gia tri"/> */}
              </div>
            </div>
          </div>
          {/* <div className="butt-close-phien">Close</div> */}
          {showPriceF}
          {buttCloseOrPost}
          {showTimeOut}
        </div>
        <div className="container-right dinh-gia thong-tin-dinh-gia">
          <div className="refresh" onClick={buttRefresh}>
            <i className="bx bx-refresh"></i>
          </div>
          <span
            className="title-container-left"
            style={{ fontWeight: "600", color: "#11ff00" }}
          >
            Định giá
          </span>
          <div className="border-bottom"></div>
          <div className="container-dinh-gia-client">
            {listRenderPrice.map((value, index) => {
              return (
                <div key={index} className="client-dinh-gia">
                  <PriceValue
                    namePersion={value.namePerson}
                    valuePricePerSion={value.pricePerson}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default phienDauGia;
