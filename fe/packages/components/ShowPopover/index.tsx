import { Popover } from 'antd';
import React, { ReactNode } from 'react';

interface IShowPopover {
  children: ReactNode;
  content: ReactNode;
}

const ShowPopover: React.FC<IShowPopover> = (props) => {
  const { children, content } = props;

  return (
    <Popover content={content} placement="top" title="Add new element">{children}</Popover>
  );
};

export default ShowPopover;
