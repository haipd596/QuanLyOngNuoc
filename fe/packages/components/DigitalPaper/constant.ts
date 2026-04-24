import { createTextField } from '@packages/schema/fields/TextField';
import { createViewInfoHiddenField } from '@packages/schema/fields/ViewInfoHiddenField';

export const DIGITALPAPER_TOOLTIP = {
  TO_KHAI: 'Nhập thông tin tờ khai',
  URL_TAI_MAU: 'Tải file mẫu',
  UPLOAD_FILE: 'Tải tệp lên',
  KHO_DU_LIEU: 'Kho dữ liệu',
  REMOVE: 'Xóa',
};

export const PATH_TO_MAIN_GIAY_TOID = 'GiayToId.Id';

// export const MORE_FIELDS_HIDDEN = [
//   {
//     configChanged: {
//       'formItemPropsAllowConfig.wrapperColumnNumber.props.defaultValue': 12,
//       'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue': 'CaNhan_ToChuc_Ten',
//       'componentPropsAllowConfig.placeholder.props.defaultValue': '',
//       'formItemPropsAllowConfig.label.props.defaultValue': 'Tên cá nhân/Tổ chức',
//       'formItemPropsAllowConfig.hidden.props.defaultValue': true,
//     },
//     fieldName: 'INPUT',
//     version: 6,
//     key: 'INPUT_9',
//     isShowField: false,
//     fieldsInColumnIndex: [],
//     extraDataSourceField: [],
//     isNotCompactJsonOutput: false,
//   },
//   {
//     configChanged: {
//       'formItemPropsAllowConfig.wrapperColumnNumber.props.defaultValue': 12,
//       'componentPropsAllowConfig.placeholder.props.defaultValue': '',
//       'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue':
// 'CaNhan_ToChuc_SoDienThoai',
//       'formItemPropsAllowConfig.label.props.defaultValue': 'Số điện thoại',
//       'formItemPropsAllowConfig.hidden.props.defaultValue': true,
//     },
//     fieldName: 'INPUT',
//     version: 5,
//     key: 'INPUT_10',
//     isShowField: false,
//     fieldsInColumnIndex: [],
//     extraDataSourceField: [],
//     isNotCompactJsonOutput: false,
//   },
//   {
//     configChanged: {
//       'formItemPropsAllowConfig.wrapperColumnNumber.props.defaultValue': 12,
//       'componentPropsAllowConfig.placeholder.props.defaultValue': '',
//       'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue': 'CaNhan_ToChuc_NoiCap',
//       'formItemPropsAllowConfig.label.props.defaultValue': 'Nơi cấp',
//       'formItemPropsAllowConfig.hidden.props.defaultValue': true,
//     },
//     fieldName: 'INPUT',
//     version: 5,
//     key: 'INPUT_11',
//     isShowField: false,
//     fieldsInColumnIndex: [],
//     extraDataSourceField: [],
//     isNotCompactJsonOutput: false,
//   },
//   {
//     configChanged: {},
//     fieldName: 'GROUP_FIELDS',
//     version: 0,
//     key: 'GROUP_FIELDS_1',
//     isShowField: true,
//     fieldsInColumnIndex: [
//       {
//         columnIndex: 0,
//         fieldKeyCol: 'INPUT_9',
//       },
//       {
//         columnIndex: 0,
//         fieldKeyCol: 'INPUT_10',
//       },
//       {
//         columnIndex: 0,
//         fieldKeyCol: 'INPUT_11',
//       },
//       {
//         columnIndex: 0,
//         fieldKeyCol: 'INPUT_12',
//       },
//       {
//         columnIndex: 0,
//         fieldKeyCol: 'INPUT_13',
//       },
//       {
//         columnIndex: 0,
//         fieldKeyCol: 'INPUT_14',
//       },
//     ],
//     extraDataSourceField: [],
//     isNotCompactJsonOutput: false,
//   },
//   {
//     configChanged: {
//       'formItemPropsAllowConfig.wrapperColumnNumber.props.defaultValue': 12,
//       'componentPropsAllowConfig.placeholder.props.defaultValue': '',
//       'formItemPropsAllowConfig.label.props.defaultValue': 'Fax',
//       'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue': 'CaNhan_ToChuc_Fax',
//       'formItemPropsAllowConfig.hidden.props.defaultValue': true,
//     },
//     fieldName: 'INPUT',
//     version: 6,
//     key: 'INPUT_12',
//     isShowField: false,
//     fieldsInColumnIndex: [],
//     extraDataSourceField: [],
//     isNotCompactJsonOutput: false,
//   },
//   {
//     configChanged: {
//       'formItemPropsAllowConfig.wrapperColumnNumber.props.defaultValue': 12,
//       'componentPropsAllowConfig.placeholder.props.defaultValue': '',
//       'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue': 'CaNhan_ToChuc_DiaChi',
//       'formItemPropsAllowConfig.label.props.defaultValue': 'Địa chỉ',
//       'formItemPropsAllowConfig.hidden.props.defaultValue': true,
//     },
//     fieldName: 'INPUT',
//     version: 7,
//     key: 'INPUT_13',
//     isShowField: false,
//     fieldsInColumnIndex: [],
//     extraDataSourceField: [],
//     isNotCompactJsonOutput: false,
//   },
//   {
//     configChanged: {
//       'formItemPropsAllowConfig.wrapperColumnNumber.props.defaultValue': 12,
//       'componentPropsAllowConfig.placeholder.props.defaultValue': '',
//       'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue': 'CaNhan_ToChuc_NgayCap',
//       'formItemPropsAllowConfig.label.props.defaultValue': 'Ngày cấp',
//       'formItemPropsAllowConfig.hidden.props.defaultValue': true,
//     },
//     fieldName: 'INPUT',
//     version: 5,
//     key: 'INPUT_14',
//     isShowField: false,
//     fieldsInColumnIndex: [],
//     extraDataSourceField: [],
//     isNotCompactJsonOutput: false,
//   },
// ];

export const THONG_TIN_BLOCK = [
  createTextField({
    configChanged: {
      'componentPropsAllowConfig.content.props.defaultValue': 'Thông tin chung',
    },
  }),
  createViewInfoHiddenField(),
];

/**
 * Đệ quy tìm và thu thập tất cả các field trong `allFields` mà `key` hoặc `uniqId`
 * khớp với `fieldKeyCol` trong `fieldsInColumnIndex` của `currentFields` (bao gồm lồng nhau).
 *
 * - Bắt đầu từ `currentFields`, lấy `fieldKeyCol` trong `fieldsInColumnIndex`.
 * - Với mỗi `fieldKeyCol`, tìm field tương ứng trong `allFields` thông qua `key` hoặc `uniqId`.
 * - Nếu field tìm thấy có `fieldsInColumnIndex`, tiếp tục đệ quy để tìm sâu hơn.
 * - Sử dụng `visitedKeys` để tránh lặp vô hạn khi có cấu trúc circular.
 *
 * @param currentFields - Danh sách field đang xét, có thể chứa `fieldsInColumnIndex`.
 * @param allFields - Toàn bộ danh sách field có thể tra cứu theo `key` hoặc `uniqId`.
 * @param visitedKeys - Bộ tập các `fieldKeyCol` đã duyệt(dùng trong đệ quy),mặc định là `new Set()`
 *
 * @returns Mảng tất cả các field khớp trong `allFields` theo logic trên (bao gồm cả lồng nhau).
 *
 * @example
 * const result = getMatchedFieldsRecursively(fields, activeFields);
 *
 * // Ví dụ: nếu fields có fieldKeyCol: "A", activeFields có A → A có fieldKeyCol "B" → lấy luôn B
 */
export const getMatchedFieldsRecursively = (
  currentFields: any[],
  allFields: any[],
  visitedKeys: Set<string> = new Set(),
): any[] => {
  const fieldKeyCols = currentFields
    .filter(
      (_f: any) => Array.isArray(_f.fieldsInColumnIndex) && _f.fieldsInColumnIndex.length > 0,
    )
    .flatMap((_f: any) => _f.fieldsInColumnIndex)
    .filter((_item) => _item.fieldKeyCol)
    .map((_item) => _item.fieldKeyCol)
    .filter((key) => !visitedKeys.has(key));

  const newVisitedKeys = new Set([...visitedKeys, ...fieldKeyCols]);

  const targetFields = allFields.filter(
    (f) => fieldKeyCols.includes(f.key) || fieldKeyCols.includes(f.uniqId),
  );

  const nestedFields = targetFields
    .filter((f) => Array.isArray(f.fieldsInColumnIndex) && f.fieldsInColumnIndex.length > 0)
    .flatMap((f) => getMatchedFieldsRecursively([f], allFields, newVisitedKeys));

  return [...targetFields, ...nestedFields];
};
