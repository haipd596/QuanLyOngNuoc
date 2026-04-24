import { ColumnGroupType, ColumnType } from 'antd/es/table';
import _isArray from 'lodash/isArray';

import { groupTableHead } from '@packages/components/View/ViewTable/utils';
import { FIELD_NAME } from '@packages/constants/fields';
import { COLUMN_TABLE_STT } from './column';

export const configColumns = (
  fieldName: string,
  columns: any,
  groupColumns?: any,
  isShowOrderNumber?: boolean,
) => {
  // console.log('🚀 ~ fieldName:', fieldName);
  if (!_isArray(columns) || columns.length <= 0) return [];
  const isShowColumns = columns.filter(({ isShowColumn }) => isShowColumn);
  let initColumns: (ColumnType<any> | ColumnGroupType<any>)[] = isShowColumns;

  if (fieldName === FIELD_NAME.TABLE || fieldName === FIELD_NAME.FIELD_TABLE_SINGLE) {
    initColumns = groupTableHead(initColumns, groupColumns);
  }

  if (isShowOrderNumber) initColumns = COLUMN_TABLE_STT.concat(initColumns);

  return initColumns;
};
