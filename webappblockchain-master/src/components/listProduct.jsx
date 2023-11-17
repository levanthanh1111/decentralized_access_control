/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from "react";

// import scss
import ".././assets/custom/scss/listproduct.scss";

//import component
import Product from ".././components/product";
import PhienDauGia from "./phienDauGia";

const listProduct = (props) => {
  const [componentPhienDinhGia, setComponentPhienDinhGia] = useState();
  const [listProduct, setListProduct] = useState([]);
  const [dataListProduct, setDataListProduct] = useState([]);
  // const [renderListProduct, setRenderListProduct] = useState(<></>);

  const productCount = async () => {
    const count = await props.connecttransaction.productCount();
    // console.log(count);
    return count;
  };
 

  const productArray = async (index) => {
    const ArrProduct = await props.connecttransaction.productArray(index);
    // console.log(ArrProduct);
    return ArrProduct;
  };
  const productInfo = async (hash) => {
    const infoProduct = await props.connecttransaction.productInfo(hash);
    console.log(infoProduct);
    return infoProduct;
  };

  useEffect(() => {
    let countProduct = 0;
    const createInterval = setInterval(() => {
      productCount().then((count) => {
        //======
        // console.log(count);
        if (countProduct !== count) {
          for (let i = countProduct; i < count; i++) {
            productArray(i).then((hash) => {
              productInfo(hash).then((dataproduct) => {
                setListProduct([
                  ...listProduct,
                  listProduct.push({
                    nameProduct: dataproduct.name,
                    imgProduct: `https://ipfs.io/ipfs/${dataproduct.ipfs}`,
                    timeEnd: dataproduct.timeEnd,
                    productHash: dataproduct.productHash,
                    description: dataproduct.description,
                  }),
                ]);
              });
            });
            countProduct = count;
          }
        }
      });
    }, 1000);
    setDataListProduct(listProduct)
  
    return () => {
      clearInterval(createInterval);
    };
  },[]);
  

  const getEventShowPhienDinhGia = (
    producthash,
    nameproduct,
    imgproduct,
    timeend,
    description
  ) => {
    setComponentPhienDinhGia(
      <PhienDauGia
        productName={nameproduct}
        productHash={producthash}
        imgProduct={imgproduct}
        timeEnd={timeend}
        description={description}
        connecttransaction={props.connecttransaction}
        statusphien={statusPhien}
        address={props.address}
      />
    );
    console.log("ok");
  };

  const statusPhien = (status) => {
    if (!status) {
      setComponentPhienDinhGia(<></>);
    }
  };
  return (
    <div className="layout-list-product">
      {dataListProduct.map((product, index) => {
        return (
          <Product
            key={index}
            nameProduct={product.nameProduct}
            imgProduct={product.imgProduct}
            timeEnd={product.timeEnd}
            productHash={product.productHash}
            description={product.description}
            geteventshowphiendinhgia={getEventShowPhienDinhGia}

          />
        );
      })}
      {componentPhienDinhGia}
    </div>
  );
};

export default listProduct;
