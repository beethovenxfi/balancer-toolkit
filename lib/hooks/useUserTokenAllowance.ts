import ERC20Abi from '../abi/ERC20.json';
import { TokenBase } from '../types';
import { useNetworkConfig } from './useNetworkConfig';
import { useContractRead } from 'wagmi';
import { Address } from 'abitype';
import { useUserAccount } from './useAccount';
import { ZERO_ADDRESS } from '@balancer/sdk';

export function useUserTokenAllowance(token: TokenBase | null, contract?: string) {
    const networkConfig = useNetworkConfig();
    contract = contract || networkConfig.balancer.vault;
    const { userAddress } = useUserAccount();

    return useContractRead({
        abi: ERC20Abi,
        address: (token?.address || ZERO_ADDRESS) as Address,
        functionName: 'allowance',
        args: [userAddress, contract],
        enabled: token !== null,
    });
}
