import React, { useMemo } from 'react';

// import { useCreateSchemaTableDeps } from '@packages/hooks';
import { FIELD_IN_TABLE_NEED_FORMAT } from '@packages/constants/fields';
import _ from 'lodash';
import TableBuilder from './components/Builder/TableBuilder';
import './styles.scss';
import { IPropsTable, ITableViewProps } from './type.table';
import { buildSubForm, formatFieldConfigToColumnTable } from './utils';

export const FormTableBuilder: React.FC<IPropsTable> = (props) => {
  const {
    columns, modeView, fieldKey, fieldName,
    value = [], onChange, fields, fieldsInColumnIndex, extraDataSourceField, ...rest
  } = props;

  const subForm = useMemo(() => {
    return buildSubForm(
      fields,
      fieldsInColumnIndex,
      columns,
    );
  }, [fields, fieldsInColumnIndex, columns]);

  const subFormInExtraDataSource = useMemo(() => {
    return {
      fields: (fields || [])
        .map((item) => {
          const colKey: any = (extraDataSourceField || [])
            .find(({
              fieldKeyCol,
            }) => fieldKeyCol === item.key);
          if (colKey) {
            return {
              ...item,
              columnIndex: colKey.columnIndex,
              isShowField: true,
            };
          }

          return null;
        })
        .filter((item) => !_.isEmpty(item)) as any,
    };
  }, [fields, extraDataSourceField]);

  // Show UI component in builder
  const renderColumns = useMemo(() => {
    if ((!_.isArray(columns))) return [];
    const _columns: IPropsTable['columns'] = [];

    columns.forEach((item) => {
      if (FIELD_IN_TABLE_NEED_FORMAT.includes(item.columnDataType.props.defaultValue)) {
        const tableConfig: any = fields.find(({ uniqId }) => uniqId === item.uniqId);
        if (tableConfig) {
          const options = formatFieldConfigToColumnTable(tableConfig, item.columnDataType);
          if (options?.length) return _columns.push(...options);
        }
      }
      _columns.push(item);
    });

    return _columns;
  }, [columns]);

  if (!columns) return <div>Columns Not Found!</div>;

  return (
    <div onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}>
      <div className="form-table">
        <TableBuilder
          {...rest}
          fieldName={fieldName}
          fieldKey={fieldKey}
          value={value}
          columns={renderColumns}
          onChange={onChange}
          modeView={modeView}
          subForm={subForm}
          subFormInExtraDataSource={subFormInExtraDataSource}
        />
      </div>
    </div>
  );
};

export type { ITableViewProps };
export default FormTableBuilder;
