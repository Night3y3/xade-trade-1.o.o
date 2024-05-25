import { config } from "@/config";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAddress } from "@/redux/slices/address";
import { setNonce } from "@/redux/slices/nonceSlice";

const BROKER_ID = "xade_finance";

export const useNonce = () => {
  const account = useAccount({ config });
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.address);
  const nonce = useAppSelector((state) => state.nonce);

  useEffect(() => {
    function getRegistrationNonce() {
      const options = { method: "GET" };

      fetch("https://api-evm.orderly.network/v1/registration_nonce", options)
        .then((response) => response.json())
        .then((response) => {
          //   console.log(response);
          const nonceJson = response as {
            data: { registration_nonce: string };
          };
          console.log("nonceJson : ", nonceJson);
          const registrationNonce = nonceJson.data.registration_nonce as string;
          dispatch(setNonce(registrationNonce));

          return;
        })
        .catch((err) => console.error(err));
    }

    function checkAccount(address: string | undefined) {
      if (!address) return;
      const options = { method: "GET" };

      fetch(
        `https://testnet-api-evm.orderly.network/v1/get_account?address=${address}&broker_id=${BROKER_ID}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (!response.success) {
            return getRegistrationNonce();
          }
        })
        .catch((err) => console.error(err));
    }

    if (account.isConnected && nonce === null) {
      //   console.log("address : ", account.address);
      dispatch(setAddress(account.address));
      console.log("address : ", address);

      checkAccount(account.address);
    }
    console.log("nonce : ", nonce);
  }, [account]);
};
