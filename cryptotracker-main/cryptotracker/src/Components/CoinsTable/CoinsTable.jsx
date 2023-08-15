import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { CoinList } from "../../Configuration/Api";
import { CryptoState } from "../../CryptoContext";
import { Link } from "react-router-dom";
import "./CoinsTable.css";



export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  

const CoinsTable=()=>{

    

    const {currency}= CryptoState();

    const [search, setSearch] = useState('');
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const [page, setPage] = useState(1);
  
    // const[page, setPage] = useState(1);
  
    // const[items, setItems] = useState([]);
    // const[pagesize, setPageSize] = useState(5);
    // const[currentpage, setCurrentPage] = useState(0);
    // const[currentItems, setCurrentItems] = useState(items.slice(0, pagesize));
    // const[pagecount, setPageCount] = useState(Math.ceil(items.length/pagesize));
  
    const onPageChange = (pageNumber) => {
      if (
        pageNumber >= 1 &&
        pageNumber <= handleSearch().length / 25 &&
        pageNumber != page
      )
        setPage(pageNumber);
    };
  
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const data = await fetch(CoinList(currency)).then((res) => res.json());
        if (data) {
          setCoins(data);
          // console.log(data);
          // setItems(data).fill(null).map((_, i) => i);
          // setItems(data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      fetchCoins();
    }, [currency]);
  
    const handleSearch = () => {
      const filterdata = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
      return filterdata;
    };
  
    return (
      <div className="coinstable">
        <h1 className="coinstable_title">CryptoCurrency Prices by Market Cap</h1>
      
        {loading ? (
          <div className="loading_bars">
            {' '}
            <Bars
              height="80"
              width="80"
              color="white"
              ariaLabel="bars-loading"
              wrapperStyle={{ alignContent: 'center' }}
              wrapperClass=""
              visible={true}
              // className="loading_bars"
            />{' '}
          </div>
        ) : (
          <div className="table_scroll">
            <table className="all-tables">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Coin</th>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th>24h - Change</th>
                  {/* <th>head2</th> */}
                </tr>
              </thead>
  
              <tbody>
                {handleSearch()
                  .slice(page * 25 - 25, page * 25)
                  .map((coin) => {
                    let profit = coin.price_change_percentage_24h > 0;
                    return (
                      <tr className="dat" key={coin.id}>
                        <td>{coin.market_cap_rank}</td>
                        <td>
                          <Link
                            className="link"
                            to={`./coins/${coin.id}`}
                            key={coin.id}
                          >
                            <div className="table_logo">
                              <img
                                src={coin?.image}
                                className="coinstable_logo"
                                alt={coin?.name}
                              />
  
                              <div className="coin_data">
                                <span>{coin.name}</span>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <span>{coin.symbol.toUpperCase()}</span>
                        </td>
                        <td>
                          {currency === 'INR' ? '₹' : '$'}{' '}
                          {numberWithCommas(coin?.current_price.toFixed(2))}
                        </td>
                        <td>
                          {currency === 'INR' ? '₹' : '$'}{' '}
                          {numberWithCommas(
                            coin.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </td>
                        <td
                          className={profit > 0 ? 'crypto-profit' : 'crypto-loss'}
                        >
                          {profit && '+'}{' '}
                          {coin?.price_change_percentage_24h?.toFixed(2)} %
                        </td>
                      </tr>
                    );
                    {
                      /* </Link> */
                    }
                  })}
              </tbody>
  
              <tfoot>
                <tr>
                  <td colSpan="6">
                    <div>
                      <button
                        className={page>1 ? "foot__btn":"foot__btn__disable"}
                        onClick={() => onPageChange(page - 1)}
                      >
                        Prev
                      </button>
                      {[...Array(handleSearch().length / 25)].map((_, i) => (
                        <button
                          onClick={() => onPageChange(i + 1)}
                          className={page === i + 1 ? 'active-btn' : 'foot__btn'}
                          key={i}
                        >
                          {i + 1}
                        </button>
                      ))}
  
                      <button
                        className={page<handleSearch().length/25 ? "foot__btn":"foot__btn__disable"}
                        onClick={() => onPageChange(page + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
  
              {/* <tfoot>
            <tr>
            <td colSpan="6">
            <div className="links">
              <button className="inactive-btn" onClick={() => onPageChange(currentpage-1)} disabled={currentpage === 0} >&laquo; Prev</button> 
              {Array(pagecount).fill(null).map((page, index) => (
                <button className={`${currentpage === index ? "active-btn" :"inactive-btn"}`} key={index} onClick={() => onPageChange(index)}>{index+1}</button>
              ))}
              <button className="inactive-btn" onClick={() => onPageChange(currentpage+1)} disabled={currentpage===pagecount-1}>Next &raquo;</button>
            </div>
            </td>
            </tr>
          </tfoot> */}
            </table>
            {/* {console.log(items)} */}
          </div>
        )}
      </div>
    );

}

export default CoinsTable;