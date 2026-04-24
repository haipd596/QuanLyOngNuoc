import { TableDanhMucProps } from '@packages/components/View/TABLE_DANH_MUC_1/Viewer/TableDanhMucWrapper';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { asyncCommonConfig } from '@packages/constants/jsonConfig';
import { getBaseDvcApi } from '@packages/dvc-service/getBaseUrl';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

const transformDataColumn = new ConfigBasic({
  type: CONFIG_BASIC_FIELD_TYPE.CODE,
  props: {
    defaultValue: `function transformData(text, record, index) {
  return null;
}`,
  },
});

export const createTABLE_DANH_MUC_1Field = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<TableDanhMucProps>>({
  key: '',
  fieldName: FIELD_NAME.TABLE_DANH_MUC_1,
  version: 0,
  componentPropsAllowConfig: {
    isCheckStrictly: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    isSelectionByRadio: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    isShowReloadButton: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    isShowBorder: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    idKey: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Id',
      },
    }),
    parentKey: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'ChaIdId',
      },
    }),
    isShowCheckBoxLeafNode: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    ...asyncCommonConfig,
    action: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.ASYNC_ACTION,
      props: {
        defaultValue: `${getBaseDvcApi()}/_api/web/lists/GetByTitle('dm_LoaiNguyCap')/items`,
      },
    }),
    columns: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
      props: {
        defaultValue: [
          {
            title: 'Tên',
            dataIndex: 'Ten',
            key: 'Ten',
            transformDataColumn,
          },
          {
            title: 'Tên khoa học',
            dataIndex: 'TenKhoaHoc',
            key: 'TenKhoaHoc',
            transformDataColumn,
          },
          {
            title: 'Loại Ưu Tiên Bảo Vệ',
            dataIndex: 'LoaiUuTienBaoVe',
            key: 'LoaiUuTienBaoVe',
            transformDataColumn,
          },
          {
            title: 'Loại Quý Hiếm Nguy Cấp',
            dataIndex: 'LoaiQuyHiemNguyCap',
            key: 'LoaiQuyHiemNguyCap',
            transformDataColumn,
          },
        ],
      },
    }),
    pathToSource: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'value',
      },
    }),
    indexLabel: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: '',
      },
    }),
    indexValue: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: '',
      },
    }),
  },
  ...extraFieldConfig,
});
