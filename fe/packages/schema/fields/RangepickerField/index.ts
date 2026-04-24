import { ConfigRadioProps } from '@packages/components/Config/ConfigRadio';
import { ViewRangePickerProps } from '@packages/components/View/Rangepicker/Viewer';
import { DATE_FORMAT } from '@packages/constants/date';
import { CONFIG_ADVANCE_FIELD_TYPE, CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigAdvance, ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createRangepickerField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<ViewRangePickerProps>>({
  key: '',
  fieldName: FIELD_NAME.RANGEPICKER,
  version: 0,
  componentPropsAllowConfig: {
    configSpan: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: 12,
        options: [
          {
            label: 'Horizontal',
            value: 12,
          },
          {
            label: 'Vertical',
            value: 24,
          },
        ],
      },
    }),
    isRequired: {
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    },
    typeOfDate: new ConfigBasic<Partial<ConfigRadioProps>>({
      type: CONFIG_BASIC_FIELD_TYPE.RADIO,
      props: {
        defaultValue: DATE_FORMAT.DD_MM_YYYY,
        options: [
          {
            label: DATE_FORMAT.DD_MM_YYYY,
            value: DATE_FORMAT.DD_MM_YYYY,
          },
          // {
          //   label: DATE_FORMAT.dd_MM_YYYY,
          //   value: DATE_FORMAT.dd_MM_YYYY,
          // },
          {
            label: DATE_FORMAT.YYYY_MM_DD,
            value: DATE_FORMAT.YYYY_MM_DD,
          },
          // {
          //   label: DATE_FORMAT.YYYY_MM_dd,
          //   value: DATE_FORMAT.YYYY_MM_dd,
          // },
          {
            label: DATE_FORMAT.DDMMYYYY,
            value: DATE_FORMAT.DDMMYYYY,
          },
          // {
          //   label: DATE_FORMAT.ddMMYYYY,
          //   value: DATE_FORMAT.ddMMYYYY,
          // },
          {
            label: DATE_FORMAT.YYYYMMDD,
            value: DATE_FORMAT.YYYYMMDD,
          },
          // {
          //   label: DATE_FORMAT.YYYYMMdd,
          //   value: DATE_FORMAT.YYYYMMdd,
          // },
          {
            label: DATE_FORMAT.YYYY,
            value: DATE_FORMAT.YYYY,
          },
        ],
      },
    }),
    nameStartDate: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options for start date',
      children: {
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Ngày bắt đầu',
          },
        },
        name: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'NgayBatDau',
            disabled: false,
          },
        },
        placeholder: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Chọn ngày bắt đầu',
          },
        },
        errorMessage: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Vui lòng chọn ngày bắt đầu!',
          },
        },
        isCheckCurrentDate: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        isCheckGreaterThanDate: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
      },
    }),
    nameEndDate: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options for end date',
      children: {
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Ngày kết thúc',
          },
        },
        name: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'NgayKetThuc',
            disabled: false,
          },
        },
        placeholder: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Chọn ngày bắt đầu',
          },
        },
        errorMessage: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Vui lòng chọn ngày kết thúc!',
          },
        },
        isCheckCurrentDate: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        isCheckGreaterThanDate: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        maxYearDiff: {
          type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
          props: {
            defaultValue: null,
          },
        },
      },
    }),
    gutter: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
      props: {
        isAddable: false,
        defaultValue: [
          {
            gutterX: 18,
            gutterY: 0,
          },
        ],
      },
    }),
  },
  ...extraFieldConfig,
});
