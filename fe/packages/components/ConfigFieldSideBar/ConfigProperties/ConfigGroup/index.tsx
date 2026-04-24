import React, { FC } from 'react';
import './styles.scss';
import PropertiesGroup from '@packages/components/PropertiesGroup';

interface ConfigCategoryProps {
  children: React.ReactNode;
  title: string;
}
const ConfigGroup:FC<ConfigCategoryProps> = ({ children, title }) : React.JSX.Element => (
  <div className="config-group--wrapper">
    <PropertiesGroup title={title}>
      {children}
    </PropertiesGroup>
  </div>
);

export default ConfigGroup;
