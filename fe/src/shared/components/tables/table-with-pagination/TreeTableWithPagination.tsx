// import useI18n from "@/shared/hooks/useI18n";
// import type { TableProps } from "antd";
// import { Skeleton, Table } from "antd";
// import { forwardRef, useEffect, useState } from "react";
// import { TableWrapper } from "./styled";

// export interface ITreeTableWithPagination<T = any> extends TableProps<T> {
//   bodyHeight?: string | number;
//   paginationBackground?: string;
//   onRow?: any;
//   rowKey?: string | ((record: T) => string);
//   expandable?: TableProps<T>["expandable"];
//   expandIconColumnIndex?: number;
// }

// const TreeTableWithPagination = (
//   {
//     bodyHeight,
//     paginationBackground,
//     pagination,
//     columns,
//     dataSource,
//     loading,
//     rowKey,
//     expandable,
//     expandIconColumnIndex,
//     ...props
//   }: ITreeTableWithPagination,
//   ref: React.ForwardedRef<HTMLDivElement>
// ) => {
//   const [_pageSize, setPageSize] = useState<number>(
//     (pagination && pagination?.pageSize) || 10
//   );
//   const { t } = useI18n();

//   const _dataSource = loading
//     ? new Array(_pageSize).fill(null).map((_, index) => ({ key: index }))
//     : dataSource;

//   const _columns = loading
//     ? columns?.map((c) => {
//         return {
//           ...c,
//           render: () => <Skeleton.Input size="small" active block />,
//         };
//       })
//     : columns;

//   useEffect(() => {
//     if (pagination && pagination.pageSize !== undefined) {
//       setPageSize(pagination?.pageSize || 10);
//     }
//   }, [pagination]);

//   return (
//     <TableWrapper
//       ref={ref}
//       paginationBackground={paginationBackground}
//       $bodyHeight={bodyHeight}
//     >
//       <Table
//         columns={_columns}
//         dataSource={_dataSource}
//         rowKey={rowKey || "id"}
//         pagination={{
//           total: (pagination && pagination?.total) || dataSource?.length,
//           showSizeChanger: true,
//           pageSize: _pageSize,
//           showTotal: (total, range) =>
//             t("total_items", {
//               from: range[0],
//               to: range[1],
//               total,
//             }),
//           locale: {
//             items_per_page: t("items_per_page"),
//           },
//           onShowSizeChange: (_, size) => setPageSize(size),
//           ...pagination,
//         }}
//         expandable={expandable}
//         expandIconColumnIndex={
//           expandIconColumnIndex !== undefined ? expandIconColumnIndex : 1
//         }
//         {...props}
//       />
//     </TableWrapper>
//   );
// };

// export default forwardRef<HTMLDivElement, ITreeTableWithPagination>(
//   TreeTableWithPagination
// );
