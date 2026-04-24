import { Input, InputProps } from 'antd';
import React from 'react';

const MST_INPUT_MAX_LENGTH = 14;

const MSTNumberBuilder = (props: InputProps) => {
  return (
    <Input
      {...props}
      maxLength={props.maxLength ?? MST_INPUT_MAX_LENGTH}
      autoComplete="off"
    />
  );
};

export default MSTNumberBuilder;
