import { WagmiProvider, http } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NFTDashboard from "./components/NFTDashboard";

const config = getDefaultConfig({
  appName: "ReVerse Genesis",
  projectId: "4b756b2f8d1d6da3fdbb0254c34c8a22", // Replace with your real WalletConnect Project ID
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

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
