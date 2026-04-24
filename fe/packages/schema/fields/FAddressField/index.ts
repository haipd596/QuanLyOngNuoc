import { ConfigCheckboxProps } from '@packages/components/Config';
import { CONFIG_ADVANCE_FIELD_TYPE, CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { COLUMN_DEFAULT_CONFIG } from '@packages/constants/jsonConfig';
import { IProps } from 'packages/components/FAddress/types';
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

export const createFAddressField = (extraConfig: any = {}) => (
  new Field<Partial<IProps>>({
    componentPropsAllowConfig: {
      isAddressWrappedSpecial: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      isShowDetailAddress: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      optionsAgency: new ConfigAdvance({
        type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
        label: 'options for agency',
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
              defaultValue: 'Cơ quan tiếp nhận',
            },
          },
          placeholder: {
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: 'Cơ quan tiếp nhận',
            },
          },
        },
      }),
      optionsProvince: new ConfigAdvance({
        type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
        label: 'options for province',
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
              defaultValue: 'Tỉnh/Thành Phố',
            },
          },
          name: {
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: 'TinhId',
              disabled: true,
            },
          },
          placeholder: {
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: 'Chọn tỉnh/thành phố...',
            },
          },
          colConfig,
        },
      }),
      // optionsDistrict: new ConfigAdvance({
      //   label: 'options for district',
      //   type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      //   children: {
      //     required: {
      //       type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      //       props: {
      //         defaultValue: false,
      //       },
      //     },
      //     label: {
      //       type: CONFIG_BASIC_FIELD_TYPE.STRING,
      //       props: {
      //         defaultValue: 'Quận/Huyện',
      //       },
      //     },
      //     name: {
      //       type: CONFIG_BASIC_FIELD_TYPE.STRING,
      //       props: {
      //         defaultValue: 'HuyenId',
      //         disabled: true,
      //       },
      //     },
      //     placeholder: {
      //       type: CONFIG_BASIC_FIELD_TYPE.STRING,
      //       props: {
      //         defaultValue: 'Chọn quận/huyện...',
      //       },
      //     },
      //     colConfig,
      //   },
      // }),
      optionsWard: new ConfigAdvance({
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
              defaultValue: 'Phường/Xã',
            },
          },
          name: {
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: 'XaId',
              disabled: true,
            },
          },
          placeholder: {
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: 'Chọn phường/xã...',
            },
          },
          colConfig,
        },
      }),
      // isShowDistrict: new ConfigBasic<ConfigCheckboxProps>({
      //   type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      //   props: {
      //     defaultValue: true,
      //   },
      // }),
      showSearch: new ConfigBasic<ConfigCheckboxProps>({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: true,
        },
      }),
      isShowWard: new ConfigBasic<ConfigCheckboxProps>({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: true,
        },
      }),
      disabledCurrentLocation: new ConfigBasic<ConfigCheckboxProps>({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: true,
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
    // formItemPropsReadOnly: {
    //   rules: [{ required: true }] as any,
    // },
    version: 0,
    fieldName: FIELD_NAME.F_ADDRESS,
    title: 'Select Address',
    key: '',
    isNotCompactJsonOutput: true,
    ...extraConfig,
  })
);
