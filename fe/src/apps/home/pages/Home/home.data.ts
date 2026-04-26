import { MdAssignmentReturn, MdLocalShipping, MdVerified } from "react-icons/md";

export const heroStats = [
  { value: "1.000+", label: "Sản phẩm" },
  { value: "24h", label: "Giao nội thành" },
  { value: "7 ngày", label: "Đổi trả linh hoạt" },
];

export const featuredProducts = [
  {
    name: "Ống nhựa uPVC Class 3 PN10",
    price: "45.000đ",
    rating: "4.9 (120+)",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
    stock: "in",
    badge: "Bán chạy",
  },
  {
    name: "Van bi đồng Miha cao cấp",
    price: "125.000đ",
    rating: "4.8 (85)",
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=900&q=80",
    stock: "in",
    badge: "-15%",
  },
  {
    name: "Công tắc điện Panasonic Wide",
    price: "68.000đ",
    rating: "5.0 (210)",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    stock: "in",
    badge: undefined,
  },
  {
    name: "Dây cáp điện Cadivi 2.5mm",
    price: "310.000đ",
    rating: "4.7 (45)",
    image:
      "https://images.unsplash.com/photo-1602005839206-7a63d1887bcb?auto=format&fit=crop&w=900&q=80",
    stock: "out",
    badge: undefined,
  },
] as const;

export const serviceBadges = [
  {
    icon: MdVerified,
    title: "Sản phẩm chính hãng",
    description: "Cam kết nguồn gốc rõ ràng, đủ chứng từ.",
  },
  {
    icon: MdLocalShipping,
    title: "Giao hàng nhanh",
    description: "Hỗ trợ giao nội thành trong 24 giờ.",
  },
  {
    icon: MdAssignmentReturn,
    title: "Đổi trả linh hoạt",
    description: "Chính sách đổi trả trong 7 ngày.",
  },
] as const;
