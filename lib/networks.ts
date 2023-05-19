import { Address } from 'abitype';

interface BalancerNetworkDefinition {
    balancer: {
        subgraphUrl: string;
        sorQueriesAddress: string;
        vault: Address;
    };
    multicall: Address;
    eth: {
        name: string;
        address: string;
        addressFormatted: string;
        symbol: string;
        decimals: number;
        iconUrl: string;
    };
    etherscan: {
        name: string;
        url: string;
    };
}

export let BalancerNetworkDefinitions: { [p: string]: BalancerNetworkDefinition };
BalancerNetworkDefinitions = {
    '1': {
        balancer: {
            subgraphUrl: 'https://balancer-v2.stellate.balancer.fi/',
            // subgraphUrl: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
            sorQueriesAddress: '0x6732d651EeA0bc98FcF4EFF8B62e0CdCB0064f4b',
            vault: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        },
        multicall: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
        eth: {
            name: 'Ethereum',
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            addressFormatted: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            symbol: 'ETH',
            decimals: 18,
            iconUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        },
        etherscan: {
            name: 'etherscan',
            url: 'https://etherscan.com',
        },
    },
    '10': {
        balancer: {
            subgraphUrl: 'https://api.thegraph.com/subgraphs/name/beethovenxfi/beethovenx-v2-optimism',
            sorQueriesAddress: '0x1814a3b3e4362caf4eb54cd85b82d39bd7b34e41',
            vault: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        },
        multicall: '0x2DC0E2aa608532Da689e89e237dF582B783E552C',
        eth: {
            name: 'Ethereum',
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            addressFormatted: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            symbol: 'ETH',
            decimals: 18,
            iconUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        },
        etherscan: {
            name: 'The Optimistic Explorer',
            url: 'https://optimistic.etherscan.io',
        },
    },
    '42161': {
        balancer: {
            subgraphUrl: 'https://balancer-arbitrum-v2.stellate.balancer.fi',
            sorQueriesAddress: '0x1814a3b3e4362caf4eb54cd85b82d39bd7b34e41',
            vault: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        },
        multicall: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
        eth: {
            name: 'Ethereum',
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            addressFormatted: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            symbol: 'ETH',
            decimals: 18,
            iconUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        },
        etherscan: {
            name: 'ArbiScan',
            url: 'https://arbiscan.io',
        },
    },
    '137': {
        balancer: {
            subgraphUrl: 'https://balancer-polygon-v2.stellate.balancer.fi',
            sorQueriesAddress: '0x1814a3b3e4362caf4eb54cd85b82d39bd7b34e41',
            vault: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        },
        multicall: '0x275617327c958bD06b5D6b871E7f491D76113dd8',
        eth: {
            address: '0x0000000000000000000000000000000000001010',
            addressFormatted: '0x0000000000000000000000000000000000001010',
            symbol: 'MATIC',
            name: 'Matic',
            decimals: 18,
            iconUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        },
        etherscan: {
            name: 'Polygon Scan',
            url: 'https://polygonscan.com',
        },
    },
};
