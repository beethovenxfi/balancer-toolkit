import { RawPoolExtended } from '../../lib/hooks/usePoolsData';

export type RawLinearPoolExtended = RawPoolExtended & {
    mainIndex: number;
    wrappedIndex: number;
    lowerTarget: string;
    upperTarget: string;
};
