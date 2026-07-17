import { STATUS_DEFS } from '../data/constants';

export interface StatusDef {
  name: string;
  type: string; // 'neg' | 'pos' | 'uniq'
  limit: number;
  timing: string;
  desc: string;
}

export interface StatusDefWithId extends StatusDef {
  id: string;
}

export const statusId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const STATUS_LIST: StatusDefWithId[] = (STATUS_DEFS as StatusDef[]).map((s) => ({ ...s, id: statusId(s.name) }));

export const nextStatusValue = (current: number, limit: number) => (current >= limit ? 0 : current + 1);

export type StatusType = 'neg' | 'pos' | 'uniq';

export interface StatusColors {
  bg: string;
  border: string;
  color: string;
}

export const STATUS_TYPE_STYLES: Record<StatusType, StatusColors> = {
  neg: { bg: 'var(--status-neg-bg)', border: 'var(--status-neg-border)', color: 'var(--ember)' },
  pos: { bg: 'var(--status-pos-bg)', border: 'var(--status-pos-border)', color: 'var(--verd)' },
  uniq: { bg: 'var(--status-unique-bg)', border: 'var(--status-unique-border)', color: 'var(--brass)' },
};

const INACTIVE_CHIP_STYLE: StatusColors = { bg: 'transparent', border: 'var(--line)', color: 'var(--ink2)' };

export const statusChipStyle = (type: string, isActive: boolean): StatusColors =>
  isActive ? (STATUS_TYPE_STYLES[type as StatusType] ?? INACTIVE_CHIP_STYLE) : INACTIVE_CHIP_STYLE;
