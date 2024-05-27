import "./polyfills";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import NavBar from "./components/NavBar";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, useAccount } from "wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config";
import PriceBar from "./components/PriceBar";
import {
  authenticateWallet,
  checkAccount,
  getRegistrationNonce,
  registerAccount,
} from "./apiCalls/accountRegistration";
import { BROKER_ID } from "./utils/constantValues";
import { useEffect } from "react";
import {
  getRegisterNonceSignature,
  getWalletAuthSignature,
} from "./utils/signature";

const queryClient = new QueryClient();

function App() {
  const account = useAccount({ config });
  // useNonce();

  // const [status, setStatus] = useState<AuthenticationStatus>("loading");

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/me');
  //       const { address } = await response.json();
  //       console.log('address: ', address);
  //       setStatus(address ? 'authenticated' : 'unauthenticated')
  //     } catch (error) {
  //       console.log('error: ', error);
  //       setStatus('unauthenticated');
  //     }
  //   }
  //   fetchUser();

  //   window.addEventListener("focus", fetchUser);

  //   return () => {
  //     window.removeEventListener("focus", fetchUser);
  //   };
  // }, []);

  // const authAdapter = useMemo(() => {
  //   return createAuthenticationAdapter({
  //     getNonce: async () => {
  //       const response = await fetch('http://localhost:8080/nonce');
  //       const { nonce } = await response.json();
  //       return nonce;
  //     },

  //     createMessage: ({ nonce, address, chainId }) => {
  //       return new SiweMessage({
  //         domain: window.location.host,
  //         address,
  //         statement: 'Sign in with Ethereum to the app.',
  //         uri: window.location.origin,
  //         version: '1',
  //         chainId,
  //         nonce,
  //       });
  //     },

  //     getMessageBody: ({ message }) => {
  //       return message.prepareMessage();
  //     },

  //     verify: async ({ message, signature }) => {
  //       const verifyRes = await fetch('http://localhost:8080/verify', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ message, signature }),
  //       });

  //       return Boolean(verifyRes.ok);
  //     },

  //     signOut: async () => {
  //       console.log("Log out")
  //       await fetch('http://localhost:8080/logout');
  //     },
  //   });
  // }, []);

  useEffect(() => {
    const initialUserAccountSetup = async () => {
      if (account.isConnected && account.address) {
        const isValid = await checkAccount(account.address, BROKER_ID);
        if (!isValid) {
          try {
            const fetchedNonce = await getRegistrationNonce();
            const { result, registerMessage } = await getRegisterNonceSignature(
              account.address,
              parseInt(fetchedNonce ?? "")
            );
            console.log(
              "nonce : ",
              fetchedNonce,
              result,
              registerMessage,
              account.address
            );
            if (result && registerMessage) {
              await registerAccount(registerMessage, account.address, result);
            }
          } catch (error) {
            console.error("Error fetching nonce: ", error);
          }
        }
        const { result, addKeyMessage } = await getWalletAuthSignature(
          account.address
        );
        await authenticateWallet(addKeyMessage, account.address, result);
      }
    };
    initialUserAccountSetup();
  }, [account]);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <RainbowKitAuthenticationProvider adapter={authAdapter} status={status}> */}
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#7b3fe4",
            accentColorForeground: "black",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <div className="flex flex-col">
            <NavBar />
            <PriceBar />
          </div>
        </RainbowKitProvider>
        {/* </RainbowKitAuthenticationProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
