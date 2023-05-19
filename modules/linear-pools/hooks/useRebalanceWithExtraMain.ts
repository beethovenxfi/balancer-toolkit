import LinearPoolRebalancerAbi from '../../../lib/abi/LinearPoolRebalancer.json';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { RawLinearPoolExtended } from '../linear-pool-types';
import { linearPoolRebalancers } from '../rebalancers';
import { useUserAccount } from '../../../lib/hooks/useAccount';

export function useRebalanceWithExtraMain(pool: RawLinearPoolExtended | null, extraMain = '100') {
    const rebalancerAddress = linearPoolRebalancers[pool?.address || ''];
    const { userAddress } = useUserAccount();

    const prepare = usePrepareContractWrite({
        address: rebalancerAddress as Address,
        abi: LinearPoolRebalancerAbi,
        functionName: 'rebalanceWithExtraMain',
        args: [userAddress, extraMain],
        enabled: typeof rebalancerAddress === 'string' && userAddress !== null,
    });

    return {
        ...useContractWrite(prepare.config),
        prepare,
    };
}
