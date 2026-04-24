import { AnyObject } from 'antd/es/_util/type';
import { LabeledValue } from 'antd/es/select';
import { Switch } from 'antd/lib';
import ConfigArray from '../ConfigArray';
import { ConfigArrayProps } from '../ConfigArray/type';
import { SelectSource } from './SelectSource';

export type TConfigOptionSelectProps = {
  defaultValue: {
    dataSource: {
      dataIndex: string,
      fieldKey: string
    },
    isGetFromOtherField: boolean,
    staticOption: LabeledValue[]
  },
  onSave: (value: any) => void,
  onChange: (value: any) => void,
};

const ConfigOptionSelect = (props: TConfigOptionSelectProps & ConfigArrayProps) => {
  const { defaultValue, onChange, onSave } = props;
  const { staticOption, isGetFromOtherField } = defaultValue;

  const handleSwitchChange = (checked: boolean) => {
    onChange({
      ...defaultValue,
      isGetFromOtherField: checked,
    });
  };

  const handleSaveStaticOptions = (newOptions: AnyObject[]) => {
    onSave({
      ...defaultValue,
      staticOption: newOptions,
    });
  };

  const handleChangeDataSource = (value: any) => {
    onSave({
      ...defaultValue,
      dataSource: value,
    });
  };

  return (
    <>
      <p>
        <Switch value={isGetFromOtherField} onChange={handleSwitchChange} />
        {' '}
        Change data source mode. Currently mode:
        {' '}
        <b>{!isGetFromOtherField ? 'Static' : 'Extra source'}</b>
      </p>

      {!isGetFromOtherField
        ? <ConfigArray {...props} onSave={handleSaveStaticOptions} defaultValue={staticOption} />
        : <SelectSource {...props} onSave={handleChangeDataSource} />}
    </>
  );
};

export default ConfigOptionSelect;
