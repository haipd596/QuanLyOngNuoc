import { formatFieldConfigToColumnTable } from '@packages/components/View/ViewTable/utils';
import { FIELD_IN_TABLE_NEED_FORMAT, FIELD_NAME } from '@packages/constants/fields';
import { Button, Select } from 'antd';
import _get from 'lodash/get';
import _map from 'lodash/map';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveFields } from '~/redux/slices';

type SelectSourceProps = {
  defaultValue: any,
  onSave: (value: any) => void,
};

export const SelectSource: React.FC<SelectSourceProps> = (props) => {
  const fields = useAppSelector(selectActiveFields);

  const { defaultValue, onSave } = props;
  const [dataIndex, setDataIndex] = useState(_get(defaultValue, 'dataSource.dataIndex', ''));
  const [fieldKeySource, setFieldNameSource] = useState(_get(defaultValue, 'dataSource.fieldKey', ''));

  const activeFields = useSelector(selectActiveFields);
  const allFields = useMemo(() => {
    const _allFields = activeFields
      .filter(({ fieldName }) => (
        fieldName === FIELD_NAME.TABLE
        || fieldName === FIELD_NAME.FIELD_TABLE_SINGLE
        || fieldName === FIELD_NAME.ASYNC_TABLE
      ));

    return _allFields;
  }, [activeFields]);

  const fieldOptions = useMemo(() => {
    return allFields.map(({ key }) => ({
      label: key,
      value: key,
    }));
  }, [allFields]);

  const dataIndexOptions = useMemo(() => {
    const findColumn = allFields.find(({ key }) => key === fieldKeySource);
    const getDataIndex: any[] = [];

    const columns = _get(findColumn, 'componentPropsAllowConfig.columns.props.defaultValue', []) as any[];

    columns.forEach((item) => {
      const columnDataType = item?.columnDataType?.props?.defaultValue;
      if (FIELD_IN_TABLE_NEED_FORMAT.includes(columnDataType)) {
        const groupColumnConfig: any = fields.find(({ uniqId }) => uniqId === item.uniqId);
        if (groupColumnConfig) {
          const optionsGroup = formatFieldConfigToColumnTable(
            groupColumnConfig,
            item.columnDataType,
          );

          if (optionsGroup?.length) {
            getDataIndex.push(...optionsGroup);
            return;
          }
        }
      }
      getDataIndex.push(item);
    });

    return _map(getDataIndex, (item) => ({ label: item.dataIndex, value: item.key }));
    // return columns
    //   .map(({ dataIndex: _dataIndex }: any) => ({ label: _dataIndex, value: _dataIndex }));
  }, [allFields, fieldKeySource]);

  const handleChangeFieldOption = (value: string) => {
    setFieldNameSource(value);
    setDataIndex(null);
  };

  const handleSave = () => {
    onSave({ dataIndex, fieldKey: fieldKeySource });
  };

  return (
    <div>
      <p>Select source</p>
      <Select options={fieldOptions} value={fieldKeySource} onChange={handleChangeFieldOption} />
      <p>Data index</p>
      <Select options={dataIndexOptions} value={dataIndex} onChange={setDataIndex} />
      <p>
        <Button type="primary" onClick={handleSave}>Save</Button>
      </p>
    </div>
  );
};
