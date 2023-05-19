import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, fantom, gnosis, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { PageHeader } from '../components/global/PageHeader';
import { PageFooter } from '../components/global/PageFooter';
import { QueryClient, QueryClientProvider } from 'react-query';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        fantom,
        gnosis,
        //...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
    ] as Chain[],
    [publicProvider()],
);

const { connectors } = getDefaultWallets({
    appName: 'Balancer Toolkit',
    projectId: 'balancer-toolkit',
    chains,
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

const queryClient = new QueryClient();

function BalancerToolkitApp({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <QueryClientProvider client={queryClient}>
                    <PageHeader />
                    <Component {...pageProps} />
                    <PageFooter />
                </QueryClientProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default BalancerToolkitApp;
