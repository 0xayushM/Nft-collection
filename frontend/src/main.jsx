import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

import "./index.css";

const chains = [polygonMumbai];
const projectId = "c90aea9f77c3ffe88c242f1a3a75f547";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, version: 1, chains }),
	provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<WagmiConfig client={wagmiClient}>
				<App />
				<Web3Modal
					themeVariables={{
						"--w3m-accent-color": "#8247e5",
						"--w3m-background-color": "#8247e5",
					}}
					projectId={projectId}
					ethereumClient={ethereumClient}
				/>
			</WagmiConfig>
		</BrowserRouter>
	</React.StrictMode>
);
