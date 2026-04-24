import { Col, ColProps } from 'antd';
import React from 'react';

export interface ViewColumnProps extends ColProps { }

export function ViewColumn(props: ViewColumnProps) {
  const { ...rest } = props;

  return (
    <Col {...rest} />
  );
}
