import type { Moment } from "moment";

// (VI) Format ngày theo định dạng dd/MM/yyyy
export const formatDate = (isoDate?: string | null): string => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng 0-11
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// (VI) Format ngày và giờ theo định dạng dd/MM/yyyy HH:mm
export const formatDateTime = (isoDate?: string | null): string => {
  if (!isoDate) return "";
  try {
    const date = new Date(isoDate);
    // (VI) Kiểm tra date hợp lệ
    if (isNaN(date.getTime())) return isoDate;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours() + 7).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch (error) {
    // (VI) Nếu có lỗi, trả về giá trị gốc
    return isoDate;
  }
};

// (VI) Format ngày theo định dạng tiếng Việt: "22 Tháng 12 Năm 2025"
export const formatVietnameseDate = (isoDate?: string | null): string => {
  if (!isoDate) return "";
  try {
    const date = new Date(isoDate);
    // (VI) Kiểm tra date hợp lệ
    if (isNaN(date.getTime())) return isoDate;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day} Tháng ${month} Năm ${year}`;
  } catch (error) {
    // (VI) Nếu có lỗi, trả về giá trị gốc
    return isoDate;
  }
};

// (API) Format ngày để gửi backend: YYYY-MM-DD
export const formatDateToApi = (
  date?: Date | string | null | Moment,
): string | undefined => {
  if (!date) return undefined;

  let d: Date;

  // Nếu là Moment thì dùng .toDate(), còn lại là Date hoặc string
  if ((date as Moment)?.isValid !== undefined && (date as Moment).isValid()) {
    d = (date as Moment).toDate();
  } else {
    d = new Date(date as string | Date);
  }

  if (isNaN(d.getTime())) return undefined;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// (API) Format ngày để gửi backend: dd-MM-yyyy hh:mm
export const formatDateToApi2 = (
  date?: Date | string | null | Moment,
): string | undefined => {
  if (!date) return undefined;

  let d: Date;

  // Nếu là Moment thì dùng .toDate(), còn lại là Date hoặc string
  if ((date as Moment)?.isValid !== undefined && (date as Moment).isValid()) {
    d = (date as Moment).toDate();
  } else {
    d = new Date(date as string | Date);
  }

  if (isNaN(d.getTime())) return undefined;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};
