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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useFundingRate } from "@orderly.network/hooks";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({ key: "24h_volume", direction: "desc" });
  const dispatch = useAppDispatch();

  const fundingRate = useFundingRate(marketInfo?.symbol);

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
        dispatch(setIndexPrice(selectedMarket.index_price));
        dispatch(setFundingRate8h(fundingRate?.est_funding_rate));
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

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!data?.data?.rows) return [];
    const sorted = [...data.data.rows];
    sorted.sort((a: Row, b: Row) => {
      if (sortConfig.key === "symbol") {
        if (sortConfig.direction === "asc") {
          return a.symbol.localeCompare(b.symbol);
        } else {
          return b.symbol.localeCompare(a.symbol);
        }
      } else if (sortConfig.key === "mark_price") {
        if (sortConfig.direction === "asc") {
          return a.mark_price - b.mark_price;
        } else {
          return b.mark_price - a.mark_price;
        }
      } else if (sortConfig.key === "24h_volume") {
        if (sortConfig.direction === "asc") {
          return a["24h_volume"] * a.mark_price - b["24h_volume"] * b.mark_price;
        } else {
          return b["24h_volume"] * b.mark_price - a["24h_volume"] * a.mark_price;
        }
      } else if (sortConfig.key === "24h_change") {
        if (sortConfig.direction === "asc") {
          return change24hour(a["24h_open"], a["24h_close"]) - change24hour(b["24h_open"], b["24h_close"]);
        } else {
          return change24hour(b["24h_open"], b["24h_close"]) - change24hour(a["24h_open"], a["24h_close"]);
        }
      } else if (sortConfig.key === "24h_change_percent") {
        if (sortConfig.direction === "asc") {
          return change24hourPercent(a["24h_open"], a["24h_close"]) - change24hourPercent(b["24h_open"], b["24h_close"]);
        } else {
          return change24hourPercent(b["24h_open"], b["24h_close"]) - change24hourPercent(a["24h_open"], a["24h_close"]);
        }
      } else if (sortConfig.key === "open_interest") {
        if (sortConfig.direction === "asc") {
          return a["open_interest"] * a.mark_price - b["open_interest"] * b.mark_price;
        } else {
          return b["open_interest"] * b.mark_price - a["open_interest"] * a.mark_price;
        }
      }
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter((item: Row) =>
    item.symbol.toLowerCase().includes(searchInput.toLowerCase())
  );

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
          {isSelectorOpen ? (
            <ExpandLessIcon
              style={{
                color: "white",
                alignSelf: "center",
              }}
            />
          ) : (
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
              color: "white",
              marginLeft: "-20px",
            }}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                marginTop:'2%',
                marginBottom: "8px",
                marginLeft: "2%",
                marginRight: "2%",
                backgroundColor: "BLACK",
                zIndex: 1001,
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
                        color: "#4b4b4b",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSort("symbol")}
                    >
                      Symbol
                      {sortConfig.key === "symbol" && sortConfig.direction === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.key === "symbol" && sortConfig.direction === "desc" ? (
                        <ArrowDropDownIcon />
                      ) : (
                        ""
                      )}
                    </th>
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                        color: "#4b4b4b",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSort("mark_price")}
                    >
                      Price
                      {sortConfig.key === "mark_price" && sortConfig.direction === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.key === "mark_price" && sortConfig.direction === "desc" ? (
                        <ArrowDropDownIcon />
                      ) : (
                        ""
                      )}
                    </th>
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                        color: "#4b4b4b",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSort("24h_change")}
                    >
                      24h Chg
                      {sortConfig.key === "24h_change" && sortConfig.direction === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.key === "24h_change" && sortConfig.direction === "desc" ? (
                        <ArrowDropDownIcon />
                      ) : (
                        ""
                      )}
                    </th>
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                        color: "#4b4b4b",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSort("24h_change_percent")}
                    >
                      24hr Chg(%)
                      {sortConfig.key === "24h_change_percent" && sortConfig.direction === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.key === "24h_change_percent" && sortConfig.direction === "desc" ? (
                        <ArrowDropDownIcon />
                      ) : (
                        ""
                      )}
                    </th>
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                        color: "#4b4b4b",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSort("24h_volume")}
                    >
                      Volume
                      {sortConfig.key === "24h_volume" && sortConfig.direction === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.key === "24h_volume" && sortConfig.direction === "desc" ? (
                        <ArrowDropDownIcon />
                      ) : (
                        ""
                      )}
                    </th>
                    <th
                      style={{
                        padding: "8px 24px",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                        color: "#4b4b4b",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSort("open_interest")}
                    >
                      Open Interest
                      {sortConfig.key === "open_interest" && sortConfig.direction === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : sortConfig.key === "open_interest" && sortConfig.direction === "desc" ? (
                        <ArrowDropDownIcon />
                      ) : (
                        ""
                      )}
                    </th>
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
                          src={`https://oss.orderly.network/static/symbol_logo/${parseString(item.symbol) || "default"
                            }.png`}
                          alt=""
                          style={{ width: "32px" }}
                        />
                        {parseString(item.symbol)}
                      </td>
                      <td style={{ padding: "8px 24px" }}>
                        ${item.mark_price.toLocaleString()}
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
                        ${change24hour(item["24h_open"], item["24h_close"]).toLocaleString()}
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
                        ).toLocaleString()}
                        %
                      </td>
                      <td style={{ padding: "8px 24px" }}>
                        $
                        {formatLargeNumber(
                          item["24h_volume"] * item.mark_price
                        ).toLocaleString()}
                      </td>
                      <td style={{ padding: "8px 24px" }}>
                        $
                        {formatLargeNumber(
                          item["open_interest"] * item.mark_price
                        ).toLocaleString()}
                      </td>
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