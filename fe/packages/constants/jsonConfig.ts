import { LANGUAGES_SWITCHER } from '@packages/components/View/TableGroup/Viewer/LanguageSwitcherForIndividuals/constant';
import { ConfigBasic } from '@packages/schema/fields/fieldConfig';
import { SpaceProps } from 'antd';
import { CONFIG_BASIC_FIELD_TYPE } from './fields';

export const asyncCommonConfig = ({
  action: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.ASYNC_ACTION,
    props: {
      defaultValue: 'http://localhost:3000/api/books',
    },
  }),
  pathToSource: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: 'data',
    },
  }),
  indexLabel: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: 'name',
    },
  }),
  indexValue: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: 'id',
    },
  }),
  // queryParams: new ConfigBasic({
  //   type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
  //   props: {
  //     defaultValue: [
  //       {
  //         key: '',
  //         value: '',
  //       },
  //     ],
  //   },
  // }),
  headers: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
    props: {
      defaultValue: [
        {
          key: 'Accept',
          value: 'application/json;odata=nometadata',
        },
      ],
    },
  }),
});

export const asyncUploadConfig = ({
  action: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.ASYNC_ACTION,
    props: {
      defaultValue: 'http://localhost:3000/api/books',
    },
  }),
  pathToSource: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: 'data',
    },
  }),
  indexLabel: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: 'name',
    },
  }),
  fileUploadkey: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: 'file',
    },
  }),
  indexValue: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: 'id',
    },
  }),
  queryParams: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
    props: {
      defaultValue: [
        {
          key: 'cat',
          value: 'books',
        },
      ],
    },
  }),
  headers: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
    props: {
      defaultValue: [
        {
          key: 'Accept',
          value: 'application/json,text/javascript,*/*; q=0.01',
        },
        {
          key: 'Authorization',
          value: 'Basic TURNX0FVVEhfQVBJOnNlY3JldA==',
        },
        {
          key: 'X-ApplicationId',
          value: '48ED5B71-66DC-4725-9604-4C042E45FA3F',
        },
        {
          key: 'X-User',
          value: '7efa183f-0013-43d6-a972-29abd7a93bc1',
        },
      ],
    },
  }),
});

export const asyncSelectFileConfig = ({
  ...asyncCommonConfig,
  action: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.ASYNC_ACTION,
    props: {
      defaultValue: 'https://api.unsplash.com/photos?page=1&client_id=Re3bE5tA9GsxKOvBpEx2qBkMaPjnkmlfzZBJvSmOUVU',
    },
  }),
  pathToSource: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: '',
    },
  }),
  indexLabel: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: 'slug',
    },
  }),
  indexValue: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: 'id',
    },
  }),
  indexThumb: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: 'urls.thumb',
    },
  }),
});

export const directionRadioGroup = new ConfigBasic<{
  defaultValue: SpaceProps['direction'],
  options: Array<{
    label: string,
    value: SpaceProps['direction']
  }>
}>({
  type: CONFIG_BASIC_FIELD_TYPE.SELECT,
  props: {
    defaultValue: 'horizontal',
    options: [
      {
        label: 'Horizontal',
        value: 'horizontal',
      },
      {
        label: 'Vertical',
        value: 'vertical',
      },
    ],
  },
});

export const COLUMN_DEFAULT_CONFIG = {
  xxl: 12,
  xl: 12,
  lg: 12,
  md: 12,
  sm: 24,
  xs: 24,
};

export const LANGUAGES_SWITCHER_CONFIG = {
  languages: new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.SELECT,
    props: {
      defaultValue: LANGUAGES_SWITCHER.VI,
      options: [
        {
          label: LANGUAGES_SWITCHER.VI,
          value: LANGUAGES_SWITCHER.VI,
        },
        {
          label: LANGUAGES_SWITCHER.EN,
          value: LANGUAGES_SWITCHER.EN,
        },
      ],
    },
  }),
};

export const THANH_PHAN_HSQD_KEY = 'ASYNC_TABLE_767';
export const QUA_TRINH_XU_LY_KEY = 'ASYNC_TABLE_1934';
