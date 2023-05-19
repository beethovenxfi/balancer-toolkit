import LinearPoolRebalancerAbi from '../../../lib/abi/LinearPoolRebalancer.json';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { RawLinearPoolExtended } from '../linear-pool-types';
import { linearPoolRebalancers } from '../rebalancers';
import { useUserAccount } from '../../../lib/hooks/useAccount';

export function useRebalance(pool: RawLinearPoolExtended | null) {
    const rebalancerAddress = linearPoolRebalancers[pool?.address || ''];
    const { userAddress } = useUserAccount();

    const prepare = usePrepareContractWrite({
        address: rebalancerAddress as Address,
        abi: LinearPoolRebalancerAbi,
        functionName: 'rebalance',
        args: [userAddress],
        value: undefined,
        enabled: true,
    });

    return {
        ...useContractWrite(prepare.config),
        prepare,
    };
}
