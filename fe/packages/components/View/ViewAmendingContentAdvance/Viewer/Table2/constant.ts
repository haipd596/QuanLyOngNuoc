import { InvestorData } from "@packages/components/View/TableCapitalContribution/service/type";
import { randomString } from "@packages/utils/radomString";



export const initData: InvestorData[] = [
  {
    key: randomString(10),
    stt: 1,
    tenNhaDauTu: '',
    tienNgoaiTe: 0,
    tienUsd: 0,
    mayMocNgoaiTe: 0,
    mayMocUsd: 0,
    taiSanKhacNgoaiTe: 0,
    taiSanKhacUsd: 0,
    tongNgoaiTe: 0,
    tongUsd: 0,
  },
  {
    key: 'total',
    tenNhaDauTu: 'Tổng cộng',
    tienNgoaiTe: 0,
    tienUsd: 0,
    mayMocNgoaiTe: 0,
    mayMocUsd: 0,
    taiSanKhacNgoaiTe: 0,
    taiSanKhacUsd: 0,
    tongNgoaiTe: 0,
    tongUsd: 0,
    isTotalRow: true,
  },
];


 // --- LOGIC TÍNH TOÁN ---
export const calculateVerticalTotal = (currentData: InvestorData[]) => {
  const totalRowIndex = currentData.findIndex(item => item.isTotalRow);
  if (totalRowIndex === -1) return currentData;

  const summary = {
    tienNgoaiTe: 0,
    tienUsd: 0,
    mayMocNgoaiTe: 0,
    mayMocUsd: 0,
    taiSanKhacNgoaiTe: 0,
    taiSanKhacUsd: 0,
    tongNgoaiTe: 0,
    tongUsd: 0,
  };

  currentData.forEach((row) => {
    if (!row.isTotalRow) {
      summary.tienNgoaiTe += row.tienNgoaiTe || 0;
      summary.tienUsd += row.tienUsd || 0;

      summary.mayMocNgoaiTe += row.mayMocNgoaiTe || 0;
      summary.mayMocUsd += row.mayMocUsd || 0;

      summary.taiSanKhacNgoaiTe += row.taiSanKhacNgoaiTe || 0;
      summary.taiSanKhacUsd += row.taiSanKhacUsd || 0;

      summary.tongNgoaiTe += row.tongNgoaiTe || 0;
      summary.tongUsd += row.tongUsd || 0;
    }
  });

  const newData = [...currentData];
  newData[totalRowIndex] = {
    ...newData[totalRowIndex],
    ...summary,
  };

  return newData;
};


  