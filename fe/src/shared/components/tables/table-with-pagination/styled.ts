import styled from 'styled-components';

export const TableWrapper = styled.div<{
  $bodyHeight?: string | number;
  paginationBackground?: string;
}>`
  ${(props) =>
    props && props.$bodyHeight
      ? `.ant-table-body {
          height: ${props.$bodyHeight};
        }`
      : ''}

  ${(props) =>
    props.paginationBackground
      ? `.ant-pagination.ant-table-pagination {
          background-color: ${props.paginationBackground};
        }`
      : ''}

  .ant-pagination-options,
  .ant-pagination-options-size-changer,
  .ant-select-selector {
    cursor: pointer !important;
  }

  /* Border cho hàng cuối cùng */
  .ant-table-tbody > tr:last-child > td {
    border-bottom: 0px solid var(--border-primary) !important;
  }

  /* Border cho table wrapper */
  .ant-table-wrapper .ant-table {
    border-bottom: 1px solid var(--border-primary);
    border-radius: 8px;
  }

  .ant-table-thead > tr > th {
    background-color: var(--primary) !important;
    color: #fff !important;
  }

  .ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container {
    border-inline-start: 0px solid var(--border-primary);
    border-top: 0px solid var(--border-primary);
  }
  .ant-table-wrapper .ant-table-cell-scrollbar:not([rowspan]) {
    box-shadow: 0 0px 0 0px #E7E7E7;
  }

  .ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >thead>tr>th:last-child, 
  .ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-header >table >thead>tr>th:last-child,  
  .ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-header >table >tbody>tr>td:last-child , 
  .ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-body >table >tbody>tr>td:last-child, 
  .ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-summary >table >tfoot>tr>td:last-child {
    border-inline-end: 0px solid var(--border-primary) !important;
  }
`;
