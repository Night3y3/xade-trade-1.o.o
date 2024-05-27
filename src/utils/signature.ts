import { signTypedData } from "@wagmi/core";
import { config } from "../config";
import { encodeBase58 } from "ethers";
import { getPublicKeyAsync, utils } from "@noble/ed25519";
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
const MESSAGE_TYPES_WALLET_AUTH = {
  EIP712Domain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
  ],
  AddOrderlyKey: [
    { name: "brokerId", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "orderlyKey", type: "string" },
    { name: "scope", type: "string" },
    { name: "timestamp", type: "uint64" },
    { name: "expiration", type: "uint64" },
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
export const getWalletAuthSignature = async (address: `0x${string}`) => {
  const privateKey = utils.randomPrivateKey();
  const orderlyKey = `ed25519:${encodeBase58(
    await getPublicKeyAsync(privateKey)
  )}`;

  const addKeyMessage = {
    brokerId: BROKER_ID,
    chainId: CHAIN_ID,
    orderlyKey,
    scope: "read,trading",
    timestamp: Date.now(),
    expiration: Date.now() + 1_000 * 60 * 60 * 24 * 365, // 1 year
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
    types: MESSAGE_TYPES_WALLET_AUTH,
    primaryType: "AddOrderlyKey",
    message: addKeyMessage,
  });
  return { result, addKeyMessage };
};
