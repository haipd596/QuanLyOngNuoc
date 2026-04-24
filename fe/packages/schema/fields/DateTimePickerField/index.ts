import { ConfigRadioProps } from '@packages/components/Config/ConfigRadio';
import { ViewDateProps } from '@packages/components/ViewDate';
import { DATE_TIME_FORMAT } from '@packages/constants/date';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createDateTimePickerField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<ViewDateProps>>({
  key: '',
  fieldName: FIELD_NAME.DATETIME_PICKER,
  version: 0,
  componentPropsAllowConfig: {
    typeOfDate: new ConfigBasic<Partial<ConfigRadioProps>>({
      type: CONFIG_BASIC_FIELD_TYPE.RADIO,
      props: {
        defaultValue: DATE_TIME_FORMAT.YYYY_MM_DD_HH_mm_ss,
        options: [
          {
            label: DATE_TIME_FORMAT.YYYY_MM_DD_HH_mm_ss,
            value: DATE_TIME_FORMAT.YYYY_MM_DD_HH_mm_ss,
          },
          {
            label: DATE_TIME_FORMAT.YYYYMMDD_HH_mm_ss,
            value: DATE_TIME_FORMAT.YYYYMMDD_HH_mm_ss,
          },
          {
            label: DATE_TIME_FORMAT.YYYY_MM_DD_HH_mm,
            value: DATE_TIME_FORMAT.YYYY_MM_DD_HH_mm,
          },
          {
            label: DATE_TIME_FORMAT.YYYYMMDD_HH_mm,
            value: DATE_TIME_FORMAT.YYYYMMDD_HH_mm,
          },
        ],
      },
    }),
  },
  ...extraFieldConfig,
});
