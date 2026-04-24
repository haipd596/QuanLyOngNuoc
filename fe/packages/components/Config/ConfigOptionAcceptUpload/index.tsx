import { Select } from 'antd';
import React, { useState } from 'react';
import { OPTIONS_ACCEPT_OTHER_TYPES, OPTIONS_ACCEPT_UPLOAD } from './constants';

type TConfigOptionAcceptUploadProps = {
  defaultValue: string[],
  onChange: (value: string[]) => void
};

const ConfigOptionAcceptUpload = ({ defaultValue, onChange }: TConfigOptionAcceptUploadProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (_value: any) => {
    onChange(_value);
    setValue(_value);
  };

  return (
    <div>
      <b>Định dạng các loại file có thể upload</b>
      <Select
        options={OPTIONS_ACCEPT_UPLOAD.concat(OPTIONS_ACCEPT_OTHER_TYPES)}
        value={value}
        onChange={handleChange}
        mode="tags"
      />
    </div>
  );
};

export default ConfigOptionAcceptUpload;
