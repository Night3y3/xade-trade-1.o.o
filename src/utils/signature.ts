import { signTypedData } from "@wagmi/core";
import { config } from "../config";
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

const BROKER_ID = "xade_finance";
const CHAIN_ID = 421614;

export const getRegisterNonceSignature = async (
  address: `0x${string}`,
  registrationNonce: number
) => {
  const registerMessage = {
    brokerId: BROKER_ID,
    chainId: CHAIN_ID,
    timestamp: Date.now(),
    registrationNonce,
  };
  const OFF_CHAIN_DOMAIN = {
    name: "Orderly",
    version: "1",
    chainId: 421614,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  };
  const result = await signTypedData(config, {
    account: address,
    domain: OFF_CHAIN_DOMAIN,
    types: MESSAGE_TYPES,
    primaryType: "Registration",
    message: registerMessage,
  });
  return { result, registerMessage };
};
// const MESSAGE_TYPES = {
//   EIP712Domain: [
//     { name: "name", type: "string" },
//     { name: "version", type: "string" },
//     { name: "chainId", type: "uint256" },
//     { name: "verifyingContract", type: "address" },
//   ],
//   Registration: [
//     { name: "brokerId", type: "string" },
//     { name: "chainId", type: "uint256" },
//     { name: "timestamp", type: "uint64" },
//     { name: "registrationNonce", type: "uint256" },
//   ],
// };

// const OFF_CHAIN_DOMAIN = {
//   name: "Orderly",
//   version: "1",
//   chainId: 421614,
//   verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
// };

// const BROKER_ID = "woofi_dex";
// const CHAIN_ID = 421614;

// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);

// const registerMessage = {
//   brokerId: BROKER_ID,
//   chainId: CHAIN_ID,
//   timestamp: Date.now(),
//   registrationNonce,
// };

// const signature = await wallet.signTypedData(
//   OFF_CHAIN_DOMAIN,
//   {
//     Registration: MESSAGE_TYPES.Registration,
//   },
//   registerMessage
// );
// export const getRegisterNonceSignature = async (
//   address: `0x${string}`,
//   registrationNonce: number
// ) => {
//   const registerMessage = {
//     brokerId: BROKER_ID,
//     chainId: CHAIN_ID,
//     timestamp: Date.now(),
//     registrationNonce,
//   };
//   const OFF_CHAIN_DOMAIN = {
//     name: "Orderly",
//     version: "1",
//     chainId: 421614,
//     verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
//   };
//   const result = await signTypedData(config, {
//     domain: OFF_CHAIN_DOMAIN,
//     types: MESSAGE_TYPES,
//     primaryType: "Registration",
//     message: registerMessage,
//   });
//   return { result, registerMessage };
// };
