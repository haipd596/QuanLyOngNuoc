import { ViewButtonTraCuuProps } from '@packages/components/View/ViewButtonTraCuuGiayPhep/Viewer';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createViewButtonTraCuuGiayPhepField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<ViewButtonTraCuuProps>>({
  key: '',
  fieldName: FIELD_NAME.VIEW_BUTTON_TRA_CUU_GIAY_PHEP,
  version: 0,
  componentPropsAllowConfig: {
    titleCode: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Số văn bản',
      },
    }),
    titleDate: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Ngày cấp',
      },
    }),
    errorMessageCode: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Nhập mã tra cứu',
      },
    }),
    errorMessageDate: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Nhập ngày cấp',
      },
    }),
    keyCode: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'SoVanBan',
      },
    }),
    keyDate: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'NgayQuyetDinh',
      },
    }),
  },
  ...extraFieldConfig,
});
