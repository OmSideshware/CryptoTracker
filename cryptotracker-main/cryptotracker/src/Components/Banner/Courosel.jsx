import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../../Configuration/Api";
import { Link } from "react-router-dom";
import "./Courosel.css";


export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Courosel = () => {
  const [trend, setTrend] = useState([]);

  const { currency,symbol } = CryptoState();

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrend(data);
    } catch (error) {
      console.log("Error fetching trending coins:", error);
      // Handle the error or set a default value for trend
      setTrend([]);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trend.map((coin) => {

    let profit=coin.market_cap_change_percentage_24h>=0;
    return(
    
    <Link className="courosel_item"     to={`./coins/${coin.id}`} key={coin.id}>
      <img 
        src={coin?.image}
        alt={coin?.name}
        height="80"
        style={{ marginBottom: 10  }}
      />

        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>

    </Link>

    )
});

  return (
    <>
      <div className="carousel">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
      </div>
    </>
  );
};

export default Courosel;
