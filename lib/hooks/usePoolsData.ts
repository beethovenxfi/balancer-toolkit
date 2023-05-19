import {
    GetPoolsResponse,
    OnChainPoolDataEnricher,
    RawPool,
    sorParseRawPools,
    SubgraphPoolProvider,
} from '@balancer/sdk';
import { useQuery } from 'react-query';
import { useNetwork } from 'wagmi';
import { orderBy, uniq, uniqBy } from 'lodash';
import { useNetworkConfig } from './useNetworkConfig';
import { Address } from 'abitype';

export type RawPoolExtended = RawPool & { name: string; symbol: string; totalLiquidity: string };

type GetPoolsResponseExtended = Omit<GetPoolsResponse, 'pools'> & {
    pools: RawPoolExtended[];
};

export function usePoolsData({ poolTypeIn }: { poolTypeIn?: string[] } = {}) {
    const { chain } = useNetwork();
    const chainId = chain?.id || 1;
    const networkInfo = useNetworkConfig();

    const query = useQuery<GetPoolsResponseExtended>(['sorPoolData', chainId], async () => {
        // TODO: this subgraph url is for the actual network, so we need to make sure it doesn't fetch new data not
        // TODO: present on the fork. Ideally we would be able to determine the block number at which the fork was created
        const subgraphPoolProvider = new SubgraphPoolProvider(chainId!, networkInfo.balancer.subgraphUrl, {
            gqlAdditionalPoolQueryFields: 'name symbol totalLiquidity',
            poolTypeIn,
        });

        const onChainEnricher = new OnChainPoolDataEnricher(
            chain?.rpcUrls.default.http[0] || '',
            (networkInfo?.balancer?.sorQueriesAddress || '') as Address,
        );
        const timestamp = BigInt(Math.floor(new Date().getTime() / 1000));

        const response = (await subgraphPoolProvider.getPools({ timestamp })) as GetPoolsResponseExtended;

        const additionalPoolData = await onChainEnricher.fetchAdditionalPoolData(response, {});
        const pools = onChainEnricher.enrichPoolsWithData(response.pools, additionalPoolData) as RawPoolExtended[];

        return {
            ...response,
            pools,
        };
    });

    const pools = orderBy(query.data?.pools || [], (pool) => parseFloat(pool.totalLiquidity), 'desc');
    const parsedPools = sorParseRawPools(chainId!, pools, []);
    const tokens = uniqBy(pools.map((pool) => pool.tokens).flat(), 'address');
    const poolTypes = uniq(pools.map((pool) => pool.poolType));
    const linearPools = pools.filter((pool) => pool.poolType.includes('Linear'));

    return {
        ...query,
        pools,
        tokens,
        poolTypes,
        parsedPools,
        linearPools,
    };
}
