import { IPropsValue } from '@packages/components/View/ViewInfo/type';

/**
 * Type định nghĩa loại dự án
 */
export type ProjectType = 'Thuong' | 'GopVon' | 'ChuyenNhuong' | 'Khac';

/**
 * Interface kết quả trả về từ helper
 */
export interface ProjectTypeResult {
  type: ProjectType;
  label: string;
  addButtonText: string;
}

/**
 * Helper function để lấy thông tin loại dự án từ listKeyValueInViewInfo
 *
 * @param listKeyValueInViewInfo - Danh sách các giá trị config từ ViewInfo
 * @returns Object chứa type, label và addButtonText
 *
 * @example
 * const { type, label, addButtonText } = getProjectTypeInfo(listKeyValueInViewInfo);
 * // type: 'Thuong', 'GopVon', 'ChuyenNhuong', hoặc 'Khac'
 * // label: 'Dự án thường', 'Dự án góp vốn', 'Dự án chuyển nhượng', hoặc 'Dự án còn lại'
 * // addButtonText: 'Thêm dự án thường', 'Thêm dự án góp vốn', 'Thêm dự án chuyển nhượng', hoặc 'Thêm dự án còn lại'
 */
export const getProjectTypeInfo = (
  listKeyValueInViewInfo?: IPropsValue[]
): ProjectTypeResult => {
  // Đọc projectType từ listKeyValueInViewInfo
  const projectType = listKeyValueInViewInfo?.find(
    item => item.key === 'projectType'
  )?.value as ProjectType || 'Thuong';

  // Xác định label dựa trên projectType
  let label: string;
  let addButtonText: string;

  label = 'Dự án';
  addButtonText = 'Thêm dự án';

  return {
    type: projectType,
    label,
    addButtonText
  };
};

/**
 * Helper function để lấy label theo thứ tự
 *
 * @param projectLabel - Label của dự án
 * @param index - Thứ tự của dự án (0, 1, 2, ...)
 * @returns Label đầy đủ với thứ tự
 *
 * @example
 * getProjectLabelWithIndex('Dự án thường', 0)
 * // => 'Dự án thường thứ nhất'
 *
 * getProjectLabelWithIndex('Dự án chuyển nhượng', 2)
 * // => 'Dự án chuyển nhượng thứ 3'
 */
export const getProjectLabelWithIndex = (
  projectLabel: string,
  index: number
): string => {
  return `${projectLabel} thứ ${index + 1}`;
};
