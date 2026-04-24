import { SpaceProps } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';

export interface ICheckBoxInput {
  options?: { key: string; value: string }[]
}

export interface ViewCheckboxInput extends Omit<CheckboxGroupProps, 'onChange'> {
  options?: { key: string; value: string, label: string }[],
  direction?: SpaceProps['direction'],
  labelPosition?: 'left' | 'right',
  onChange?: (values: any[]) => void;
}
