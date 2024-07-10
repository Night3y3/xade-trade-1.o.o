import { useNavigate } from "react-router-dom";

const DepositFiat = () => {
  const navigate = useNavigate();

  return (
    <div className="relative group" style={{ display: "flex", justifyContent: "center" }}>
      <iframe
        src="https://widget.uniramp.com/?api_key=pk_prod_eb0suFktOsnpthQYX5LXoMXIychV7Ofv"
        style={{
          border: "1px #00000030 solid",
          borderRadius: "4px",
          height: "650px",
          width: "450px",
        }}
        name="Uniramp"
      ></iframe>
    </div>
  );
};

export default DepositFiat;
