import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../Configuration/Api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import parse from 'html-react-parser';
import { Circles } from "react-loader-spinner";
import "./CoinPage.css";
import CoinInfo from "../Components/CoinInfo/CoinInfo";

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const CoinPage=()=>{
     
    const {id} =useParams();
    const [coin,setCoin]=useState();

    const {currency,symbol}=CryptoState();

    const fetchCoin=async()=>{
        const {data}= await axios.get(SingleCoin(id));

        setCoin(data);
    }


    useEffect(()=>{
        fetchCoin(); 
    },[])

    
    if(!coin) return <div className="load_circle"><Circles
    height="80"
    width="80"
    color="white"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  /></div>
    
    const coinImage=coin?.image?.large;

    return(

        <div className="coin_page" >
           <div className="width">
           <div className="top_bar" >
           <img src={coinImage}  alt={coin?.name}  className="coinpage_image" ></img>
           <h1>{coin?.name}</h1>
           <h4 className="coin_description">{parse(coin?.description.en.split(". ")[0])}.</h4>
           <span><b>Rank : </b>{coin?.market_cap_rank}</span>
          <span><b>Current Price : </b>{currency==="INR" ? "₹" : "$"} {numberWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])}
          </span>
          <span><b>Market Cap: </b> {currency==="INR" ? "₹" : "$"} {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}<b>M</b> </span>

           </div>
           <hr className="line"/>
           <div className="chart">
            <CoinInfo coin={coin}/>
           </div>
           </div>
      

        </div>

    )


}

export default CoinPage;