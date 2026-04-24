import { ConfigRadioProps } from '@packages/components/Config/ConfigRadio';
import { DATE_FORMAT } from '@packages/constants/date';
import { CONFIG_ADVANCE_FIELD_TYPE, CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigAdvance, ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createDatePickerField = (extraFieldConfig: AnyObject = {}) => new Field<any>({
  key: '',
  fieldName: FIELD_NAME.DATE_PICKER,
  version: 0,
  componentPropsAllowConfig: {
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
          {
            label: DATE_FORMAT.MM_YYYY,
            value: DATE_FORMAT.MM_YYYY,
          },
          {
            label: DATE_FORMAT.MM_YYYY_DASH,
            value: DATE_FORMAT.MM_YYYY_DASH,
          },
        ],
      },
    }),
    isDisabledFromCurrent: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options date less than current date',
      children: {
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Ngày',
          },
        },
        isShowErrorForDay: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        isShowErrorForYear: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        messageError: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'phải nhỏ hơn hoặc bằng ngày hiện tại!',
          },
        },
      },
    }),
    isDisabledGreaterThanCurrent: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options date greater than current date',
      children: {
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Ngày',
          },
        },
        isShowErrorForDay: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        isShowErrorForYear: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        messageError: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'phải lớn hơn hoặc bằng ngày hiện tại!',
          },
        },
      },
    }),
  },
  additionsComponentConfig: {
    // isDisabledFromCurrentDay: new ConfigBasic({
    //   type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
    //   props: {
    //     defaultValue: false,
    //   },
    // }),
    // isDisabledGreaterThanCurrentDay: new ConfigBasic({
    //   type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
    //   props: {
    //     defaultValue: false,
    //   },
    // }),
    isDisabledFromCurrent: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options date less than current date',
      children: {
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Ngày',
          },
        },
        isShowErrorForDay: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        isShowErrorForYear: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        messageError: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'phải nhỏ hơn hoặc bằng ngày hiện tại!',
          },
        },
      },
    }),
    isDisabledGreaterThanCurrent: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options date greater than current date',
      children: {
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Ngày',
          },
        },
        isShowErrorForDay: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        isShowErrorForYear: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        messageError: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'phải lớn hơn hoặc bằng ngày hiện tại!',
          },
        },
      },
    }),
  },
  ...extraFieldConfig,
});
