import { IPropsTable } from '@packages/components/View/ViewTable/type.table';
import { Button } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import Table, { ColumnType } from 'antd/es/table';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

export const FormBuilderFieldTableSingle: React.FC<IPropsTable> = (props) => {
  const { columns, ...rest } = props;

  const [dataSource, setDataSource] = useState<AnyObject[]>([]);
  const [columnFields, setColumnFields] = useState<ColumnType<any>[]>([]);

  const columnActions: any = useMemo(() => ({
    title: 'Thao Tác',
    dataIndex: 'action',
    width: 100,
    className: 'btn-action-column',
    render: () => <Button icon={(<i className={clsx('fa-solid fa-trash fa-lg', 'icon_global_dvc')} />)} disabled />,
  }), []);

  useEffect(() => {
    if (columns && columns.length > 0) {
      const builderDataSource = columns.map((col: ColumnType<any>) => (
        { [col.dataIndex]: 'Nội dung' }
      )).reduce((acc, cur) => ({ ...acc, ...cur }), {});

      setColumnFields([...columns, columnActions]);
      setDataSource([builderDataSource]);
    } else {
      setColumnFields([]);
    }
  }, [columns]);

  return (
    <Table
      {...rest}
      columns={columnFields}
      locale={{ emptyText: 'Chưa có dữ liệu!' }}
      dataSource={[...dataSource]}
      className="table-form-control"
    />
  );
};

export default FormBuilderFieldTableSingle;
