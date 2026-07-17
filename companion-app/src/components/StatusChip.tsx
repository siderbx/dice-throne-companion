import React from 'react';
import { STATUS_LIST, statusChipStyle, type StatusDefWithId } from '../lib/status';

interface StatusChipListProps {
  statuses: Record<string, number>;
  onTap: (status: StatusDefWithId) => void;
}

export const StatusChipList: React.FC<StatusChipListProps> = ({ statuses, onTap }) => (
  <>
    {STATUS_LIST.map((status) => {
      const count = statuses[status.id] || 0;
      const isActive = count > 0;
      const { bg, border, color } = statusChipStyle(status.type, isActive);

      return (
        <div
          key={status.id}
          title={status.desc}
          onClick={() => onTap(status)}
          style={{
            padding: '6px 12px',
            borderRadius: '20px',
            border: `1px solid ${border}`,
            background: bg,
            color,
            fontSize: '0.85rem',
            fontWeight: isActive ? 700 : 500,
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {status.name} {isActive && <span style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.75rem' }}>{count}</span>}
        </div>
      );
    })}
  </>
);
