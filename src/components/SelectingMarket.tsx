import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { change24hour, change24hourPercent, parseString } from "@/utils/helper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setVolume24h,
  setIndexPrice,
  setChange24hPercent,
  setMarketSymbol,
  setOpenInterest,
  setMarkPrice,
  setFundingRate8h,
} from "@/redux/slices/marketSlice";
import { Row } from "@/types";
import { formatLargeNumber } from "@/utils/format";
import "../App.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import the icon
import SearchIcon from "@mui/icons-material/Search"; // Import the search icon
import { useFundingRate, usePositionStream } from "@orderly.network/hooks";

interface SelectingMarketProps {
  // Define prop types here
}

const fetcher = (...arg: [string, RequestInit?]) => {
  return fetch(...arg).then((res) => res.json());
};

const SelectingMarket: React.FC<SelectingMarketProps> = () => {
  const marketInfo = useAppSelector((state) => state.market);
  const { data } = useSWR(
    "https://api-evm.orderly.network/v1/public/futures",
    fetcher,
    { refreshInterval: 1000 }
  );

  const [market, setMarket] = useState("BTC");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useAppDispatch();
  const [positionData] = usePositionStream(marketInfo?.symbol);
  const fundingRate = useFundingRate(marketInfo?.symbol);
  let positionSize = 0;
  if (positionData?.rows) {
    positionSize = positionData.rows.reduce(
      (total, position) => total + position.position_qty,
      0
    );
  }
  const rate = fundingRate;
  function handleSelect(symbol: string) {
    setMarket(symbol);
    setIsSelectorOpen(false);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const selectedMarket = data.data.rows.find(
        (row: Row) => parseString(row.symbol) === market
      );
      if (selectedMarket) {
        console.log(
          "check market......",
          positionData?.rows,
          positionSize,
          selectedMarket?.mark_price,
          parseFloat(rate?.est_funding_rate)
        );
        dispatch(setIndexPrice(selectedMarket.index_price));
        dispatch(
          setFundingRate8h(
            positionSize *
              selectedMarket?.mark_price *
              parseFloat(rate?.est_funding_rate)
          )
        );
        dispatch(
          setChange24hPercent(
            change24hourPercent(
              selectedMarket["24h_open"],
              selectedMarket["24h_close"]
            )
          )
        );
        dispatch(setVolume24h(selectedMarket["24h_volume"]));
        dispatch(setMarketSymbol(selectedMarket["symbol"]));
        dispatch(setOpenInterest(selectedMarket["open_interest"]));
        dispatch(setMarkPrice(selectedMarket["mark_price"]));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data, market]);

  const filteredData =
    data?.data?.rows
      ?.filter((item: Row) =>
        item.symbol.toLowerCase().includes(searchInput.toLowerCase())
      )
      .sort(
        (a: Row, b: Row) =>
          b["24h_volume"] * b.mark_price - a["24h_volume"] * a.mark_price
      ) || [];

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        paddingLeft: "0px",
        fontFamily: "Sk-Modernist-Regular, sans-serif",
      }}
    >
      <div className="select">
        <div
          className="select-trigger"
          style={{
            border: "none",
            display: "flex",
            gap: "8px",
            cursor: "pointer",
            color: "white",
            marginRight: "3rem",
            alignItems: "center",
          }}
          onClick={() => setIsSelectorOpen(!isSelectorOpen)}
        >
          <img
            src={`https://oss.orderly.network/static/symbol_logo/${market}.png`}
            alt=""
            style={{ width: "32px" }}
          />
          <span
            style={{
              fontWeight: "500",
              fontSize: "1.25rem",
              fontFamily: "Sk-Modernist-Bold",
            }}
          >
            {market}/USD
          </span>
          {!isSelectorOpen && (
            <ExpandMoreIcon
              style={{
                color: "white",
                alignSelf: "center",
              }}
            />
          )}
        </div>
        {isSelectorOpen && (
          <div
            className="select-content"
            style={{
              position: "absolute",
              backgroundColor: "BLACK",
              borderRadius: "4px",
              zIndex: 1000,
              height: "32%",
              overflowX: "auto",
              paddingTop: "2%",
              color: "white",
              marginLeft: "-20px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "96%",
                marginBottom: "8px",
                marginLeft: "2%",
              }}
            >
              <SearchIcon
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "8px",
                  transform: "translateY(-50%)",
                  color: "#606060",
                }}
              />
              <input
                type="text"
                placeholder="Search by symbol"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 24px 8px 40px",
                  fontFamily: "Sk-Modernist-Regular",
                  borderRadius: "8px",
                  backgroundColor: "#1E1E1E",
                  color: "white",
                  border: "none",
                }}
              />
            </div>
            <div className="table-container" style={{ overflowX: "auto" }}>
              <table
                style={{ fontFamily: "Sk-Modernist-Regular", width: "100%" }}
                className="scrollbar-hide"
              >
                <thead className="scrollbar-hide">
                  <tr
                    style={{
                      border: "none",
                      textAlign: "left",
                      fontFamily: "Sk-Modernist-Regular",
                    }}
                  >
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                      }}
                    >
                      Symbol
                    </th>
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                      }}
                    >
                      24h Chg
                    </th>
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                      }}
                    >
                      24hr Chg(%)
                    </th>
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                      }}
                    >
                      Volume
                    </th>
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                      }}
                    >
                      Open Interest
                    </th>
                    {/* <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                      }}
                    >
                      8h Funding Rate
                    </th> */}
                  </tr>
                </thead>

                <tbody className="scrollbar-hide">
                  {filteredData?.map((item: Row) => (
                    <tr
                      key={item.symbol}
                      style={{ border: "none", cursor: "pointer" }}
                      onClick={() =>
                        handleSelect(parseString(item.symbol) || "")
                      }
                    >
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          fontFamily: "Sk-Modernist-Regular",
                          fontSize: "1rem",
                          marginRight: "1rem",
                          padding: "8px 24px",
                        }}
                      >
                        <img
                          src={`https://oss.orderly.network/static/symbol_logo/${
                            parseString(item.symbol) || "default"
                          }.png`}
                          alt=""
                          style={{ width: "32px" }}
                        />
                        {parseString(item.symbol)}
                      </td>
                      <td style={{ padding: "8px 24px" }}>
                        ${item.mark_price}
                      </td>
                      <td
                        className={
                          change24hour(item["24h_open"], item["24h_close"]) > 0
                            ? "price-up"
                            : "price-down"
                        }
                        style={{
                          padding: "8px 24px",
                          transition: "color 0.5s",
                        }}
                      >
                        ${change24hour(item["24h_open"], item["24h_close"])}
                      </td>
                      <td
                        className={
                          change24hourPercent(
                            item["24h_open"],
                            item["24h_close"]
                          ) > 0
                            ? "price-up"
                            : "price-down"
                        }
                        style={{
                          padding: "8px 24px",
                          transition: "color 0.5s",
                        }}
                      >
                        {change24hourPercent(
                          item["24h_open"],
                          item["24h_close"]
                        )}
                        %
                      </td>
                      <td style={{ padding: "8px 24px" }}>
                        $
                        {formatLargeNumber(
                          item["24h_volume"] * item.mark_price
                        )}
                      </td>
                      <td style={{ padding: "8px 24px" }}>
                        $
                        {formatLargeNumber(
                          item["open_interest"] * item.mark_price
                        )}
                      </td>
                      {/* <td style={{ padding: "8px 24px" }}>
                        {item["24h_volume"]}%
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectingMarket;
