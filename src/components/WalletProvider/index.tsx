import * as React from 'react';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import styled from 'styled-components';
import { allChains } from './chains';

const { provider, chains } = configureChains(
	[
		...allChains
	],
	[
		jsonRpcProvider({
			rpc: (chain) => ({ http: chain.rpcUrls.default })
		})
	]
);

const Provider = styled.div`
	width: 100%;
	& > div {
		width: 100%;
	}
`;

const { connectors } = getDefaultWallets({
	appName: 'DefiLlama',
	chains
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider
});

export const WalletWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<WagmiConfig client={wagmiClient}>
			<Provider>
				<RainbowKitProvider chains={chains} showRecentTransactions={true} theme={darkTheme()}>
					{children}
				</RainbowKitProvider>
			</Provider>
		</WagmiConfig>
	);
};
