import { TItemBuilderBar } from '@packages/@types';
import { useLanguage } from '@packages/components/LanguageContext';
import { Tooltip } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { useDrag } from 'react-dnd';
import { EnumDragDrop } from '~/types';
import './style.scss';

type TProps = TItemBuilderBar & React.HTMLAttributes<HTMLDivElement>;

function BaseIcon({
  title, icon, componentName, tooltip, iconIndex, onAddField, ...rest
}: TProps) {
  const [, drag] = useDrag(() => ({
    type: EnumDragDrop.SIDE_MENU,
    item: { id: componentName },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    canDrag: tooltip == null,
  }));
  const { translate } = useLanguage();

  return (
    <Tooltip title={tooltip}>
      <div
        ref={tooltip == null ? drag : null as any}
        {...rest}
        className={clsx(rest?.className, `base-icon-wrapper icon-${iconIndex}`)}
        onClick={onAddField}
      >
        <div className="icon">
          <img src={icon} alt="icon" />
        </div>
        <div className="field-name"><span>{translate(title as any)}</span></div>
      </div>
    </Tooltip>
  );
}

export default BaseIcon;
