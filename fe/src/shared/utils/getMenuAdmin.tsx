import type { AppMenuItem } from "@/shared/components/sidebar/types";
import type { MenuItem } from "@/shared/services";

export const mapMenuItemToAppMenuItem = (item: MenuItem): AppMenuItem => {
  const hasChildren = Array.isArray(item.capCon) && item.capCon.length > 0;
  return {
    key: hasChildren
      ? `menu-${item.id}` //  menu cha
      : item.duongDan || `leaf-${item.id}`, //  menu lá
    label: item.ten,
    icon: item.bieuTuong ? (
      <img
        src={`${import.meta.env.VITE_RESOURCE_URL}${item?.bieuTuong}`}
        // preview={false}
        width={18}
        height={18}
      />
    ) : undefined,
    level: item.capdo,
    children: item.capCon?.length
      ? item.capCon.map(mapMenuItemToAppMenuItem)
      : undefined,
  };
};
export const sortMenuByThuTu = (items: MenuItem[]): MenuItem[] => {
  return [...items]
    .sort((a, b) => a.thuTuHienThi - b.thuTuHienThi)
    .map((item) => ({
      ...item,
      capCon: item.capCon?.length ? sortMenuByThuTu(item.capCon) : item.capCon,
    }));
};

export const findRootMenuByRoute = (
  items: MenuItem[],
  route: string,
  parents: MenuItem[] = []
): MenuItem | null => {
  for (const item of items) {
    const newParents = [...parents, item];
    if (item.duongDan === route || (item.duongDan !== '' && route?.includes(item.duongDan))) {
      return newParents[0]; // root
    }
    if (item.capCon?.length) {
      const found = findRootMenuByRoute(item.capCon, route, newParents);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export const findExactMenuRoute:any = (
  items: MenuItem[],
  path: string,
):any => {
  for (const item of items) {
    if (item.duongDan === path) return item;
    if (item.capCon && item.capCon.length) {
      const found:any = findExactMenuRoute(item.capCon, path);
      if (found) return found;
    }
  }
  return null;
}
