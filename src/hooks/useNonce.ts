import { config } from "@/config";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAddress } from "@/redux/slices/address";
import { setNonce } from "@/redux/slices/nonceSlice";
import {
  checkAccount,
  getRegistrationNonce,
} from "@/apiCalls/accountRegistration";

const BROKER_ID = "xade_finance";

export const useNonce = () => {
  const account = useAccount({ config });
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.address);
  const nonce = useAppSelector((state) => state.nonce);

  useEffect(() => {
    if (account.isConnected && nonce === null) {
      dispatch(setAddress(account.address));
      console.log("address : ", address);
      checkAccount(account.address, BROKER_ID).then(async (isValid) => {
        if (!isValid) {
          try {
            const fetchedNonce = await getRegistrationNonce();
            dispatch(setNonce(fetchedNonce));
            console.log("nonce : ", fetchedNonce);
          } catch (error) {
            console.error("Error fetching nonce: ", error);
          }
        }
      });
    }
  }, [account]);
};
