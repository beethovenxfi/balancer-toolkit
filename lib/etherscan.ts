export function etherscanGetTokenUrl(etherscanUrl: string, tokenAddress: string): string {
    return `${etherscanUrl}/token/${tokenAddress}`;
}

export function etherscanGetAddressUrl(etherscanUrl: string, address: string): string {
    return `${etherscanUrl}/address/${address}`;
}

export function etherscanGetTxUrl(etherscanUrl: string, tx: string): string {
    return `${etherscanUrl}/tx/${tx}`;
}

export function etherscanGetBlockUrl(etherscanUrl: string, blockNumber: number): string {
    return `${etherscanUrl}/block/${blockNumber}`;
}

export function etherscanTxShortenForDisplay(txHash: string) {
    return txHash.slice(0, 12) + '...';
}

export function etherscanGetContractWriteUrl(etherscanUrl: string, address: string): string {
    return `${etherscanUrl}/address/${address}#writeContract`;
}

export function etherscanGetContractReadUrl(etherscanUrl: string, address: string): string {
    return `${etherscanUrl}/address/${address}#readContract`;
}
