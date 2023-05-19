import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

export function useUserAccount() {
    const query = useAccount();
    const [isFirstRender, setFirstRender] = useState(true);

    useEffect(() => {
        setFirstRender(false);
    }, []);

    return {
        ...query,
        isLoading: query.isConnecting || isFirstRender,
        isConnecting: query.isConnecting || isFirstRender,
        userAddress: query.address || null,
        isConnected: !!query.address && !isFirstRender,
    };
}
