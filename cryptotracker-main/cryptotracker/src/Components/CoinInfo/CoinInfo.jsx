

import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../../Configuration/Api";
import { CryptoState } from "../../CryptoContext";
import { Line } from "react-chartjs-2";
import { Circles } from "react-loader-spinner";
import { Chart, registerables } from 'chart.js';
import "./CoinInfo.css";
Chart.register(...registerables);

const CoinInfo=({coin})=>{

    const[historicData,setHistoricData]=useState();
    const[days,setDays]=useState();

    const {currency}=CryptoState();

    const fetchHistoricData=async()=>{
        const {data}=await axios.get(HistoricalChart(coin.id,days,currency));

        setHistoricData(data.prices);
    }

    useEffect(()=>{
        fetchHistoricData();
    },[currency,days])

    return(


        <div className="coin-info">
      {
        !historicData ? (<Circles
          height="80"
          width="80"
          color="white"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />) : 
        (
          <>
            <Line data={{
              labels:historicData.map((coin) => {
                let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets:[{
                data:historicData.map((coin) => coin[1]),
                label:`Price(Past ${days} Days) in ${currency}`,
                borderColor: "#EEBC1D",
              }]
            }}
            options={{
              elements:{
                point:{
                  radius:1
                }
              }
            }} />
          </>
        )
      }
      <br/>
      <div className="graph_buttons">
        <button className={days===1 ? "graph_btn_active":"graph_btn"} onClick={() => setDays(1)}>24 Hours</button>
        <button className={days===30 ? "graph_btn_active":"graph_btn"} onClick={() => setDays(30)}>30 Days</button>
        <button className={days===90 ? "graph_btn_active":"graph_btn"} onClick={() => setDays(90)}>3 Months</button>
        <button className={days===365 ? "graph_btn_active":"graph_btn"} onClick={() => setDays(365)}>1 Year</button>
      </div>

     </div>
        
    )

}

export default CoinInfo;