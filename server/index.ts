import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { SiweMessage, generateNonce } from "siwe";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

let address = "";

app.get("/nonce", async (req, res) => {
  const nonce = generateNonce();
  res.status(200).json({ nonce });
});

app.get("/me", (req, res) => {
  res.status(200).json({ address });
});

app.post("/verify", async (req, res) => {
  const { message, signature } = req.body;
  try {
    const siweMessage = new SiweMessage(message);
    const result = await siweMessage.verify({ signature });
    if (result.success) {
      address = result.data.address;
      console.log("address: ", address);
    }
    res.status(200).json({ ok: result.success });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/logout", (req, res) => {
  address = "";
  res.status(200).json({ ok: true });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
