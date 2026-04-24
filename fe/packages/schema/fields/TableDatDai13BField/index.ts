import { Table13BProps } from '@packages/components/View/TableDatDai13B/Viewer';
import { FIELD_NAME } from '@packages/constants/fields';
import { LANGUAGES_SWITCHER_CONFIG } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';

export const createTableDatDai13BField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<Table13BProps>>({
  key: '',
  fieldName: FIELD_NAME.TABLE_DAT_DAI13B,
  version: 0,
  componentPropsAllowConfig: {
    ...LANGUAGES_SWITCHER_CONFIG,
  },
  ...extraFieldConfig,
});
