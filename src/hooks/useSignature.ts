import ethers from "ethers";
import { useAppSelector } from "@/redux/hooks";

const MESSAGE_TYPES = {
  EIP712Domain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
  ],
  Registration: [
    { name: "brokerId", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "timestamp", type: "uint64" },
    { name: "registrationNonce", type: "uint256" },
  ],
};

const OFF_CHAIN_DOMAIN = {
  name: "Orderly",
  version: "1",
  chainId: 421614,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
};

const BASE_URL = "https://testnet-api-evm.orderly.org";
const BROKER_ID = "xade_finance";
const CHAIN_ID = 42161;

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);

export const useSignature = async () => {
  const registrationNonce = useAppSelector((state) => state.nonce);

  const registerMessage = {
    brokerId: BROKER_ID,
    chainId: CHAIN_ID,
    timestamp: Date.now(),
    registrationNonce,
  };

  const signature = await wallet.signTypedData(
    OFF_CHAIN_DOMAIN,
    {
      Registration: MESSAGE_TYPES.Registration,
    },
    registerMessage
  );
};
