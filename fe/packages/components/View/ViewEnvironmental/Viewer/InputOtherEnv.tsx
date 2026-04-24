import { Flex, Input } from 'antd';
import { useState } from 'react';

type TInputOtherEnvProps = {
  value: string;
  onChange: (value: any) => void
};

const InputOtherEnv = ({
  value, onChange,
}: TInputOtherEnvProps) => {
  const [checkboxValue, setCheckboxValue] = useState(JSON.parse(value));
  const targetNameOther = JSON.parse(value)
  const {PhamViTen} = targetNameOther

  return (
    <Flex gap={8}>
      <Input
        value={checkboxValue.PhamViTenKhac}
        defaultValue={checkboxValue.PhamViTenKhac}
        onChange={(e) => {
          const _checkboxValue = {
            ...checkboxValue,
            PhamViTenKhac: e.target.value,
          };

          setCheckboxValue(_checkboxValue);
          onChange(_checkboxValue);
        }}
        placeholder={PhamViTen}
      />
    </Flex>
  );
};

export default InputOtherEnv;
