import { IConfigColumns, ITableViewProps } from '@packages/components/View/ViewTable/type.table';
import { COLUMN_REFERENCES } from '@packages/constants/commons';
import { CONFIG_ADVANCE_FIELD_TYPE, CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { Field } from '@packages/schema/fields/fieldModel';
import { generateUniqIdConfigArray } from '@packages/utils/generateUniqIdColKey';
import { AnyObject } from 'antd/es/_util/type';
import { SelectProps } from 'antd/lib';
import { createViewDigitalSignatureField } from '../DigitalSignatureField';
import { createSelectFileField } from '../SelectFile';
import { createUploadField } from '../UploadField';
import { ConfigAdvance, ConfigBasic } from '../fieldConfig';

export const columnDataType = new ConfigBasic<SelectProps>({
  type: CONFIG_BASIC_FIELD_TYPE.SELECT,
  props: {
    defaultValue: FIELD_NAME.INPUT,
    options: Object.keys(FIELD_NAME).map((type) => ({ label: type, value: type })),
  },
});

export const columnReferenceType = new ConfigBasic<SelectProps>({
  type: CONFIG_BASIC_FIELD_TYPE.CONFIG_OPTION_FOR_REFERENCE_COLUMN,
  props: {
    defaultValue: '[]',
  },
});

export const selectChildren = new ConfigBasic<SelectProps>({
  type: CONFIG_BASIC_FIELD_TYPE.CONFIG_SELECT_GROUP_COLUMN,
  props: {
    defaultValue: null,
    options: [],
    mode: 'tags',
  },
});

export const transformDataColumn = new ConfigBasic({
  type: CONFIG_BASIC_FIELD_TYPE.CODE,
  props: {
    defaultValue: `function transformData(text, record, index) {
  return null;
}`,
  },
});

export const createTableField = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<ITableViewProps>>({
    fieldName: FIELD_NAME.TABLE,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      columns: new ConfigBasic<IConfigColumns>({
        type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
        props: {
          defaultValue: [
            {
              title: 'Người Đăng Ký',
              dataIndex: 'name',
              key: 'name',
              uniqId: generateUniqIdConfigArray(),
              width: 100,
              columnDataType,
              isInitialized: true,
              transformDataColumn,
              isShowColumn: true,
              isShowSummaryCol: false,
              isColDataDuplicate: false,
            },
            {
              title: 'Địa Chỉ',
              dataIndex: 'address',
              key: 'address',
              uniqId: generateUniqIdConfigArray(),
              width: 100,
              columnDataType,
              isInitialized: true,
              transformDataColumn,
              isShowColumn: true,
              isShowSummaryCol: false,
              isColDataDuplicate: false,
            },
            {
              title: COLUMN_REFERENCES,
              dataIndex: COLUMN_REFERENCES,
              key: COLUMN_REFERENCES,
              uniqId: generateUniqIdConfigArray(),
              columnDataType: {
                ...columnDataType,
                props: {
                  ...columnDataType.props,
                  defaultValue: FIELD_NAME.REFERENCES_FIELD,
                },
              },
              columnReferenceType,
              hidden: true,
            },
          ],
        },
      }),
      groupColumns: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
        props: {
          defaultValue: [
            {
              title: '',
              selectChildren,
            },
          ],
        },
      }),
      uploadColumns: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CONFIG_UPLOAD_COLUMNS,
        props: {
          defaultValue: {
            isShowUpload: false,
            isShowSelectFile: false,
            isShowUploadSignature: false,
            configUpload: createUploadField(),
            configSelectFile: createSelectFileField(),
            configUploadSignature: createViewDigitalSignatureField(),
            isMulti: false,
          },
        },
      }),
      titleModal: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          defaultValue: 'Thêm dữ liệu vào bảng',
        },
      }),
      addDataFromExtraSource: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CONFIG_ADD_DATA_FORM_SOURCE,
        props: {
          defaultValue: {
            isShow: false,
            text: 'Thêm từ dữ liệu bên ngoài',
          },
        },
      }),
      isShowOrderNumber: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: true,
        },
      }),
      pagination: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      isShowSummary: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      bordered: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: true,
        },
      }),
      isHiddenAction: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      scroll: new ConfigAdvance({
        type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
        label: 'Scroll Bar',
        children: {
          y: {
            type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
            props: {
              defaultValue: 400,
            },
          },
        },
      }),
      isShowCheckbox: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      maxRowKey: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          defaultValue: '',
        },
      }),
      maxRowErrorMessage: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          defaultValue: 'Lỗi',
        },
      }),
    },
    additionsComponentConfig: {
      uploadColumns: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CONFIG_UPLOAD_COLUMNS,
        props: {
          defaultValue: {
            isShowUpload: false,
            isShowSelectFile: false,
            isShowUploadSignature: false,
            configUpload: createUploadField(),
            configSelectFile: createSelectFileField(),
            configUploadSignature: createViewDigitalSignatureField(),
            isMulti: false,
          },
        },
      }),
    },
    ...extraFieldConfig,
  })
);

export const createSchemaTable = (extraFieldConfig: AnyObject = {}) => {
  const fieldJson = createTableField(extraFieldConfig);

  return fieldJson;
};
