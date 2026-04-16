import { ChildrenWrapper, RowActionButton, RowButtonGroup, Wrapper } from './styled';
import { Tooltip } from 'antd';
import React from 'react';
import type { ReactNode } from 'react';

export interface IRowEllipsisAction {
  icon?: ReactNode;
  label?: ReactNode;
  tooltip?: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
}

interface IRowActionsEllipsis {
  active?: boolean;
  actions: IRowEllipsisAction[];
  children?: ReactNode;

    placement?: string;
}

const RowActionsEllipsis = ({ actions, children }: IRowActionsEllipsis) => {
  return (
    <Wrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <RowButtonGroup className="row-actions" active={true}>
        {actions
          .filter((e) => !e.hidden)
          .map((action, index) => (
            <Tooltip title={action.tooltip || action.label} key={index} >
              <RowActionButton
                disabled={action.disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  action.onClick(event);
                }}
              >
                {action.icon}
              </RowActionButton>
            </Tooltip>
          ))}
      </RowButtonGroup>
    </Wrapper>
  );
};

export default RowActionsEllipsis;
