import ERC20Abi from '../abi/ERC20.json';
import { MaxUint256 } from '@ethersproject/constants';
import { useNetworkConfig } from './useNetworkConfig';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { TokenBase } from '../types';

export function useApproveToken(token: TokenBase | null, contractToApprove?: string) {
    const networkConfig = useNetworkConfig();

    const { config } = usePrepareContractWrite({
        address: token?.address as Address,
        abi: ERC20Abi,
        functionName: 'approve',
        args: [contractToApprove || networkConfig.balancer.vault, MaxUint256.toString()],
        enabled: token !== null,
    });

    return useContractWrite(config);
}
