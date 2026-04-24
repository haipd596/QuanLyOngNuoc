import { Field } from '@packages/main/Forms';
import { Button, Input } from 'antd';
import { InputProps } from 'antd/lib';
// import _get from 'lodash/get';
import React, { useState } from 'react';

type TConfigChangeServerPayloadKeyProps = {
  defaultValue: string,
  fields: Field[],
  onSave: (value: string) => void
};

const ConfigChangeServerPayloadKey = (props: TConfigChangeServerPayloadKeyProps) => {
  const {
    defaultValue,
    // fields,
    onSave,
  } = props;
  const [text, setText] = useState(defaultValue);

  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleChange: InputProps['onChange'] = (e) => {
    const value = e.target.value.trim();
    setText(value);
    setIsDuplicate(false);
  };

  const handleSave = () => {
    // const _isDuplicated = fields.some((field) => {
    // eslint-disable-next-line max-len
    //   const serverPayloadKey = _get(field, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', '');

    //   return serverPayloadKey === text;
    // });

    // setIsDuplicate(_isDuplicated);

    // if (_isDuplicated) {
    //   return;
    // }

    onSave(text);
  };

  return (
    <div className="flex">
      <Input defaultValue={defaultValue} onChange={handleChange} />
      {isDuplicate && <p style={{ color: 'red' }} className="error">Key is used</p>}
      <Button disabled={isDuplicate} onClick={handleSave}>Save</Button>
    </div>
  );
};

export default ConfigChangeServerPayloadKey;
