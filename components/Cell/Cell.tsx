import React, { useState } from 'react';

import { spacing } from '../../style-tokens';
import { CellItem } from '../CellItem/CellItem';

import type { CellProps } from './Cell.types';

const SIDEBAR_WIDTH = spacing.primitive['256'] + spacing.scale['24'];

export function Cell({
  expandable = false,
  defaultExpanded = true,
  expanded,
  label = 'Label',
  active,
  leadIcon,
  badge = false,
  tailIcon1 = false,
  tailIcon2 = false,
  childItems = [
    { label: 'Label' },
    { label: 'Label' },
    { label: 'Label' },
    { label: 'Label' },
  ],
  className,
  style,
  onMainClick,
  onChildClick,
  onToggleExpanded,
}: CellProps) {
  const isControlled = typeof expanded === 'boolean';
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = isControlled ? expanded! : internalExpanded;

  const headerActive = typeof active === 'boolean' ? active : (expandable && isExpanded);

  const handleMainClick = () => {
    if (expandable) {
      const next = !isExpanded;
      if (!isControlled) {
        setInternalExpanded(next);
      }
      onToggleExpanded?.(next);
    }
    onMainClick?.();
  };

  return (
    <div
      className={className}
      style={{
        width: SIDEBAR_WIDTH,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <CellItem
        type="default"
        target="default"
        active={headerActive}
        label={label}
        leadIcon={leadIcon}
        badge={badge}
        tailIcon1={tailIcon1}
        tailIcon2={tailIcon2}
        onClick={handleMainClick}
      />

      {expandable && isExpanded
        ? childItems.map((child, index) => (
            <CellItem
              key={child.id ?? `${child.label}-${index}`}
              type="default"
              target="indented"
              active={child.active ?? false}
              disabled={child.disabled ?? false}
              label={child.label}
              leadIcon={child.leadIcon}
              showLine={child.showLine}
              badge={false}
              tailIcon1={false}
              tailIcon2={false}
              onClick={onChildClick ? () => onChildClick(child.id ?? `${child.label}-${index}`) : undefined}
            />
          ))
        : null}
    </div>
  );
}

export default Cell;
