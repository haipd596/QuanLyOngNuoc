/**
 * Mã số thuế (MST) doanh nghiệp / tổ chức tại Việt Nam — định dạng thường gặp khi nhập liệu:
 * - 10 chữ số: MST tại trụ sở chính
 * - 13 chữ số liền: 10 số MST + 3 số đơn vị phụ thuộc / chi nhánh
 * - 10 số + "-" + 3 số: cách ghi có dấu gạch (ví dụ 0123456789-001)
 *
 * Lưu ý: Đây là kiểm tra định dạng (length + ký tự), không thay thế tra cứu/đối chiếu với cơ quan thuế.
 * Chuỗi được so khớp sau khi trim đầu cuối (nên normalize ở Form.Item transform nếu cần).
 */
export const VIETNAM_ENTERPRISE_MST_PATTERN_SOURCE =
  '^(?:\\d{10}|\\d{13}|\\d{10}-\\d{3})$';

const MST_REGEX = new RegExp(VIETNAM_ENTERPRISE_MST_PATTERN_SOURCE);

export function isValidVietNamEnterpriseTaxCode(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  const s = String(value).trim();
  if (!s) return false;
  return MST_REGEX.test(s);
}
