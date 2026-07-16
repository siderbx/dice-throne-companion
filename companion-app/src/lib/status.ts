import { STATUS_DEFS } from '../data/constants';

export interface StatusDef {
  name: string;
  type: string; // 'neg' | 'pos' | 'uniq'
  limit: number;
  timing: string;
  desc: string;
}

export const STATUS_LIST = STATUS_DEFS as StatusDef[];

export const statusId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
