import React, { useEffect, useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Slider } from "./ui/slider";
import { cn } from "@/lib/utils";
import { useAccount } from "@orderly.network/hooks";
import { UseAccountReturnType } from "wagmi";
import { CHAIN_ID } from "@/utils/constantValues";
// import { config } from "@/config";
import { AccountStatusEnum } from "@orderly.network/types";

interface MarketSectionProps {
  // Define prop types here
  accountInfo: UseAccountReturnType;
}

const percentTabs = ["0%", "25%", "50%", "75%", "MAX"];

const MarketSection: React.FC<MarketSectionProps> = ({ accountInfo }) => {
  const [selected, setSelected] = useState<boolean>(true);
  const [percent, setPercent] = useState<string>("0%");
  const [initialLized, setInitialized] = useState(false);
  const [onProcess, setOnProcess] = useState(false);
  const { account, state } = useAccount();

  useEffect(() => {
    const initialUserAccountSetup = async () => {
      if (accountInfo.address && accountInfo.isConnected && !onProcess) {
        setOnProcess(true);
        account.setAddress(accountInfo.address, {
          provider: window?.ethereum,
          chain: {
            id: CHAIN_ID,
          },
        });
        setOnProcess(false);
        setInitialized(true);
        console.log("acount info!!!!", state);
      }
    };
    initialUserAccountSetup();
  }, [accountInfo]);

  useEffect(() => {
    const accountCheck = async () => {
      console.log(initialLized, !state.accountId);
      if (initialLized && !state.accountId && !onProcess) {
        setOnProcess(true);
        await account.createAccount();
        setOnProcess(false);
        console.log("account created!!!!", state);
      }
      if (state.status <= AccountStatusEnum.DisabledTrading && !onProcess) {
        setOnProcess(true);
        const key = await account.createOrderlyKey(30);
        setOnProcess(false);
        console.log("key created!!!!", key, state);
      }
    };
    accountCheck();
  }, [account, state]);

  // Component logic using props
  console.log(state, accountInfo);
  return (
    <div className="w-1/5 flex flex-col items-center gap-3">
      <div className=" flex gap-5 items-center p-3 border border-[#241C2F] w-full">
        <div className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-neutral-300 text-lg tracking-[0] leading-[normal] whitespace-nowrap">
          Account
        </div>
        <Button
          className={` ${
            selected ? "dark:bg-[#4B4B4B]" : "dark:bg-[#1E1E1E]"
          } group hover:dark:bg-[#413d3d]`}
          onClick={() => setSelected(true)}
        >
          <h1
            className={` ${selected ? "text-[#D4D4D4]" : "text-[#888888]"}  `}
          >
            Deposit
          </h1>
        </Button>

        <Button
          className={` ${
            selected ? "dark:bg-[#1E1E1E]" : " dark:bg-[#4B4B4B]"
          } group  hover:dark:bg-[#413d3d]`}
          onClick={() => setSelected(false)}
        >
          <h1
            className={` ${selected ? "text-[#888888]" : " text-[#D4D4D4]"} `}
          >
            Withdraw
          </h1>
        </Button>

        <Button className=" group dark:bg-[#1E1E1E] hover:dark:bg-[#1E1E1E]">
          <PaperPlaneIcon
            className="transition ease-linear group-hover:dark:-rotate-45 "
            color="#5B5B5B"
          />
        </Button>
      </div>

      <div className="flex items-center justify-between gap-2">
        {percentTabs.map((tab) => (
          <Button
            className={` ${
              percent === tab
                ? " dark:bg-black border border-[#40F388]"
                : "dark:bg-[#1E1E1E] "
            } hover:dark:bg-[#413d3d]`}
            onClick={() => setPercent(tab)}
          >
            <h1
              className={`${
                percent === tab ? " text-[#40F388]" : "text-[#888888] "
              } `}
            >
              {tab}
            </h1>
          </Button>
        ))}
      </div>

      <div className="dark:bg-[#4B4B4B]">
        <Slider
          color="#40F388"
          max={100}
          defaultValue={[33]}
          step={1}
          className={cn("w-[60%]")}
        />
      </div>

      <Button className="w-4/5 dark:bg-[#40F388]">
        <h1>BUY ETH</h1>
      </Button>
    </div>
  );
};

export default MarketSection;
