export interface RawItem {
  Id: number;
  Ten: string;
  TenKhoaHoc?: string | null;
  LoaiUuTienBaoVe?: string | null;
  LoaiQuyHiemNguyCap?: string | null;
  ChaIdId: number | null;
  Cap?: number | null;
  Title?: string | null;
}

export interface TreeNode {
  key: number;
  value: number;
  title: string;
  selectable?: boolean;
  children?: TreeNode[];
}
