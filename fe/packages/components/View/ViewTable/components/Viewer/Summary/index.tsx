import { Table } from 'antd';
import _get from 'lodash/get';

interface SummaryProps {
  pageData: any[];
  columns: any[];
  dataSource: any[];
}

const Summary: React.FC<SummaryProps> = (props) => {
  const { pageData, columns } = props;

  return (
    <Table.Summary.Row>
      {columns?.length > 0 && columns.map((_i, index: number) => {
        switch (_i.dataIndex) {
          case 'stt':
            return (
              <Table.Summary.Cell key={`${_i.dataIndex}_${index}`} align="center" index={index}>
                <span style={{ fontWeight: 600 }}>Tổng</span>
              </Table.Summary.Cell>
            );
          default:
            if (_get(_i, 'isShowSummaryCol', false)) {
              const total = pageData.reduce((acc: number, item: any) => {
                const value = _get(item, _i.dataIndex, 0);

                return acc + (typeof value === 'number' ? value : 0);
              }, 0);

              return (
                <Table.Summary.Cell index={index} key={`${_i.dataIndex}-${index}`}>
                  <span style={{ fontWeight: 600 }}>{total || 0}</span>
                </Table.Summary.Cell>
              );
            }

            if (_get(_i, 'children', false) && _i?.children.length > 0) {
              return _i.children.map((_child: any, _idx: any) => {
                const total = pageData.reduce((acc: number, item: any) => {
                  const value = _get(item, _child.dataIndex, 0);

                  return acc + (typeof value === 'number' ? value : 0);
                }, 0);

                return (
                  <Table.Summary.Cell index={_idx} key={`${_child.dataIndex}-${_idx}`}>
                    <span style={{ fontWeight: 600 }}>{total || 0}</span>
                  </Table.Summary.Cell>
                );
              });
            }
            return <Table.Summary.Cell index={index} />;
        }
      })}
    </Table.Summary.Row>
  );
};

export default Summary;
