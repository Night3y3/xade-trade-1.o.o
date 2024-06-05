import { useOrderbookStream } from "@orderly.network/hooks";

import "./index.css";

const Orderbook = ({ symbol }: { symbol: string }) => {
  const [data, { isLoading }] = useOrderbookStream(symbol, undefined, {
    level: 10,
  });

  return (
    <div
      style={{
        maxHeight: "100%",
        width: "100%",
        borderLeft: "1px solid #3B3B3B",
        borderBottom: "1px solid #3B3B3B",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          border: "1px solid #3B3B3B",
          padding: "8px",
          borderTop: 0,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            color: "#4B4B4B",
            textAlign: "left",
            fontFamily: "Sk-Modernist-Regular",
            width: "30%",
          }}
        >
          Size
        </div>
        <div
          style={{
            color: "#4B4B4B",
            textAlign: "right",
            fontFamily: "Sk-Modernist-Regular",
            width: "30%",
          }}
        >
          Price
        </div>
        <div
          style={{
            color: "#4B4B4B",
            textAlign: "right",
            fontFamily: "Sk-Modernist-Regular",
            width: "30%",
          }}
        >
          Mine
        </div>
      </div>
      {!isLoading && (
        <div style={{ width: "100%" }}>
          {data.asks
            ?.filter(([price]) => !Number.isNaN(price))
            .map(([price, quantity, aggregated]) => {
              const gradient = (100 * aggregated) / data.asks[0][2];
              return (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                        marginLeft: 12,
                        fontSize: 12,
                      }}
                    >
                      {quantity}
                    </div>
                    <div
                      style={{
                        color: "white",
                        textAlign: "right",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                        fontSize: 12,
                      }}
                    >
                      {price}
                    </div>
                    <div
                      style={{
                        color: "white",
                        background: `linear-gradient(to left, #402222 ${gradient}%, transparent ${gradient}%)`,
                        textAlign: "right",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                      }}
                    />
                  </div>
                  {/* <Box className="ask">{price}</Box>
                  <Box>{quantity}</Box>
                  <Box
                    style={{
                      background: `linear-gradient(to left, rgba(161, 6, 6, 0.8) ${gradient}%, transparent ${gradient}%)`,
                    }}
                  >
                    {aggregated}
                  </Box> */}
                </>
              );
            })}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid #3B3B3B",
              borderTop: "1px solid #3B3B3B",
              padding: "8px",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                color: "#fff",
                textAlign: "left",
                fontFamily: "Sk-Modernist-Bold",
                width: "30%",
                fontSize: "18px",
              }}
            >
              {data?.markPrice}
            </div>
          </div>
          {data.bids
            ?.filter(([price]) => !Number.isNaN(price))
            .map(([price, quantity, aggregated]) => {
              const gradient = (100 * aggregated) / data.asks[0][2];
              return (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                        marginLeft: 12,
                        fontSize: 12,
                      }}
                    >
                      {quantity}
                    </div>
                    <div
                      style={{
                        color: "white",
                        textAlign: "right",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                        fontSize: 12,
                      }}
                    >
                      {price}
                    </div>
                    <div
                      style={{
                        color: "white",
                        background: `linear-gradient(to left, #285139 ${gradient}%, transparent ${gradient}%)`,
                        textAlign: "right",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                      }}
                    />
                  </div>
                  {/* <Box className="ask">{price}</Box>
                <Box>{quantity}</Box>
                <Box
                  style={{
                    background: `linear-gradient(to left, rgba(161, 6, 6, 0.8) ${gradient}%, transparent ${gradient}%)`,
                  }}
                >
                  {aggregated}
                </Box> */}
                </>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Orderbook;
