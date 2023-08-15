
import { AppBar, Select, Toolbar, Typography ,MenuItem} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./Header.css"
import {Link} from "react-router-dom"
import { CryptoState } from "../CryptoContext";


const Header=()=>{

     const {currency,setCurrency}=CryptoState();

     const changeSelect=(event)=>{
                setCurrency(event.target.value);
     }

      return (
        <div className="header">

        <AppBar color='transparent' position="static" >
            <Container>
            <Toolbar>
            <Link to="/" >
            <Typography className="header_text">
                    CRYPTO HUNTER
                    </Typography>

            </Link>
                
                    <Select  value={currency} onChange={changeSelect} variant="outlined" className="selectButton" >
                        <MenuItem  value="INR" style={{ color:"white"  }} >INR</MenuItem>
                        <MenuItem value="USD" style={{color:"white"}} >USD</MenuItem>
                    </Select>
               
            </Toolbar>

            </Container>
        </AppBar>





        </div>
      )
}


{/* 
        <div className="header_navbar">
            <h1 className="crypto_text" >CRYPTO TRACKER</h1>
        </div>


   */}

export  default Header;