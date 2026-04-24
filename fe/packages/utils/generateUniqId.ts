import {
  COLUMN_REFERENCES, DIVIDER,
  DIVIDER_HIDDEN,
  FE_KEY,
} from '@packages/constants/commons';
import { AnyObject } from 'antd/es/_util/type';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _isPlainObject from 'lodash/isPlainObject';
import _uniqueId from 'lodash/uniqueId';

export const generateUniqId = (prefix: string) => `${prefix}_${_uniqueId()}`;

export const generateFeKey = (fieldKey: string, index: number) => {
  return `${fieldKey}_${index}`;
};

export const transformDataFilePDF = (data: AnyObject) => {
  const files = _get(data, 'DanhSachTepDinhKem');
  const initialData = {
    FileName: '',
    PhysicalName: '',
    NodeId: '',
  };

  if (files && _isArray(files)) {
    initialData.FileName = files[0]?.TenTep;
    initialData.PhysicalName = files[0]?.TenTep;
    initialData.NodeId = files[0]?.DuongDan?.split('/').pop();
  }
  return initialData;
};

export const normalizeString = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 *
 * @param valueData Nó là giá trị của database
 * @param valueSearch Giá trị đầu vào từ khóa tìm kiếm
 * @returns boolean
 */
export const searchString = (valueData: string, valueSearch: string) => {
  const normalizedText = normalizeString(valueData).toLowerCase();
  const normalizedSearchTerm = normalizeString(valueSearch).toLowerCase();

  const regex = new RegExp(normalizedSearchTerm, 'i');

  return regex.test(normalizedText);
};

export const transformDataByReference = (data: AnyObject) => {
  let payloadByReferences: any = data[COLUMN_REFERENCES];
  if (payloadByReferences) {
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string' && key !== COLUMN_REFERENCES) {
        let test = {} as any;
        try {
          test = JSON.parse(data[key]);
        // eslint-disable-next-line no-empty
        } catch (error) {}

        if (!_isEmpty(test)) {
          const { feKey: targetFeKey, serverPayloadKey: targetTable } = test;
          const referencesJson = JSON.parse(payloadByReferences);
          payloadByReferences = JSON.stringify(
            referencesJson.map((item: any) => {
              if (item.Table === targetTable) {
                return { ...item, [FE_KEY]: targetFeKey };
              }
              return item;
            }),
          );
        }
      }
    });
  }

  return payloadByReferences;
};

export const transformDataByDivider = (data: AnyObject) => {
  const initialObject: AnyObject = {};
  Object.entries(data).forEach(([key, val]) => {
    if (typeof val === 'string') {
      if (val.includes(DIVIDER)) {
        const [targetValMineral] = val.split(DIVIDER);
        const [targetKeyMineral] = key.split(DIVIDER_HIDDEN);
        initialObject[targetKeyMineral] = targetValMineral;
      }
    }
  });
  return initialObject;
};

export const checkDuplicateDataCol = (
  columns: AnyObject[],
  dataTable: AnyObject[],
  colDataObj: AnyObject,
) => {
  if (_isArray(columns) && _isArray(dataTable) && _isPlainObject(colDataObj)) {
    const findColDuplicate: any[] = columns?.filter((col) => _get(col, 'isColDataDuplicate'));
    const _mapItem = new Map();
    let _titleLabel: string = '';
    if (findColDuplicate.length > 0) {
      const _getKeys = findColDuplicate.map((col) => {
        _mapItem.set(_get(col, 'dataIndex'), col);
        return _get(col, 'dataIndex');
      });

      const isDuplicate = _getKeys.some((key) => {
        if (_mapItem.has(key)) {
          _titleLabel = _get(_mapItem.get(key), 'title');
        }
        return dataTable.some((_d) => _d[key]?.trim() === colDataObj[key]?.trim());
      });
      if (isDuplicate) {
        return { status: true, title: _titleLabel };
      }
    }
  }

  return { status: false, title: '' };
};
