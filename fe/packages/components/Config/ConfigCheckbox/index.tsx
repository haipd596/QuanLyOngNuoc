import { Switch } from 'antd';
import { SwitchProps } from 'antd/lib';
import React from 'react';

export interface ConfigCheckboxProps extends SwitchProps {
  defaultValue: boolean,
}

function ConfigCheckbox(props: ConfigCheckboxProps) {
  const { defaultValue } = props;

  return <Switch {...props} defaultChecked={defaultValue} />;
}

export default ConfigCheckbox;
