import { TUploadColumns } from '@packages/components/View/ViewTable/type.table';
import { FILE_WIDTH_COLUMN } from '@packages/constants/commons';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import _get from 'lodash/get';

export const COLUMN_TABLE_FILE = {
  title: 'Tệp đính kèm',
  width: FILE_WIDTH_COLUMN,
  dataIndex: 'file',
  align: 'center',
  className: 'file-table',
} as ColumnType<any> | ColumnGroupType<any>;

export const COLUMN_TABLE_STT = [
  {
    title: 'STT',
    dataIndex: 'stt',
    align: 'center',
    className: 'stt-table',
    width: 40,
    ellipsis: true,
    render: (_value, _record, index) => index + 1,
  } as ColumnType<any> | ColumnGroupType<any>,
];

export const COLUMN_TABLE_ACTION = {
  title: 'Thao tác',
  dataIndex: 'action',
  align: 'center',
  className: 'action-table',
  width: FILE_WIDTH_COLUMN,
} as ColumnType<any> | ColumnGroupType<any>;

/**
 * @description Dùng để kiểm tra giá trị sau khi cấu hình file
 * @param showFile Là các giá trị được lấy từ config json
 * @returns true/false
 */
export const isShowFile = (showFile: TUploadColumns): boolean => {
  const { isShowUpload, isShowSelectFile, isShowUploadSignature } = showFile;
  if (isShowUpload || isShowSelectFile || isShowUploadSignature) {
    return true;
  }
  return false;
};

export const summaryTable = (datasources: any, columns: any[]) => {
  const result: any = {
    isSum: true,
  };

  columns.forEach((_val) => {
    switch (_val.dataIndex) {
      case 'stt':
        result.stt = 0;
        break;
      default:
        if (_get(_val, 'isShowSummaryCol', false)) {
          const total = datasources.reduce((acc: number, item: any) => {
            const value = _get(item, _val.dataIndex, 0);

            return acc + (typeof value === 'number' ? value : 0);
          }, 0);
          result[`${_val.dataIndex}_sum`] = total;
        } else {
          result[`${_val.dataIndex}_sum`] = null;
        }
    }
  });

  return result;
};
