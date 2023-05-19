export interface TokenAmountHumanReadable {
    address: string;
    amount: string;
}

export interface TokenAmountHumanReadableAndScaled {
    address: string;
    amount: string;
    amountScaled: string;
}

export interface TokenBase {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
}

export interface TokenBaseWithAmount extends TokenBase {
    amount: string;
}

export type AmountHumanReadable = string;
export type AmountScaledString = string;

export type BalanceMap = Map<string, AmountHumanReadable>;

export interface AmountHumanReadableMap {
    [address: string]: AmountHumanReadable;
}
