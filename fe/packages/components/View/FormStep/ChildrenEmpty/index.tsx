import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import './styles.scss';

type TChildrenEmptyProps = {
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ChildrenEmpty = ({ onClick, ...rest }: TChildrenEmptyProps) => (
  <div className="children-empty-outer" onClick={onClick} {...rest}>
    <div className="children-empty-inner">
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
      />
    </div>
  </div>
);

export default ChildrenEmpty;
