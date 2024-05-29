import { config } from "@/config";
import { useEffect } from "react";
import { useWriteContract } from "wagmi";
import { erc20Abi, keccak256 } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { BROKER_ID } from "@/utils/constantValues";
import { vaultAbi } from "./abi/VaultAbi";

const usdcAddress = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d";
const vaultAddress = "0x0EaC556c0C2321BA25b9DC01e4e3c95aD5CDCd2f";
const tokenSymbol = "USDC";

export const useDepositFlow = (
  startExecution: boolean,
  amount: number,
  orderlyAccountId: string
) => {
  const { data: depositHash, writeContractAsync } = useWriteContract({
    config: config,
  });
  // const account = useAccount({ config });
  const encoder = new TextEncoder();

  const depositInput = {
    accountId: orderlyAccountId,
    brokerHash: keccak256(encoder.encode(BROKER_ID)),
    tokenHash: keccak256(encoder.encode(tokenSymbol)),
    tokenAmount: amount,
  };
  // const result = useReadContract({
  //   abi: vaultAbi,
  //   address: vaultAddress,
  //   functionName: "getDepositFee",
  //   args: [account.address, depositInput],
  // });

  let depositTxReceipt;

  useEffect(() => {
    if (startExecution) {
      const executeTransaction = async () => {
        await writeContractAsync({
          address: usdcAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [vaultAddress, BigInt(amount)],
        });
        if (depositHash) {
          await waitForTransactionReceipt(config, {
            hash: depositHash,
            pollingInterval: 1_000,
          });
          await writeContractAsync({
            address: vaultAddress,
            abi: vaultAbi,
            functionName: "deposit",
            args: [depositInput],
          });
          depositTxReceipt = await waitForTransactionReceipt(config, {
            hash: depositHash,
            pollingInterval: 1_000,
          });
        }
      };
      executeTransaction();
    }
  }, [startExecution]);
  return { depositTxReceipt };
};
