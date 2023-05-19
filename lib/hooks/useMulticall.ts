import { useContractRead } from 'wagmi';
import { useNetworkConfig } from './useNetworkConfig';
import { Interface } from '@ethersproject/abi';

interface UseMultiCallInput {
    abi: any[];
    calls: { address: string; functionName: string; args?: any[] }[];
    options?: any;
    requireSuccess?: boolean;
    enabled?: boolean;
    cacheTimeMs?: number;
}

export function useMultiCall({
    abi,
    calls,
    options = {},
    requireSuccess = false,
    enabled = true,
    cacheTimeMs,
}: UseMultiCallInput) {
    const networkConfig = useNetworkConfig();
    const itf = new Interface(abi);

    const { data, ...rest } = useContractRead({
        address: networkConfig.multicall,
        abi: [
            'function tryAggregate(bool requireSuccess, tuple(address, bytes)[] memory calls) public view returns (tuple(bool, bytes)[] memory returnData)',
        ],
        functionName: 'tryAggregate',
        args: [
            requireSuccess,
            calls.map((call) => [call.address, itf.encodeFunctionData(call.functionName, call.args)]),
            options,
        ],
        cacheTime: cacheTimeMs,
        enabled,
    });

    const response = data as [boolean, string][] | undefined;

    return {
        ...rest,
        data: response?.map(([success, returnData], i) => {
            if (!success) return null;
            const decodedResult = itf.decodeFunctionResult(calls[i].functionName, returnData);
            // Automatically unwrap any simple return values
            return decodedResult.length > 1 ? decodedResult : decodedResult[0];
        }),
    };
}
