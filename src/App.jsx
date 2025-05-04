import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NFTDashboard from "./components/NFTDashboard";

const config = createConfig(
  getDefaultConfig({
    appName: "ReVerse Genesis",
    projectId: "WALLETCONNECT_PROJECT_ID", // replace with real ID
    chains: [base],
    transports: {
      [base.id]: http(),
    },
  })
);

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme()}>
          <NFTDashboard />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
