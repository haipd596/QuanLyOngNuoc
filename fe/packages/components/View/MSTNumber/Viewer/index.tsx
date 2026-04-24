import { Input, InputProps } from 'antd';
import React from 'react';

/** MST VN: tối đa 14 ký tự khi nhập dạng 10 + '-' + 3 */
const MST_INPUT_MAX_LENGTH = 14;

const MSTNumberViewer = (props: InputProps) => {
  return (
    <Input
      {...props}
      maxLength={props.maxLength ?? MST_INPUT_MAX_LENGTH}
      autoComplete="off"
    />
  );
};

export default MSTNumberViewer;
