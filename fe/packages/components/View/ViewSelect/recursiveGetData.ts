/* eslint-disable @typescript-eslint/no-use-before-define */
import { FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import _get from 'lodash/get';
import _isObject from 'lodash/isObject';
import { removeAllEmptyItems } from '../ButtonSyncDataToKhai/Viewer/transform.helper';
// import { SPECIFIC_HIDDEN_KEYS_ADDRESS } from '../ButtonSyncDataToKhai/Viewer/transform.helper';

export const recursiveGetData = (formData: any, targetKey: string): any => {
  if (!targetKey || !formData || typeof formData !== 'object') return null;

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(formData)) {
    if (key === targetKey) {
      return value;
    }
    if (_isObject(value)) {
      const found = recursiveGetData(value, targetKey);
      if (found) {
        return found;
      }
    }
  }

  return null;
};

/**
 * Deeply merge two objects without mutating the originals.
 *
 * For each key in `sourceData`:
 *  1. Nếu giá trị là array  ⇒ gọi `mergeArray` để merge array.
 *  2. Nếu giá trị là object ⇒ đệ quy `dynamicMerge`.
 *  3. Với các primitive (string, number, boolean):
 *     – Nếu `sourceValue` !== `undefined`, `null` hoặc `''` thì dùng `sourceValue`
 *     – Ngược lại giữ nguyên `currentValue`.
 *
 * Trả về `null` nếu một trong hai đầu vào không phải object.
 *
 * @param {any} currentData
 *   Đối tượng nguồn (current), giữ làm template cho các key gốc.
 * @param {any} sourceData
 *   Đối tượng mới (source) để merge vào `currentData`.
 * @returns {any|null}
 *   – Object kết quả merge (không thay đổi `currentData`/`sourceData`)
 *   – `null` nếu `currentData` hoặc `sourceData` không phải object.
 *
 * @example
 * const cur = { a: 1, b: { x: 2 }, c: [ { id: 1, v: 'foo' } ] };
 * const src = { a: 0, b: { y: 3 }, c: [ { id: 1, v: '' }, { id: 2, v: 'bar' } ] };
 * dynamicMerge(cur, src);
 * // => {
 * //   a: 0,
 * //   b: { x: 2, y: 3 },
 * //   c: [
 * //     { id: 1, v: 'foo' },  // giữ 'foo' vì src.v = ''
 * //     { id: 2, v: 'bar' }   // thêm bản mới
 * //   ]
 * // }
 */
export const dynamicMerge = (currentData: any, sourceData: any) : any => {
  if (!currentData || typeof currentData !== 'object' || !sourceData || typeof sourceData !== 'object') return null;
  // Sao chép current để tránh thay đổi trực tiếp
  const result = { ...currentData };

  // Đảm bảo source là object
  if (!sourceData || typeof sourceData !== 'object' || Array.isArray(sourceData)) {
    return result;
  }

  // Duyệt qua các key trong source bằng array
  Object.keys(sourceData).forEach((key) => {
    const currentValue = currentData[key];
    const sourceValue = sourceData[key];
    if (Array.isArray(sourceValue)) {
      result[key] = mergeArray(currentValue || [], sourceValue);
    } else if (sourceValue && typeof sourceValue === 'object') {
      result[key] = dynamicMerge(currentValue || {}, sourceValue);
    } else {
      // result[key] = sourceData[key];
      result[key] = sourceValue !== undefined && sourceValue !== null && sourceValue !== ''
        ? sourceValue
        : currentValue;
    }
  });

  return result;
};

/**
 * mergeArray
 * -----------
 * Kết hợp hai mảng object `currentArray` (dữ liệu hiện tại) và `sourceArray` (dữ liệu mới)
 * theo các quy tắc sau:
 *
 * 1. Nếu `sourceArray` không phải mảng, trả về bản sao của `currentArray`.
 * 2. Khởi tạo `resultArray` là bản sao của `currentArray` (nếu có), để không mutate nguyên gốc.
 * 3. Với mỗi phần tử `sourceItem` trong `sourceArray`, đi qua các nhánh:
 *    a) Nếu `sourceItem` là object và có trường `Key`:
 *       - Tìm object cùng `Key` trong `resultArray`.
 *       - Nếu tìm thấy, merge sâu với `dynamicMerge`; nếu không, push mới.
 *    b) Nếu là object và có trường `key` (lower-case):
 *       - Tương tự như `Key`.
 *    c) Nếu là object và có trường `value`:
 *       - Tìm object cùng `value`.
 *       - Nếu tìm thấy, merge shallow (spread + giữ `status`); nếu không, push mới.
 *    d) Nếu `sourceItem` là string:
 *       - Nếu chưa tồn tại trong `resultArray`, push mới.
 *    e) Nếu `index < resultArray.length` (fallback theo vị trí):
 *       - Dùng `dynamicMerge` merge `sourceItem` vào `resultArray[index]`.
 *    f) Cuối cùng (nếu không rơi vào bất kỳ nhánh nào ở trên):
 *       - Push `sourceItem` vào `resultArray`.
 *
 * 4. Sau khi xử lý xong `sourceArray`, đảm bảo mỗi object trong `resultArray`
 *    có đủ các key định nghĩa ở `currentArray[0]` (template):
 *    - Với mỗi key mà `item` chưa có, gán `item[key] = ''` (empty string).
 *
 * Kết quả trả về là mảng mới đã merge, giữ nguyên record cũ, cập nhật record khớp,
 * và bổ sung record mới với đầy đủ các trường (empty nếu thiếu).
 *
 * @param {any[]} currentArray
 *   Mảng object gốc; phần tử tại index 0 đóng vai trò “template” chứa danh sách
 *   key đầy đủ cần bảo toàn.
 * @param {any[]} sourceArray
 *   Mảng object mới; có thể chứa bản ghi update (match theo Key/key/value)
 *   hoặc bản ghi hoàn toàn mới.
 * @returns {any[]}
 *   Mảng đã merge xong:
 *     - Những object matching theo Key/key/value được update bởi `dynamicMerge`.
 *     - Những string primitives chưa tồn tại được thêm vào.
 *     - Những object mới được push luôn.
 *     - Mọi object đều có đủ các trường của template; nếu source không cung cấp
 *       thì giá trị sẽ là empty string.
 *
 * @example
 * const cur = [{ TenKhuVuc: '123', DienTich: '123' }];
 * const src = [{ TenKhuVuc: '456' }];
 * mergeArray(cur, src);
 * // => [
 * //   { TenKhuVuc: '123', DienTich: '123' },
 * //   { TenKhuVuc: '456', DienTich: '' }
 * // ]
 */
export const mergeArray = (currentArray: any, sourceArray: any): any => {
  // Đảm bảo sourceArray là mảng
  if (!Array.isArray(sourceArray)) {
    return Array.isArray(currentArray) ? [...currentArray] : [];
  }

  // Tạo bản sao mảng hiện tại
  const resultArray = Array.isArray(currentArray) ? [...currentArray] : [];
  sourceArray.forEach((sourceItem, index) => {
    if (sourceItem && typeof sourceItem === 'object' && 'Key' in sourceItem) {
      const currentItem = resultArray.find((item) => item && typeof item
      === 'object' && item.Key === sourceItem.Key);
      if (currentItem) {
        const itemIndex = resultArray.indexOf(currentItem);
        resultArray[itemIndex] = dynamicMerge(currentItem, sourceItem);
        return;
      }

      resultArray.push(sourceItem);
    } else if (sourceItem && typeof sourceItem === 'object' && 'key' in sourceItem) {
      const currentItem = resultArray.find((item) => item && typeof item
      === 'object' && item.key === sourceItem.key);
      if (currentItem) {
        const itemIndex = resultArray.indexOf(currentItem);
        resultArray[itemIndex] = dynamicMerge(currentItem, sourceItem);
        return;
      }

      resultArray.push(sourceItem);
    } else if (sourceItem && typeof sourceItem === 'object' && 'value' in sourceItem) {
      const currentItem = resultArray.find((item) => item && typeof item
      === 'object' && item.value === sourceItem.value);
      if (currentItem) {
        const itemIndex = resultArray.indexOf(currentItem);
        resultArray[itemIndex] = {
          ...currentItem,
          ...sourceItem,
          status: currentItem.status || sourceItem.status,
        };
        // resultArray[itemIndex] = dynamicMerge(currentItem, sourceItem);
        return;
      }

      resultArray.push(sourceItem);
    } else if (typeof sourceItem === 'string') {
      if (!resultArray.includes(sourceItem)) {
        resultArray.push(sourceItem);
      }
    } else if (index < resultArray.length) {
      const newData = typeof resultArray[index] === 'object' && resultArray[index] !== null ? resultArray[index] : {};
      resultArray[index] = dynamicMerge(
        newData,
        sourceItem,
      );
    } else {
      // Check submit data empty for table in tab

      // const keysToCheck = Object.keys(sourceItem).filter(
      //   (key) => !SPECIFIC_HIDDEN_KEYS_ADDRESS.includes(key),
      // );

      // const isAllEmpty = keysToCheck.every((key) => {
      //   const value = sourceItem[key];

      //   return value === '';
      // });
      // if (!isAllEmpty) {
      //   resultArray.push(sourceItem);
      // }
      resultArray.push(sourceItem);
    }
  });

  // Bước cuối: điền các key còn thiếu từ template bằng empty string
  if (Array.isArray(currentArray) && currentArray.length > 0) {
    const templateKeys = Object.keys(currentArray[0]);
    resultArray.forEach((item) => {
      if (item && typeof item === 'object') {
        templateKeys.forEach((key) => {
          if (!Object.prototype.hasOwnProperty.call(item, key)) {
            item[key] = '';
          }
        });
      }
    });
  }
  return resultArray;
};

export const isInputTypeInColumn = (columns: AnyObject[], dataIndex: string) => {
  const findFieldName = columns.some((item) => {
    const fieldName = _get(item, 'columnDataType.props.defaultValue', '');
    const key = _get(item, 'dataIndex', '');

    return (fieldName === FIELD_NAME.INPUT && key === dataIndex);
  });

  return findFieldName;
};

export const reverseTransformData = (type: string, formData: any) => {
  switch (type) {
    // TTHCID_118
    case 'bd_CapMoi_NoiDungHoatDong': {
      const data = formData.bd_CapMoi_NoiDungHoatDong;

      if (!Array.isArray(data)) return formData;

      const BD_DM_NoiDungHoatDong = data.map((item) => ({
        TenNoiDungHoatDong: item.TenNoiDungHoatDong,
        NoiDungHoatDongId: item.TenNoiDungHoatDong,
        HoSoId: item.HoSoId,
        Key: item.Key,
        enabled: item.enabled,
      }));

      const feKey = data[0]?.feKey || 'bd_CapMoi_NoiDungHoatDong_0';
      const Reference = data[0]?.Reference || '[]';

      return {
        ...formData,
        bd_CapMoi_NoiDungHoatDong: [
          {
            BD_DM_NoiDungHoatDong,
            feKey,
            Reference,
          },
        ],
      };
    }

    // TTHCID_38
    case 'MT_NXVN_SanPham': {
      if (!formData?.MT_NXVN_SanPham || !Array.isArray(formData.MT_NXVN_SanPham)) {
        return {
          ...formData,
          MT_NXVN_DMTieuChi1: [],
          MT_NXVN_DMTieuChi1Hidden: {
            fieldId: 'MT_NXVN_DMTieuChi1',
            label: '',
            statusForAllCheckbox: [],
          },
        };
      }

      const tieuChiList = formData.MT_NXVN_SanPham.map((item: any) => item.KyHieuTieuChi);

      const hiddenData = formData.MT_NXVN_DMTieuChi1Hidden || {
        fieldId: 'MT_NXVN_DMTieuChi1',
        label: '',
        statusForAllCheckbox: [],
      };

      const statusForAllCheckbox = hiddenData.statusForAllCheckbox.map((item: any) => ({
        ...item,
        status: tieuChiList.includes(item.value),
      }));

      return {
        ...formData,
        MT_NXVN_DMTieuChi1: tieuChiList,
        MT_NXVN_DMTieuChi1Hidden: {
          ...hiddenData,
          label: tieuChiList.join(', '),
          statusForAllCheckbox,
        },
      };
    }

    // TTHCID_129
    case 'DanhMucNhaNuoc': {
      if (!Array.isArray(formData?.DanhMucNhaNuoc)) {
        return {
          ...formData,
          DanhMucNhaNuoc: [],
        };
      }

      const transformed = formData.DanhMucNhaNuoc.map((item: any) => {
        if (!item.PhamVi || !item.PhamViHidden) return item;

        const updatedOptions = item.PhamViHidden.statusForAllOptions.map((opt: any) => ({
          ...opt,
          checked: opt.value === item.PhamVi,
        }));

        const { 'Thuoc.#cb#': _, '0Thuoc.#cb#': __, ...rest } = item;

        return {
          ...rest,
          PhamViHidden: {
            ...item.PhamViHidden,
            statusForAllOptions: updatedOptions,
            label: updatedOptions.find((opt: any) => opt.checked)?.label || '',
          },
        };
      });

      return {
        ...formData,
        DanhMucNhaNuoc: transformed,
      };
    }

    default:
      return formData; // fallback
  }
};

export const cleanObjectDeep = (
  currentData: any,
  ignoredKeysAddress: string[] = [],
  ignoredKeysNormal: string[] = [],
): any => {
  // Handle Array
  if (Array.isArray(currentData)) {
    const cleanedArray = currentData.map(
      (item) => cleanObjectDeep(item, ignoredKeysAddress, ignoredKeysNormal),
    );

    if (cleanedArray.length > 1) {
      const filteredArray = cleanedArray.filter((item) => {
        if (typeof item === 'object' && item !== null) {
          const validKeys = Object.keys(item).filter(
            (key) => !ignoredKeysAddress.includes(key),
          );

          return validKeys.length === 0 || !validKeys.every((key) => item[key] === '');
        }

        return true;
      });

      const hasOnlyEmptyObjects = filteredArray.length > 0 && filteredArray.every(
        (item) => {
          if (typeof item === 'object' && item !== null) {
            const validKeys = Object.keys(item).filter(
              (key) => !ignoredKeysNormal.includes(key),
            );

            return validKeys.length > 0 && validKeys.every((key) => item[key] === '');
          }
          return false;
        },
      );

      return hasOnlyEmptyObjects || filteredArray.length === 0
        ? []
        : filteredArray;
    }
    return cleanedArray;
  }

  // Handle object
  if (typeof currentData === 'object'
    && currentData !== null
    && !Array.isArray(currentData)
  ) {
    const newObj: any = { ...currentData };
    Object.keys(newObj).forEach((key) => {
      const value = newObj[key];

      const cleanedValue = cleanObjectDeep(
        value,
        ignoredKeysAddress,
        ignoredKeysNormal,
      );

      if (Array.isArray(cleanedValue) && cleanedValue.length > 1) {
        const filtered = removeAllEmptyItems(
          cleanedValue,
          ignoredKeysAddress,
        );
        newObj[key] = filtered.length === 0 ? [] : filtered;
      } else {
        newObj[key] = cleanedValue;
      }
    });
    return newObj;
  }
  return currentData;
};
