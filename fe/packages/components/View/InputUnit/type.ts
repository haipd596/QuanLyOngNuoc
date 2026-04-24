import { IField } from '@packages/main/Forms';
import { LabeledValue } from 'antd/es/select';

type IOptionsForMinimum = {
  isValidatedMiniMum: boolean;
  min: number
};

type IOptionsForMaximum = {
  isValidatedMaxiMum: boolean;
  max: number
};

export type ViewFieldInputUnitType = {
  options: LabeledValue[],
  modeView: string,
  fieldType: string;
  isDisabled: boolean;
  name: string;
  onChange?: (values: any) => void;
  fields: IField[];
  miniMum: IOptionsForMinimum;
  maxiMum: IOptionsForMaximum;
  fieldKey: string;
};
