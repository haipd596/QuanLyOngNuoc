import { useNavigate } from "@tanstack/react-router";
import { ABOUT_US_ROUTE, CONTACT_ROUTE, HOME_ROUTE, NEWS_ROUTE, PRODUCTS_ROUTE } from "../constants";
import { StyledMenu } from "./styles/NavBarStyled";

const AppNavbar = () => {
  const navigate = useNavigate();

  const items = [
    { key: HOME_ROUTE, label: "TRANG CHỦ" },
    { key: ABOUT_US_ROUTE, label: "VỀ ỐNG NƯỚC VIỆT" },
    {
      key: PRODUCTS_ROUTE,
      label: "SẢN PHẨM",
      // children: [
      //   { key: "/product/ong-nhua", label: "ỐNG NHỰA PVC" },
      //   { key: "/product/ong-hdpe", label: "ỐNG HDPE" },
      //   { key: "/product/ong-ppr", label: "ỐNG PPR" },
      //   { key: "/product/phu-kien-ong", label: "PHỤ KIỆN ỐNG NƯỚC" },
      //   { key: "/product/thiet-bi-ve-sinh", label: "THIẾT BỊ VỆ SINH" },
      //   { key: "/product/thiet-bi-dien", label: "THIẾT BỊ ĐIỆN" },
      //   { key: "/product/may-bom", label: "MÁY BƠM NƯỚC" },
      // ],
    },
    { key: NEWS_ROUTE, label: "TIN TỨC" },
    { key: CONTACT_ROUTE, label: "LIÊN HỆ" },
  ];

  const handleClick = (e: { key: string }) => {
    navigate({ to: e.key });
  };

  return (
    <StyledMenu
      mode="horizontal"
      items={items}
      onClick={handleClick}
    />
  );
};

export default AppNavbar;
