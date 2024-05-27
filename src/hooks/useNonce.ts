// import { config } from "@/config";
// import { useEffect } from "react";
// import { useAccount } from "wagmi";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setAddress } from "@/redux/slices/address";
// import { setNonce } from "@/redux/slices/nonceSlice";
// import {
//   checkAccount,
//   getRegistrationNonce,
// } from "@/apiCalls/accountRegistration";

// export const useNonce = () => {
//   const account = useAccount({ config });
//   const dispatch = useAppDispatch();
//   const address = useAppSelector((state) => state.address);
//   const nonce = useAppSelector((state) => state.nonce);

//   useEffect(() => {
//     if (account.isConnected && nonce === null) {
//       dispatch(setAddress(account.address));
//       console.log("address : ", address);
//     }
//   }, [account]);
// };
