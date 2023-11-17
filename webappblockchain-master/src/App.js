/* eslint-disable no-const-assign */
/* eslint-disable react/jsx-no-undef */
import './App.css';
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";
import Login from './pages/login'
import InfoApp from './pages/infoApp'
import Home from './pages/home'
import { useEffect, useState } from 'react';
// import home from './pages/home';

import Web3Connection from './web3/Web3'

import Nav from './components/nav'


function App() {
  const [userName, setUserName] = useState('');
  const [isAccAdmin, setIsAccAdmin] = useState();
  const [address, setAddress] = useState();

  let connectWeb3 = new Web3Connection();


  // console.log(userName);
  const isAdmin = (isadmin) => {
    setIsAccAdmin(isadmin);
  }


  const getAddress = (address) => {
    return setAddress(address)
  }
  // console.log(address);
  const nameU = async () => {
    const userNa = await connectWeb3.userInfo(address)
    return userNa
  }
  useEffect(() => {
    nameU().then(data => {
      setUserName(data.name)
    })
  })
  return (

    <div className="App">
      < Nav username={userName} connecttransaction={connectWeb3} address={address} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>
            <Login isadmin={isAdmin} connecttransaction={connectWeb3} address={getAddress} />
            <InfoApp />
          </>} />
          <Route path="/home" element={<Home isadmin={isAccAdmin} connecttransaction={connectWeb3} address={address} />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
