import type { IBaseFilter } from "@shared/types";
import { useState } from "react";

const useFilter = <T extends IBaseFilter = IBaseFilter>(initialFilter: T) => {
  const [filter, setFilter] = useState<T>(initialFilter);

  const handleFilter = (values: Partial<T>) => {
    setFilter({
      ...initialFilter,
      ...values,
    });
  };

  const handleClearFilter = () => {
    setFilter(initialFilter);
  };

  const pagination = (totalRecords?: number) => ({
    current: filter.page,
    pageSize: filter.pageSize,
    total: totalRecords,
    showSizeChanger: true,

    onChange: (page: number, pageSize: number) => {
      setFilter((prev) => ({
        ...prev,
        page,
        pageSize,
      }));
    },

    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} / ${total} bản ghi`,

    locale: {
      items_per_page: "bản ghi / trang",
    },

    onShowSizeChange: (_: number, pageSize: number) => {
      setFilter((prev) => ({
        ...prev,
        page: 1,
        pageSize,
      }));
    },
  });

  return { filter, setFilter, handleClearFilter, pagination, handleFilter };
};

export default useFilter;