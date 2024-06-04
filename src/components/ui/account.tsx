import React from "react";

const Account: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "10px 10px",
        paddingTop:'0px'
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
          paddingBottom:'10px',
          borderBottom: "1px solid #4B4B4B",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#D4D4D4",
            fontFamily:'Sk-Modernist-Bold',
          }}
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
        >
          Deposit
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <div style={{ color: "#4B4B4B" ,fontSize:14}}>Buying Power</div>
        <div style={{ color: "#D4D4D4" ,fontSize:14}}>$10,000</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <div style={{ color: "#4B4B4B",fontSize:14 }}>Available Margin</div>
        <div style={{ color: "#D4D4D4",fontSize:14 }}>$5,000</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "#4B4B4B",fontSize:14}}>Leverage</div>
        <div style={{ color: "#D4D4D4",fontSize:14 }}>10x</div>
      </div>
    </div>
  );
};

export default Account;



