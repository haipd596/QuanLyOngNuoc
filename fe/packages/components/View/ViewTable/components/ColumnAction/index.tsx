import { Button, Space } from 'antd';
import { ColumnType } from 'antd/es/table';
import clsx from 'clsx';
import { useMemo } from 'react';

import FActionTable from '@packages/components/CommonTable/FActionTable';
import IconWrapper from '@packages/components/IconWrapper';
import { message } from 'antd/lib';
import { TYPE_ACTION } from '../../type.table';

interface ColumnActionsProps {
  modeView: string;
  handleSetDataSourceUpdate: (record: any) => void;
  handleDeleteField: (key: string) => void;
  setAction: (action: TYPE_ACTION) => void;
  setOpenModal: (open: boolean) => void;
  getMaxRowValue?: number;
  dataSource?: any[]
  maxRowErrorMessage?: string;
}

export const ColumnActions = ({
  modeView,
  handleSetDataSourceUpdate,
  handleDeleteField,
  setAction,
  setOpenModal,
  getMaxRowValue,
  dataSource,
  maxRowErrorMessage,
}: ColumnActionsProps) => useMemo<ColumnType<any>>(
  () => {
    const handleAddRow = () => {
      // Dùng để cấu hình khi có giá trị ràng buộc số lượng với số lượng bản ghi trong table
      if ((getMaxRowValue) && dataSource?.length) {
        if (dataSource.length >= getMaxRowValue) {
          return message.error(maxRowErrorMessage || 'Lỗi');
        }
      }

      setAction(TYPE_ACTION.ADD);
      setOpenModal(true);
    };

    return ({
      width: 70,
      dataIndex: 'action',
      align: 'center',
      className: 'action-table',
      title: <FActionTable
        modeView={modeView}
        onAdd={handleAddRow}
      />,
      render: (_value, record: { key: string }) => (
        <Space size={[5, 0]} align="baseline" wrap>
          <Button
            icon={(
              <IconWrapper
                icon={<i className={clsx('fa-solid fa-pen-to-square fa-xl', 'icon_global_dvc')} />}
              />
          )}
            onClick={() => handleSetDataSourceUpdate(record)}
          />
          <Button
            icon={(
              <IconWrapper
                icon={<i className={clsx('fa-solid fa-trash fa-lg', 'icon_global_dvc')} />}
              />
          )}
            onClick={() => handleDeleteField(record.key ?? '')}
          />
        </Space>
      ),
    });
  },
  [
    modeView,
    handleDeleteField,
    handleDeleteField,
    setAction,
    setOpenModal,
    getMaxRowValue,
    dataSource,
  ],
);
