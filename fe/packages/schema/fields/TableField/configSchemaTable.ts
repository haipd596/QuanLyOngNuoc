import { TColumnTableDefaultValue } from '@packages/components/View/ViewTable/type.table';
import { FIELD_NAME } from '@packages/constants/fields';
import { transformFieldMatchWithDefinedColumn } from '@packages/utils';
// import { isDuplicate } from '@packages/utils/common';
import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';

export const filterAllColumnsHasSameKey = (columns: any) => _.filter(columns, 'key');

export const FORM_TABLE_SUPPORT = [
  FIELD_NAME.INPUT,
  FIELD_NAME.PHONE_NUMBER,
  FIELD_NAME.CMND_NUMBER,
  FIELD_NAME.MST_NUMBER,
  FIELD_NAME.EMAIL,
  FIELD_NAME.SELECT,
  FIELD_NAME.INPUT_NUMBER,
  FIELD_NAME.DATE_PICKER,
  FIELD_NAME.RADIO_GROUP,
  FIELD_NAME.INPUT_PASSWORD,
  FIELD_NAME.CHECKBOX_GROUP,
  FIELD_NAME.ASYNC_CHECKBOX_GROUP,
  FIELD_NAME.ASYNC_RADIO_GROUP,
  FIELD_NAME.ASYNC_SELECT,
  FIELD_NAME.DATETIME_PICKER,
  FIELD_NAME.UPLOAD,
  FIELD_NAME.COLUMN_FIELD,
  FIELD_NAME.F_ADDRESS,
  FIELD_NAME.REFERENCES_FIELD,
  FIELD_NAME.GROUP_SELECT,
  FIELD_NAME.TEXTAREA,
  FIELD_NAME.COORDINATE_SELECT,
  FIELD_NAME.TEXT_VIEW,
  FIELD_NAME.INPUT_WITH_UPLOAD,
  FIELD_NAME.RANGEPICKER,
  FIELD_NAME.INPUT_NUMBER_RANGE,
  FIELD_NAME.TREE_SELECT,
];

const FORM_FIELD_TABLE_SINGLE_SUPPORT = [
  FIELD_NAME.INPUT,
  FIELD_NAME.INPUT_NUMBER,
  FIELD_NAME.REFERENCES_FIELD,
];

interface IResponseSchema {
  status: boolean;
  message: string;
  schemas: any;
}

/**
  * Function này sẽ lấy data từ columns table và xử lí logic để tạo nên schema field.
  * Step 1: Lấy tất cả những FIELD_NAME từ columns.
  * Step 2: Chỉ settings sẵn những field có thể sử dụng được trong table.
  * Step 3: Lấy ra tất cả dataIndex từ columns
  * Step 4: Nếu là duplicate dataIndex thì thông báo lỗi
  * (Vì xử lí logic có thể ảnh hưởng tới dataTable)
 */

export const configSchemaTable = (columns?: AnyObject, _fieldName?: string): IResponseSchema => {
  if (columns && _.isArray(columns)) {
    const formItemSupport = columns.map((item: TColumnTableDefaultValue) => (
      _.get(item, 'columnDataType.props.defaultValue')
    ));

    if (_fieldName === FIELD_NAME.FIELD_TABLE_SINGLE) {
      const formItemNotSupport = formItemSupport.filter((field: string) => (
        !FORM_FIELD_TABLE_SINGLE_SUPPORT.includes(field)
      ));

      if (formItemNotSupport.length > 0) {
        return {
          status: false,
          schemas: {},
          message: `${formItemNotSupport[0]} không được hỗ trợ trong table!`,
        };
      }
    }

    const formItemNotSupport = formItemSupport.filter((field: string) => (
      !FORM_TABLE_SUPPORT.includes(field)
    ));

    if (formItemNotSupport.length > 0) {
      return {
        status: false,
        schemas: {},
        message: `${formItemNotSupport[0]} không được hỗ trợ trong table!`,
      };
    }

    const fieldNeedCheckKeyFromColumnTable = filterAllColumnsHasSameKey(columns);

    const groupedByDataIndex = _.groupBy(fieldNeedCheckKeyFromColumnTable, 'dataIndex');

    const duplicatesValue: AnyObject[] = _.filter(groupedByDataIndex, (group) => group.length > 1);
    const flattenValues = _.flatten(duplicatesValue);
    if (flattenValues.length > 0) {
      return {
        status: false,
        schemas: {},
        message: `${flattenValues[0]?.dataIndex} đã được sử dụng ở mục ${flattenValues[0]?.title}!`,
      };
    }

    const getFieldsConfig = columns.map((col: TColumnTableDefaultValue) => {
      const fieldName = col.columnDataType.props.defaultValue;

      return {
        ...transformFieldMatchWithDefinedColumn(fieldName, col), isNotCompactJsonOutput: true,
      };
    });

    // if (
    //   isDuplicate(getFieldsConfig, 'componentPropsAllowConfig.nameEndDate')
    //   || isDuplicate(getFieldsConfig, 'componentPropsAllowConfig.nameStartDate')
    // ) {
    //   return {
    //     status: false,
    //     schemas: {},
    //     message: 'Rang',
    //   };
    // }

    const configSchema = {
      title: 'form',
      type: 'object',
      fields: getFieldsConfig,
    };

    return {
      status: true,
      schemas: configSchema,
      message: '',
    };
  }

  return {
    status: false,
    schemas: {},
    message: 'Tạo field mới không thành công!',
  };
};
