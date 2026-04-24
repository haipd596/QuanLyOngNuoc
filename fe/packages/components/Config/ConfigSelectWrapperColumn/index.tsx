import { Select, SelectProps } from 'antd';
import React from 'react';

const ConfigSelectWrapperColumn = (props: SelectProps) => {
  const options = Array.from(
    { length: 24 },
    (_, index) => ({ label: index + 1, value: index + 1 }),
  );

  return (
    <Select options={options} {...props} />
  );
};

export default ConfigSelectWrapperColumn;
