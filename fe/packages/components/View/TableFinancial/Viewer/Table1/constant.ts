import { ProfitData } from "@packages/components/View/TableProfit/service/type";


 export const recalcRow3 = (rows: ProfitData[]) => {
    const r1 = rows.find(r => r.rowCode === "ROW_1");
    const r2 = rows.find(r => r.rowCode === "ROW_2");
    const r3 = rows.find(r => r.rowCode === "ROW_3");

    if (!r3) return;

    r3.soTienNgoaiTe =
      (r1?.soTienNgoaiTe ?? 0) + (r2?.soTienNgoaiTe ?? 0);

    r3.soTienUSD =
      (r1?.soTienUSD ?? 0) + (r2?.soTienUSD ?? 0);
};
export const initValueColumn = [
{
    key: "1",
    rowCode: "ROW_1",
    sttHienThi: "1",
    tenChiTieu: "Lợi nhuận sau thuế được chia của nhà đầu tư Việt Nam",
    soTienNgoaiTe: null,
    soTienUSD: null,
  },
  {
    key: "2",
    rowCode: "ROW_2",
    sttHienThi: "2",
    tenChiTieu: "Lợi nhuận của nhà đầu tư Việt Nam đã chuyển về nước",
    soTienNgoaiTe: null,
    soTienUSD: null,
  },
  {
    key: "3",
    rowCode: "ROW_3",
    sttHienThi: "3 = 1+2",
    tenChiTieu: "Lợi nhuận còn lại",
    soTienNgoaiTe: null,
    soTienUSD: null,
  },
  ]
  export const initValueSelectProfit = [
        {
          value: 'EUR',
          label: 'EUR',
        },
        {
          value: 'JPY',
          label: 'JPY',
        },
        {
          value: 'KRW',
          label: 'KRW',
        },
        {
          value: 'CNY',
          label: 'CNY',
        },
        {
          value: 'USD',
          label: 'USD',
        },
      ]