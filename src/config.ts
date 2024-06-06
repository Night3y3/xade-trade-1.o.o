// import { getDefaultConfig } from "@rainbow-me/rainbowkit";
// import { http } from "viem";
// import { arbitrum, arbitrumSepolia } from "wagmi/chains";

// export const config = getDefaultConfig({
//   appName: "RainbowKit demo",
//   projectId: "89d14fec974ea8f0d85b06e3cddd0916",
//   chains: [arbitrum, arbitrumSepolia],
//   transports: {
//     [arbitrum.id]: http(),
//     [arbitrumSepolia.id]: http(),
//   },
// });
import { http, createConfig } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = "89d14fec974ea8f0d85b06e3cddd0916";

export const config = createConfig({
  chains: [arbitrum, arbitrumSepolia],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});
