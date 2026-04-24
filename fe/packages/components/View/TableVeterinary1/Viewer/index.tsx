import { Table } from 'antd';
import { ColumnType } from 'antd/es/table';

const TableVeterinary1Viewer:React.FC = () => {
  const columns: ColumnType<any> = [
    {
      title: 'Column 1',
      dataIndex: 'column1',
      key: 'column1',
    },
    {
      title: 'Column 2',
      children: [
        {
          title: 'Sub Column 1',
          dataIndex: 'subColumn1',
          key: 'subColumn1',
        },
        {
          title: 'Sub Column 2',
          dataIndex: 'subColumn2',
          key: 'subColumn2',
        },
        {
          title: 'Sub Column 3',
          dataIndex: 'subColumn3',
          key: 'subColumn3',
        },
      ],
    },
    {
      title: 'Column 3',
      dataIndex: 'column3',
      key: 'column3',
    },
  ] as any;

  return (
    <Table<any>
      columns={columns as any}
      dataSource={[]}
      pagination={false}
      rowKey="key"
      bordered
    />
  );
};

export default TableVeterinary1Viewer;
