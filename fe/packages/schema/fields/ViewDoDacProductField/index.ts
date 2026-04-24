import { CONFIG_ADVANCE_FIELD_TYPE, CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigAdvance, ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createViewDoDacProductField = (
  extraFieldConfig: AnyObject = {},
) => new Field({
  key: '',
  fieldName: FIELD_NAME.VIEW_DO_DAC_PRODUCT,
  version: 0,
  componentPropsAllowConfig: {
    columns: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
      props: {
        defaultValue: [
          {
            title: 'Tư liệu',
            dataIndex: 'MaSP',
            key: 'MaSP',
            editable: false,
          },
          {
            title: 'Số lượng',
            dataIndex: 'TrangThai',
            key: 'TrangThai',
            editable: true,
          },
          {
            title: 'Đơn giá',
            dataIndex: 'GiaVector',
            key: 'GiaVector',
            editable: false,
          },
          {
            title: 'Loại dữ liệu',
            dataIndex: 'documentType',
            key: 'documentType',
            editable: false,
          },
          // {
          //   title: 'Ghi rõ tên đề án',
          //   dataIndex: 'TenDeAn',
          //   key: 'TenDeAn',
          //   editable: true,
          // },
          {
            title: 'Khu vực',
            dataIndex: 'KhuVuc',
            key: 'KhuVuc',
            editable: true,
          },
          {
            title: 'Mục đích sử dụng (Ghi rõ tên đề án, dự án, công trình)',
            dataIndex: 'MucDichSuDung',
            key: 'MucDichSuDung',
            editable: true,
          },
          {
            title: 'Hình thức cung cấp',
            dataIndex: 'HinhThucCungCap',
            key: 'HinhThucCungCap',
            editable: true,
          },
          {
            title: 'Ghi chú',
            dataIndex: 'GhiChu',
            key: 'GhiChu',
            editable: true,
          },
          // {
          //   title: 'Dự án',
          //   dataIndex: 'DuAn',
          //   key: 'DuAn',
          //   editable: true,
          // },
          // {
          //   title: 'Công trình',
          //   dataIndex: 'constructor',
          //   key: 'constructor',
          //   editable: true,
          // },
        ],
      },
    }),
    documentType: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options for documentType',
      children: {
        required: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: true,
          },
        },
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Loại tư liệu',
          },
        },
        // name: {
        //   type: CONFIG_BASIC_FIELD_TYPE.STRING,
        //   props: {
        //     defaultValue: 'documentType',
        //     disabled: true,
        //   },
        // },
        placeholder: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Chọn nhóm tư liệu',
          },
        },
      },
    }),
    documentDetail: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options for documentDetail',
      children: {
        required: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: true,
          },
        },
        label: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Tư liệu',
          },
        },
        // name: {
        //   type: CONFIG_BASIC_FIELD_TYPE.STRING,
        //   props: {
        //     defaultValue: 'documentDetail',
        //     disabled: true,
        //   },
        // },
        placeholder: {
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Chọn thông tin tư liệu',
          },
        },
      },
    }),
    tableServerPayloadKey: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'tableData',
      },
    }),
    isDataDynamic: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    relationshipKey: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'relationshipKey',
      },
    }),

  },
  ...extraFieldConfig,
});
