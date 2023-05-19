import { RawPoolToken } from '@balancer/sdk';
import numeral from 'numeral';

export function getToken(tokenAddress: string, tokens: RawPoolToken[]): RawPoolToken | null {
    return tokens.find((token) => token.address === tokenAddress) || null;
}

export function tokenFormatAmount(amount: string | number, isDust = true) {
    const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (typeof amount === 'string' && amount.includes('e') && !isDust) {
        const fixedNum = parseFloat(amount.split('-')[1]);
        return amountNum.toFixed(fixedNum);
    } else if (amountNum < 0.000001 && amountNum >= 0) {
        return '0.00';
    } else if (amountNum < 1) {
        return numeral(amount).format('0.[000000]');
    } else if (amountNum < 10) {
        return numeral(amount).format('0.0[000]');
    } else if (amountNum < 100) {
        return numeral(amount).format('0.[0000]');
    } else if (amountNum < 5000) {
        return numeral(amount).format('0,0.[00]');
    } else {
        return numeral(amount).format('0,0');
    }
}
