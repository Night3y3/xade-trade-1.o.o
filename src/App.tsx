import './polyfills';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';
import { useEffect } from 'react'
import NavBar from './components/NavBar'

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { SiweMessage } from 'siwe';
import { config } from './config';
import { useNonce } from './hooks/useNonce';
import PriceBar from './components/PriceBar';




const queryClient = new QueryClient();


function App() {

  useNonce();

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

  return (


    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <RainbowKitAuthenticationProvider adapter={authAdapter} status={status}> */}
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'black',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
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




  )
}

export default App
