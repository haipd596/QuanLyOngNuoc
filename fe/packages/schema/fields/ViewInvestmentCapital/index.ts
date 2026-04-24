import { FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';

export const createViewInvestmentCapital = (extraFieldConfig: AnyObject = {}) => (
  new Field({
    fieldName: FIELD_NAME.VIEW_INVESTMENT_CAPITAL,
    key: '',
    version: 0,
    componentPropsAllowConfig: {},
    ...extraFieldConfig,
  })
);
