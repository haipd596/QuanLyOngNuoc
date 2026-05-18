export const ORDER_STATUS_OPTIONS = [
  { value: "PENDING", label: "Chờ xử lý" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "PACKING", label: "Đang đóng gói" },
  { value: "SHIPPED", label: "Đang giao" },
  { value: "COMPLETED", label: "Hoàn tất" },
  { value: "CANCELED", label: "Đã hủy" },
];

export const ORDER_STATUS_LABEL_MAP: Record<string, string> = Object.fromEntries(
  ORDER_STATUS_OPTIONS.map((item) => [item.value, item.label]),
);
