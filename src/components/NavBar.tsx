import { useState } from "react";
import logo from "../assets/logo.svg";
import WalletConnectButton from "./WalletConnectButton";
import "../App.css";

const tabs = ["Trade", "Docs", "Leaderboard", "Mobile App"];

const handleTabClick = (text: string, setSelected: (text: string) => void) => {
  switch (text) {
    case "Docs":
      window.open("https://docs.xade.finance");
      break;
    case "Leaderboard":
      window.open("https://app.orderly.network/");
      break;
    case "Mobile App":
      window.open("https://bit.ly/xadefinance");
      break;
    default:
      setSelected(text);
  }
};

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
  customID?: string;
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
  return (
    <button
      onClick={() => handleTabClick(text, setSelected)}
      className={` ${selected ? "text-white" : " "}
                relative rounded-md px-2 py-8 text-sm font-medium text-gray-500 transition-colors duration-300 focus-within:outline-red-500/50`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <div className="absolute left-0 top-0 flex size-full h-full w-full items-end justify-center">
          <span className="z-0 h-[2px] w-[80%] rounded-t-full bg-white"></span>
        </div>
      )}
    </button>
  );
};

interface NavBarProps {
  center?: boolean;
  customID?: string;
}

const NavBar = ({ center, customID }: NavBarProps) => {
  const [selected, setSelected] = useState<string>(tabs[0]);
  const isMobile = window.innerWidth <= 768;

  return (
    <div
      className={`navbar ${center ? "justify-center" : ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <div
        className="navbar-content"
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: isMobile ? "space-between" : "flex-start",
          flexDirection: isMobile ? "row" : "row",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="navbar-logo"
          style={{ marginLeft: "20px", marginRight: isMobile ? "auto" : "40px" }}
        />
        {!isMobile && (
          <div
            className="tabs"
            style={{
              display: "flex",
              gap: "16px",
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            {tabs.map((tab) => (
              <Tab
                text={tab}
                selected={selected === tab}
                setSelected={setSelected}
                key={tab}
                customID={customID}
              />
            ))}
          </div>
        )}
        <div style={{ marginRight: "20px" }}>
          <div
            style={{
              padding: isMobile ? "5px 10px" : "10px 20px",
              fontSize: isMobile ? "0.8rem" : "1rem",
            }}
          >
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
