import { InvestorBorrowData } from "@packages/components/View/TableCapitalLending/service/type";
import { randomString } from "@packages/utils/radomString";


// Dữ liệu khởi tạo mặc định: 1 dòng trống + 1 dòng tổng
export  const initData: InvestorBorrowData[] = [
  {
    key: randomString(10),
    tenNhaDauTu: '',
    choVay: 0,
    baoLanh: 0,
  },
  {
    key: 'total',
    tenNhaDauTu: 'Tổng cộng',
    choVay: 0,
    baoLanh: 0,
    isTotalRow: true,
  }
];
 
// --- LOGIC TÍNH TỔNG TỰ ĐỘNG ---
export  const calculateVerticalTotal = (currentData: InvestorBorrowData[]) => {
    const totalRowIndex = currentData.findIndex(item => item.isTotalRow);
    if (totalRowIndex === -1) return currentData;

    const summary = {
        choVay: 0,
        baoLanh: 0,
    };

    currentData.forEach((row) => {
        if (!row.isTotalRow) {
            summary.choVay += (row.choVay || 0);
            summary.baoLanh += (row.baoLanh || 0);
        }
    });

    const newData = [...currentData];
    newData[totalRowIndex] = { ...newData[totalRowIndex], ...summary };
    return newData;
  };