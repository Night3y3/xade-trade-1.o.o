import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "89d14fec974ea8f0d85b06e3cddd0916",
  chains: [arbitrum, arbitrumSepolia],
});
