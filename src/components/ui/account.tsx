/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/redux/hooks";
import { CHAIN_ID_1 } from "@/utils/constantValues";
import {
  useChains,
  useCollateral,
  useDeposit,
  useLeverage,
  useMarginRatio,
  useMaxQty,
  useWithdraw,
} from "@orderly.network/hooks";
import { API, OrderSide } from "@orderly.network/types";
import { useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { message } from "antd";

const DepositFlow = ({
  depositAmount,
  deposit,
  setDepositPrice,
}: {
  deposit: any;
  depositAmount: string;
  setDepositPrice: (amount: string) => void;
}) => {
  const [processing, setProcessing] = useState(false);
  return (
    <div>
      <div
        style={{
          width: "100%",
          borderRadius: 12,
          background: "#000",
          border: "1px solid #4B4B4B",
          height: "64px",
          padding: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 400,
              font: "Sk-Modernist",
              color: "#4B4B4B",
              textAlign: "left",
            }}
          >
            Deposit amount
          </div>
          <input
            style={{
              fontSize: "18px",
              fontWeight: 700,
              font: "Sk-Modernist",
              background: "transparent",
              outline: "none",
              lineHeight: "21.6px",
              color: "#D4D4D4",
              width: "60%",
              height: "21.6px",
            }}
            value={depositAmount}
            onChange={(e) => setDepositPrice(e.target.value?.toString())}
          />
        </div>
      </div>
      <div
        onClick={async () => {
          if (processing) {
            message.info("Please wait. Tx in processing!!");
          }
          if (parseFloat(depositAmount) == null) return;
          if (Number(deposit.allowance) < Number(depositAmount)) {
            try {
              setProcessing(true);
              await deposit.approve(depositAmount);
              message.info("Spend Approved");
              setProcessing(false);
            } catch (error) {
              message.info(
                "Error on approving!! Please refresh and try again."
              );
              console.log("error on approve", error);
            }
          } else {
            setProcessing(true);
            deposit.setQuantity(depositAmount);
            console.log("here....", parseInt(depositAmount));
            await deposit.deposit();
            message.info("Deposit Successfully done");
            setProcessing(false);
          }
        }}
        style={{
          background: "#1B1B1B",
          border: "solid 1px #FF9900",
          borderRadius: "8px",
          padding: "5px 20px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          color: "#FF9900",
          width: "100%",
          marginTop: 12,
        }}
      >
        {Number(deposit?.allowance) < Number(depositAmount)
          ? "Approve"
          : "Deposit"}
      </div>
    </div>
  );
};
const WithdrawFlow = ({
  withdrawAmount,
  withdraw,
  maxAmount,
  setWithdrawAmount,
}: {
  withdraw: any;
  maxAmount: number;
  withdrawAmount: string;
  setWithdrawAmount: (amount: string) => void;
}) => {
  const [processing, setProcessing] = useState(false);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <div style={{ color: "#4B4B4B", fontSize: 14 }}>Maximum withdraw</div>
        <div style={{ color: "#D4D4D4", fontSize: 14 }}>$ {maxAmount}</div>
      </div>
      <div
        style={{
          width: "100%",
          borderRadius: 12,
          background: "#000",
          border: "1px solid #4B4B4B",
          height: "64px",
          padding: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 400,
              font: "Sk-Modernist",
              color: "#4B4B4B",
              textAlign: "left",
            }}
          >
            Withdraw amount
          </div>
          <input
            style={{
              fontSize: "18px",
              fontWeight: 700,
              font: "Sk-Modernist",
              background: "transparent",
              outline: "none",
              lineHeight: "21.6px",
              color: "#D4D4D4",
              width: "60%",
              height: "21.6px",
            }}
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value?.toString())}
          />
        </div>
      </div>
      <div
        onClick={async () => {
          if (processing) {
            message.info("Please wait. Tx in processing!!");
          }
          if (
            parseFloat(withdrawAmount) < maxAmount &&
            parseFloat(withdrawAmount) > 1
          ) {
            try {
              setProcessing(true);
              await withdraw({
                chainId: parseInt(CHAIN_ID_1),
                amount: withdrawAmount,
                token: "USDC",
                allowCrossChainWithdraw: false,
              });
              setProcessing(false);
            } catch (error) {
              setProcessing(false);
            }
          } else {
            message.error("More than available amount");
          }
        }}
        style={{
          background: "#1B1B1B",
          border: "solid 1px #FF9900",
          borderRadius: "8px",
          padding: "5px 20px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          color: "#FF9900",
          width: "100%",
          marginTop: 12,
        }}
      >
        {processing ? "Withdrawing..." : "Withdraw"}
      </div>
    </div>
  );
};
const Account = ({ markPrice }: { markPrice: number }) => {
  const [showStage, setShowStage] = useState<string>("account");
  const [chains] = useChains("mainnet", {
    filter: (item: API.Chain) =>
      item.network_infos?.chain_id === Number(CHAIN_ID_1),
  });

  const token = useMemo(() => {
    return Array.isArray(chains) ? chains[0].token_infos[0] : undefined;
  }, [chains]);
  const deposit = useDeposit({
    address: token?.address,
    decimals: token?.decimals,
    srcToken: token?.symbol,
    srcChainId: parseInt(CHAIN_ID_1),
  });
  const { withdraw, maxAmount } = useWithdraw();
  console.log(maxAmount);

  const { availableBalance } = useCollateral({ dp: 2 });
  const [maxLeverage, { update, config: leverageLevers }] = useLeverage();

  const { currentLeverage } = useMarginRatio();
  const marketSymbol = useAppSelector((x) => x.market.symbol);
  const maxQty = useMaxQty(marketSymbol, OrderSide.BUY);
  const [depositAmount, setDepositAmount] = useState<string>("100");
  const [showLeverageSlider, setShowLeverageSlider] = useState<boolean>(false);
  const [leverage, setLeverage] = useState<number>(0);

  const renderStages = () => {
    switch (showStage) {
      case "account":
        return (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <div style={{ color: "#4B4B4B", fontSize: 14 }}>Buying Power</div>
              <div style={{ color: "#D4D4D4", fontSize: 14 }}>
                ${maxQty * markPrice}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <div style={{ color: "#4B4B4B", fontSize: 14 }}>
                Available Margin
              </div>
              <div style={{ color: "#D4D4D4", fontSize: 14 }}>
                $ {availableBalance}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                alignItems: "center",
              }}
              onClick={() => setShowLeverageSlider(!showLeverageSlider)}
            >
              <div style={{ color: "#4B4B4B", fontSize: 14 }}>Leverage</div>
              <div
                onClick={async () => {
                  await update({ leverage: leverage });
                  console.log("Updated!!!!!!", leverage);
                }}
                style={{
                  color: "#D4D4D4",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {currentLeverage}x
                <ExpandMoreIcon style={{ marginLeft: 4, fontSize: "small" }} />
              </div>
            </div>
            {showLeverageSlider && (
              <div
                style={{
                  marginTop: "10px",
                  color: "#D4D4D4",
                  fontSize: 14,
                }}
              >
                Adjust leverage slider
                <input
                  type="range"
                  min="1"
                  max={maxLeverage}
                  step={leverageLevers}
                  value={leverage?.toFixed(2)?.toString()}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  style={{
                    width: "100%",
                    WebkitAppearance: "none",
                    appearance: "none",
                    height: "8px",
                    borderRadius: "8px",
                    background: `linear-gradient(to right, #FF9900 0%, #FF9900 ${
                      (leverage - 1) * 11.11
                    }%, #4B4B4B ${(leverage - 1) * 11.11}%, #4B4B4B 100%)`, // Track color
                    outline: "none",
                    opacity: "0.7",
                    transition: "opacity .15s ease-in-out",
                  }}
                />
                <style>{`
                  input[type="range"]::-webkit-slider-thumb {
                    webkitappearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #ff9900; // Thumb color
                    cursor: pointer;
                  }

                  input[type="range"]::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #ff9900; // Thumb color
                    cursor: pointer;
                  }
                `}</style>
                <div>{leverage?.toFixed(2)?.toString()}x</div>
              </div>
            )}
          </div>
        );
      case "deposit":
        return (
          <DepositFlow
            depositAmount={depositAmount}
            setDepositPrice={setDepositAmount}
            deposit={deposit}
          />
        );
      case "withdraw":
        return (
          <WithdrawFlow
            withdrawAmount={depositAmount}
            setWithdrawAmount={setDepositAmount}
            withdraw={withdraw}
            maxAmount={maxAmount}
          />
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "10px 10px",
        paddingTop: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
          paddingBottom: "10px",
          borderBottom: "1px solid #4B4B4B",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#D4D4D4",
            fontFamily: "Sk-Modernist-Bold",
            cursor: "pointer",
          }}
          onClick={() => setShowStage("account")}
        >
          Account
        </div>
        <button
          style={{
            background: "#1B1B1B",
            border: "none",
            borderRadius: "8px",
            padding: "5px 20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            color: "#FF9900",
          }}
          onClick={() =>
            setShowStage((prevStage) =>
              prevStage === "deposit" ? "account" : "deposit"
            )
          }
        >
          {showStage === "deposit" ? "Close" : "Deposit"}
        </button>{" "}
        <button
          style={{
            background: "#1B1B1B",
            border: "none",
            borderRadius: "8px",
            padding: "5px 20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            color: "#FF9900",
          }}
          onClick={() =>
            setShowStage((prevStage) =>
              prevStage === "withdraw" ? "account" : "withdraw"
            )
          }
        >
          {showStage === "withdraw" ? "Close" : "Withdraw"}
        </button>
      </div>
      {renderStages()}
    </div>
  );
};

export default Account;
