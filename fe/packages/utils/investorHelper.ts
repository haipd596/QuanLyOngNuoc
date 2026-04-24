import { IPropsValue } from '@packages/components/View/ViewInfo/type';

/**
 * Type định nghĩa vai trò nhà đầu tư
 */
export type InvestorRole = 'GopVon' | 'NhanGopVon' | 'Thuong' | 'ChuyenNhuong' | 'NhanChuyenNhuong';

/**
 * Interface kết quả trả về từ helper
 */
export interface InvestorRoleResult {
  role: InvestorRole;
  label: string;
  addButtonText: string;
}

/**
 * Helper function để lấy thông tin vai trò nhà đầu tư từ listKeyValueInViewInfo
 *
 * @param listKeyValueInViewInfo - Danh sách các giá trị config từ ViewInfo
 * @returns Object chứa role, label và addButtonText
 *
 * @example
 * const { role, label, addButtonText } = getInvestorRoleInfo(listKeyValueInViewInfo);
 * // role: 'GopVon', 'NhanGopVon', 'Thuong', 'ChuyenNhuong', hoặc 'NhanChuyenNhuong'
 * // label: 'Nhà đầu tư góp vốn', 'Nhà đầu tư nhận góp vốn', 'Nhà đầu tư', 'Nhà đầu tư chuyển nhượng', hoặc 'Nhà đầu tư nhận chuyển nhượng'
 * // addButtonText: 'Thêm nhà đầu tư góp vốn', 'Thêm nhà đầu tư nhận góp vốn', 'Thêm nhà đầu tư', 'Thêm nhà đầu tư chuyển nhượng', hoặc 'Thêm nhà đầu tư nhận chuyển nhượng'
 */
export const getInvestorRoleInfo = (
  listKeyValueInViewInfo?: IPropsValue[]
): InvestorRoleResult => {
  // Đọc investorRole từ listKeyValueInViewInfo
  const investorRole = listKeyValueInViewInfo?.find(
    item => item.key === 'investorRole'
  )?.value as InvestorRole || 'Thuong';

  // Xác định label dựa trên investorRole
  let label: string;
  let addButtonText: string;

  label = 'Nhà đầu tư';
  addButtonText = 'Thêm nhà đầu tư';

  return {
    role: investorRole,
    label,
    addButtonText
  };
};

/**
 * Interface kết quả cấu hình loại nhà đầu tư được hiển thị
 */
export interface InvestorTypeConfig {
  showCaNhan: boolean;
  showToChuc: boolean;
  /** Loai mặc định khi init value (ưu tiên CaNhan nếu được hiển thị) */
  defaultLoai: 'CaNhan' | 'ToChuc';
}

/**
 * Đọc raw flags từ store — dùng cho Builder (hiển thị đúng giá trị đã lưu, không fallback).
 */
export const getRawInvestorTypeFlags = (listKeyValueInViewInfo?: IPropsValue[]) => {
  const showCaNhan = listKeyValueInViewInfo?.find(item => item.key === 'showCaNhan')?.value !== 'false';
  const showToChuc = listKeyValueInViewInfo?.find(item => item.key === 'showToChuc')?.value !== 'false';
  return { showCaNhan, showToChuc };
};

/**
 * Đọc config với safe fallback — dùng cho Viewer (tránh màn hình trống khi cả 2 bị tắt).
 */
export const getInvestorTypeConfig = (
  listKeyValueInViewInfo?: IPropsValue[]
): InvestorTypeConfig => {
  const { showCaNhan, showToChuc } = getRawInvestorTypeFlags(listKeyValueInViewInfo);

  // Nếu cả 2 đều bị tắt → fallback bật cả 2
  const safeCaNhan = showCaNhan || !showToChuc;
  const safeToChuc = showToChuc || !showCaNhan;

  return {
    showCaNhan: safeCaNhan,
    showToChuc: safeToChuc,
    defaultLoai: safeCaNhan ? 'CaNhan' : 'ToChuc',
  };
};

/**
 * Helper function để lấy label theo thứ tự
 *
 * @param investorLabel - Label của nhà đầu tư (góp vốn hoặc nhận góp vốn)
 * @param index - Thứ tự của nhà đầu tư (0, 1, 2, ...)
 * @returns Label đầy đủ với thứ tự
 *
 * @example
 * getInvestorLabelWithIndex('Nhà đầu tư góp vốn', 0)
 * // => 'Nhà đầu tư góp vốn thứ nhất'
 *
 * getInvestorLabelWithIndex('Nhà đầu tư nhận góp vốn', 2)
 * // => 'Nhà đầu tư nhận góp vốn thứ 3'
 */
export const getInvestorLabelWithIndex = (
  investorLabel: string,
  index: number
): string => {
  return `${investorLabel} thứ ${index + 1}`;
};
