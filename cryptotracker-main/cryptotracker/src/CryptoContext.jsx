import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoReact = ({  children }) => {

    const[currency,setCurrency]=useState("INR");
    const[symbol,setSymbol]=useState("₹");


    useEffect(()=>{

        if(currency==="INR"){
            setSymbol("₹");
        }
        else if(currency==="USD"){
            setSymbol("$");
        }

    },[currency]

    )
  


  return (
    <Crypto.Provider value={{currency,symbol,setCurrency}} >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoReact;

export const CryptoState = () => {
  return useContext(Crypto);
};