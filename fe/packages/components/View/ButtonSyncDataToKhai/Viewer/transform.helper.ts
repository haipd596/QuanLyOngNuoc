export const reverseFieldMap: Record<string, string> = {
  bd_CapMoi_NoiDungHoatDong: 'bd_CapMoi_NoiDungHoatDong',
  MT_NXVN_DMTieuChi1: 'MT_NXVN_DMTieuChi1',
  DanhMucNhaNuoc: 'DanhMucNhaNuoc',
};

export const SPECIFIC_HIDDEN_KEYS_NORMAL = ['feKey', 'Reference'];
export const SPECIFIC_HIDDEN_KEYS_ADDRESS = ['TinhIdHidden', 'HuyenIdHidden', 'XaIdHidden'];

export const removeAllEmptyItems = (arr: any[], ignoredKeys: string[]) => {
  return arr.filter((item) => {
    if (typeof item !== 'object' || item === null) return true;

    const relevant = Object.entries(item).filter(
      ([key]) => !ignoredKeys.includes(key),
    );

    return !relevant.every(([,val]) => val === '');
  });
};
