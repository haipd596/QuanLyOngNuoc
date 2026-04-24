import { Col } from 'antd';
import React from 'react';
import './styles.scss';

interface IColumn {
  columnWith: number | undefined;
  children: React.ReactNode,
  isNotGrid?: boolean,
  className?: string;
}

const ConfigColumn: React.FC<IColumn> = ({
  columnWith = 24, children, isNotGrid, className,
}) => (
  isNotGrid ? children : (
    <Col
      className={className}
      lg={columnWith}
      xl={columnWith}
      xxl={columnWith}
      md={columnWith}
      sm={24}
      xs={24}
    >
      {children}
    </Col>
  )

);

export default ConfigColumn;
