import { TViewInfo } from '@packages/components/View/ViewInfo/type';
import { FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';

export const createViewInvestorTable = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<TViewInfo>>({
    fieldName: FIELD_NAME.VIEW_INVESTOR_TABLE,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
    },
    ...extraFieldConfig,
  })
);
