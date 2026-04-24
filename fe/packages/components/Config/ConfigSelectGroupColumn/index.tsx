import { IPropsTable } from '@packages/components/View/ViewTable/type.table';
import { formatFieldConfigToColumnTable } from '@packages/components/View/ViewTable/utils';
import { FIELD_IN_TABLE_NEED_FORMAT } from '@packages/constants/fields';
import { Field } from '@packages/schema/fields/fieldModel';
// import { ColumnProps } from 'antd/es/table';
import { Select } from 'antd/lib';
import _get from 'lodash/get';
import _map from 'lodash/map';
import React, { useMemo } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveFields } from '~/redux/slices';

type TConfigSelectGroupColumnProps = {
  fieldSchema: Field,
};

const ConfigSelectGroupColumn = (props: TConfigSelectGroupColumnProps) => {
  const {
    fieldSchema, ...rest
  } = props;
  const fields = useAppSelector(selectActiveFields);

  const options = useMemo(() => {
    const findColumnInTable = fields.find((item) => item.key === fieldSchema.key);
    const _groupColumns: IPropsTable['columns'] = [];

    if (findColumnInTable) {
      const columnsActive = _get(findColumnInTable, 'componentPropsAllowConfig.columns.props.defaultValue', []) as IPropsTable['columns'];
      // const _columnsActive = _get(
      //   fieldSchema,
      //   'componentPropsAllowConfig.columns.props.defaultValue',
      //   [],
      // ) as IPropsTable['columns'];

      columnsActive.forEach((item) => {
        const columnDataType = item?.columnDataType?.props?.defaultValue;
        if (FIELD_IN_TABLE_NEED_FORMAT.includes(columnDataType)) {
          const groupColumnConfig: any = fields.find(({ uniqId }) => uniqId === item.uniqId);
          if (groupColumnConfig) {
            const optionsGroup = formatFieldConfigToColumnTable(
              groupColumnConfig,
              item.columnDataType,
            );

            if (optionsGroup?.length) {
              _groupColumns.push(...optionsGroup);
              return;
            }
          }
        }
        _groupColumns.push(item);
      });
    }

    return _map(_groupColumns, (item) => ({ label: item.title, value: item.key }));
  }, [fieldSchema, fields]);

  if ((options.length <= 0)) return <div>Columns Not Found!</div>;

  return (
    <Select {...rest} options={options} />
  );
};

export default ConfigSelectGroupColumn;
