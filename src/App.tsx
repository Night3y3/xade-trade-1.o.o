import './polyfills';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';
import { useMemo } from 'react'
import NavBar from './components/NavBar'

import { getDefaultConfig, RainbowKitProvider, darkTheme, createAuthenticationAdapter, RainbowKitAuthenticationProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SiweMessage } from 'siwe';

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base],
});

const queryClient = new QueryClient();


function App() {

  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const response = await fetch('/api/nonce');
        return await response.text();
      },

      createMessage: ({ nonce, address, chainId }) => {
        return new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Sign in with Ethereum to the app.',
          uri: window.location.origin,
          version: '1',
          chainId,
          nonce,
        });
      },

      getMessageBody: ({ message }) => {
        return message.prepareMessage();
      },

      verify: async ({ message, signature }) => {
        const verifyRes = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, signature }),
        });

        return Boolean(verifyRes.ok);
      },

      signOut: async () => {
        await fetch('/api/logout');
      },
    });
  }, []);

  return (

    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitAuthenticationProvider adapter={authAdapter} status='unauthenticated'>
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

            </div>
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>


  )
}

export default App
