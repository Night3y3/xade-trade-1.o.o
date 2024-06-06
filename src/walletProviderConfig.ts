import { http, createConfig } from "@wagmi/core";
import { arbitrum, arbitrumSepolia } from "@wagmi/core/chains";

export const walletConfig = createConfig({
  chains: [arbitrum, arbitrumSepolia],
  transports: {
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});
