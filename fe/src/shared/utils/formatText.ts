export const formatText = (status: string): string => {
  
   const capMatch = status.match(/^Cap_(\d)$/);
  if (capMatch) {
    return `Cấp ${capMatch[1]}`;
  }
  
  switch (status) {
    case "DangTiepNhan":
      return "Đang tiếp nhận";
    case "DaTiepNhan":
      return "Đã tiếp nhận";
    case "TuChoi":
      return "Từ chối";
    case "ChoTiepNhan":
      return "Chờ Tiếp Nhận"
    case "HoanThanh":
      return "Hoàn thành";
    case "DangXuLy":
      return "Đang xử lý";
    case "CaNhan": 
    return "Cá nhân";
    case "ToChuc":
      return "Tổ chức"
    default:
      return status.replace(/([A-Z])/g, " $1").trim();
  }
};
