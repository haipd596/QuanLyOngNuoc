import { stringToFunc } from '@packages/utils/common';
import { Button, Flex, Table, TableProps } from 'antd';
import DOMPurify from 'dompurify';
import _get from 'lodash/get';
import { useEffect, useMemo, useState } from 'react';
import { buildTree, TColumnTableTree, TreeNodeDanhMuc } from '../common';
import '../styles.scss';

export type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']

export interface TableDanhMucProps {
  idKey: string;
  parentKey: string;
  action?: string;
  pathToSource?: string;
  indexLabel?: string;
  indexValue?: string;
  data?: any;
  isShowCheckBoxLeafNode?: boolean; 
  columns: TColumnTableTree[];
  isSelectionByRadio?: boolean;
  isShowReloadButton?: boolean;
  isShowBorder?: boolean;
  isCheckStrictly?: boolean;
  fieldKey?: string;
  value: React.Key[];
  onChange: (value: React.Key[]) => void;
}

const WrapperTableDanhMuc :React.FC<TableDanhMucProps> = (props) => {
  const { 
    idKey,
    parentKey,
    data,
    isShowCheckBoxLeafNode,
    columns,
    isSelectionByRadio,
    isShowReloadButton,
    isShowBorder,
    isCheckStrictly,
    value = [],
    onChange,
  } = props
  const [treeData, setTreeData] = useState<TreeNodeDanhMuc[]>([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      // const result = await apiGetDanhMucLoaiDongVat(); 
      const tree = buildTree(
        data || [], 
        {
          idKey: idKey, 
          parentKey: parentKey
        }, 
        null
      );

      setTreeData(tree);
    } catch(err){
      console.log("Lỗi:", err)
    } finally{
      setLoading(false);
    }
  };
  fetchData();
}, [idKey, parentKey, data]);

const handleReload = () => {
  setLoading(true);

  setTimeout(() => {
    onChange?.([]);
    setLoading(false);
  },300)
}

const hasSelected = value.length > 0;

const renderColumnTable: any = useMemo(() => {
  let initColumns;
  initColumns =  (columns.map(({dataIndex, key, transformDataColumn,...rest}) => ({
    ...rest,
    dataIndex: dataIndex,
    key: key,
    render: (_value: any, _record: any, index: any) => {
      if(transformDataColumn){
        const targetStringFunc = _get(transformDataColumn,'props.defaultValue','');
        try{
          const {func} = stringToFunc(targetStringFunc);
          if (func){
            const result = func(_value, _record,index);
            if(result !== null) {
              return(
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result)}} />
              )
            }
          }
        }catch(err){
          console.error('transformDataColumn error', key, err)
        }
      }
      return _value;
    }
  })))
  return initColumns;
},[columns])

const rowSelection: TableRowSelection<TreeNodeDanhMuc> = {
  selectedRowKeys: value,
  onChange: (_selectedRowKeys, _selectedRows) => {
    console.info(`onChange selectedRowKeys: ${_selectedRowKeys}`, 'onChange _selectedRows:', _selectedRows)
    onChange?.(_selectedRowKeys)
  },
  onSelect: (record, selected, selectedRows) => {
    console.info("onSelect",record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.info("onSelectAll",selected, selectedRows, changeRows);
  },
}

  return (
    <Flex gap="middle" vertical>
        <Flex align='center' gap='middle'>
          {
            isShowReloadButton ?
            <Button type='primary' onClick={handleReload} disabled={!hasSelected} loading={loading}>
              Làm mới
            </Button>
            : null 
          }
        </Flex>
        <Table<TreeNodeDanhMuc>
          className="tbl_danhmuc"
          columns={renderColumnTable}
          loading={loading}
          dataSource={treeData}
          pagination={false}
          expandable={{
            defaultExpandAllRows: false,
          }}
          rowSelection={{
          ...rowSelection,
          type: !isSelectionByRadio ? 'checkbox' : 'radio',
          checkStrictly: isCheckStrictly ?? true,
          getCheckboxProps: (record: any) => {
            if (!isShowCheckBoxLeafNode) {
              return {};
            }
            const isLeaf = !record.children || record.children.length === 0;
            return { disabled: !isLeaf }; // disable nếu không phải leaf
          },
        }}
          tableLayout="fixed"
          rowKey={idKey}
          bordered={isShowBorder}
        />
    </Flex>
  );
};

export default WrapperTableDanhMuc;
