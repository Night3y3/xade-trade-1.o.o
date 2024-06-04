/* eslint-disable @typescript-eslint/no-explicit-any */
import { CHAIN_ID } from "@/utils/constantValues";
import { useChains, useDeposit } from "@orderly.network/hooks";
import { API } from "@orderly.network/types";
import React, { useMemo, useState } from "react";
import { useAccount } from "wagmi";

const DepositFlow = ({
    depositAmount,
    deposit,
    setDepositPrice,
}: {
    deposit: any;
    depositAmount: string;
    setDepositPrice: (amount: string) => void;
}) => {
    return (
        <div>
            <div
                style={{
                    width: "90%",
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
                style={{
                    background: "#1B1B1B",
                    border: "solid 1px #FF9900",
                    borderRadius: "8px",
                    padding: "5px 20px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#FF9900",
                    width: "90%",
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

const Account = () => {
    const { isConnected } = useAccount();
    const [showStage, setShowStage] = useState<string>(
        isConnected ? "account" : "deposit"
    );
    const [chains] = useChains("testnet", {
        filter: (item: API.Chain) =>
            item.network_infos?.chain_id === Number(CHAIN_ID),
    });

    const token = useMemo(() => {
        return Array.isArray(chains) ? chains[0].token_infos[0] : undefined;
    }, [chains]);

    const deposit = useDeposit({
        address: token?.address,
        decimals: token?.decimals,
        srcToken: token?.symbol,
        srcChainId: Number(CHAIN_ID),
    });
    // const { unsettledPnL } = useWithdraw();
    console.log("deposit.....", deposit);
    const [depositAmount, setDepositAmount] = useState<string>("100");
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
                            <div style={{ color: "#D4D4D4", fontSize: 14 }}>$10,000</div>
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
                            <div style={{ color: "#D4D4D4", fontSize: 14 }}>$5,000</div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ color: "#4B4B4B", fontSize: 14 }}>Leverage</div>
                            <div style={{ color: "#D4D4D4", fontSize: 14 }}>10x</div>
                        </div>
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
                        color: "#959595",
                    }}
                    onClick={() => setShowStage("deposit")}
                >
                    Deposit
                </button>
            </div>
            {renderStages()}
        </div>
    );
};

export default Account;