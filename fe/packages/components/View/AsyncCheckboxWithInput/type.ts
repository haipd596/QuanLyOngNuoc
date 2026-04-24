import { SpaceProps } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { LabeledValue } from 'antd/es/select';

export interface ViewCheckboxGroupProps extends Omit<CheckboxGroupProps, 'onChange'> {
  options?: LabeledValue[],
  direction?: SpaceProps['direction'],
  labelPosition?: 'left' | 'right',
  numberOfItems?: number,
  onChange?: (values: any[]) => void;
}
