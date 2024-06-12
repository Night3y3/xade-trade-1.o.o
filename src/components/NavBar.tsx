import { useState } from "react";
import logo from "../assets/logo.svg";
import WalletConnectButton from "./WalletConnectButton";
import { Link } from "react-router-dom";
import "../App.css";

const tabs = [
  { name: "Trade", path: "/", external: false },
  { name: "Docs", path: "https://docs.xade.finance", external: true },
  { name: "Leaderboard", path: "https://app.orderly.network", external: true  },
  { name: "Mobile App", path: "https://bit.ly/xadefinance", external: true }
];

const handleTabClick = (text: string, setSelected: (text: string) => void) => {
  switch (text) {
    case "Docs":
      window.open("https://docs.xade.finance");
      break;
    case "Leaderboard":

      alert("Coming soon");
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
  path: string;
  external: boolean;
  customID?: string;
}

const Tab = ({ text, selected, setSelected, path, external }: TabProps) => {
  if (external) {
    // Render as a button for external links
    return (
      <button
        onClick={() => window.open(path, "_blank")}
        className={`relative rounded-md px-2 py-8 text-sm font-medium transition-colors duration-300 ${selected ? "text-white" : "text-gray-500"} focus-within:outline-red-500/50`}
      >
        <span className="relative z-10">{text}</span>
        {selected && (
          <div className="absolute left-0 top-0 flex size-full h-full w-full items-end justify-center">
            <span className="z-0 h-[2px] w-[80%] rounded-t-full bg-white"></span>
          </div>
        )}
      </button>
    );
  } else {
    // Render as a Link for internal navigation
    return (
      <Link
        to={path}
        onClick={() => setSelected(text)}
        className={`relative rounded-md px-2 py-8 text-sm font-medium transition-colors duration-300 ${selected ? "text-white" : "text-gray-500"} focus-within:outline-red-500/50`}
      >
        <span className="relative z-10">{text}</span>
        {selected && (
          <div className="absolute left-0 top-0 flex size-full h-full w-full items-end justify-center">
            <span className="z-0 h-[2px] w-[80%] rounded-t-full bg-white"></span>
          </div>
        )}
      </Link>
    );
  }
};

interface NavBarProps {
  center?: boolean;
  customID?: string;
}

const NavBar = ({ center, customID }: NavBarProps) => {
  const [selected, setSelected] = useState<string>(tabs[0].name);
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
                text={tab.name}
                selected={selected === tab.name}
                setSelected={setSelected}
                key={tab.name}
                customID={customID}
                path={tab.path}
                external={tab.external}
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
