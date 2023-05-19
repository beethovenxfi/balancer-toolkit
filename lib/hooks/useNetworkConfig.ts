import { useNetwork } from 'wagmi';
import { BalancerNetworkDefinitions } from '../networks';

export function useNetworkConfig() {
    const { chain } = useNetwork();
    const chainId = chain?.id || 1;

    return BalancerNetworkDefinitions[`${chainId}`];
}
