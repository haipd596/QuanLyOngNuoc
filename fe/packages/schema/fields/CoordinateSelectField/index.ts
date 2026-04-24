import { CONFIG_ADVANCE_FIELD_TYPE, CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { COLUMN_DEFAULT_CONFIG } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigAdvance, ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

const colConfig = new ConfigBasic({
  type: CONFIG_BASIC_FIELD_TYPE.CONFIG_NUMBER_COLUMNS,
  props: {
    isAddable: false,
    isDeletable: false,
    defaultValue: [{
      ...COLUMN_DEFAULT_CONFIG, xl: 24, xxl: 24, lg: 24,
    }],
  },
});

export const createCoordinateSelectField = (
  extraFieldConfig: AnyObject = {},
) => new Field({
  key: '',
  fieldName: FIELD_NAME.COORDINATE_SELECT,
  version: 0,
  componentPropsAllowConfig: {
    optionsCoordinate: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options for coordinate',
      children: {
        required: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Hệ tọa độ',
          },
        },
        name: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'HeToaDo',
            // disabled: false,
          },
        },
        placeholder: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: '',
          },
        },
        colConfig,
      },
    }),
    optionsCentralMeridian: new ConfigAdvance({
      label: 'options for centralMeridian',
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      children: {
        required: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Kinh tuyến trục',
          },
        },
        name: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'KinhTuyenTruc',
            // disabled: false,
          },
        },
        placeholder: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: '',
          },
        },
        colConfig,
      },
    }),
    optionsZone: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options for ward',
      children: {
        required: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Múi chiếu',
          },
        },
        name: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'MuiChieu',
            // disabled: false,
          },
        },
        placeholder: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: '',
          },
        },
        colConfig,
      },
    }),
    gutter: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
      props: {
        isAddable: false,
        defaultValue: [
          {
            gutterX: 8,
            gutterY: 8,
          },
        ],
      },
    }),
  },
  ...extraFieldConfig,
});
