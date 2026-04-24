import { Spin } from 'antd';
import React from 'react';
import './styles.scss';

type TLoadingProps = {
  children: React.ReactNode,
  isLoading?: boolean
};

const Loading = ({ children, isLoading }: TLoadingProps) => (
  isLoading ? (
    <div className="loading-outer">
      <Spin className="spinning" />
      <div className="loading-inner">{children}</div>
    </div>
  ) : children
);

export default Loading;
