import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import NFTDashboard from "./components/NFTDashboard";

const { chains, publicClient } = configureChains([base], [publicProvider()]);
const { connectors } = getDefaultWallets({ appName: "ReVerse Genesis", projectId: "reverse-genesis-dapp", chains });
const wagmiConfig = createConfig({ autoConnect: true, connectors, publicClient });

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <NFTDashboard />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
