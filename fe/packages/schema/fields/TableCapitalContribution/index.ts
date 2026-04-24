import { TViewInfo } from '@packages/components/View/ViewInfo/type';
import { FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';

export const createTableCapitalContribution = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<TViewInfo>>({
    fieldName: FIELD_NAME.TABLE_CAPITAL_CONTRIBUTION,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
    },
    ...extraFieldConfig,
  })
);
