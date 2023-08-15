import { Typography } from "@mui/material";
import { Container, fontFamily } from "@mui/system";
import React from "react";
import "./Banner.css";
import Courosel from "./Courosel";
const Banner=()=>{

    return(
        <>
  
        <div className="banner">



        <h1 className="banner_title">CRYPTO HUNTER</h1>
        <h4 className="banner_subtitle">Top 10 Trending CryptoCurrencies</h4>

        <Courosel></Courosel>

        </div>

        </>
    )
 
}

export default Banner;

