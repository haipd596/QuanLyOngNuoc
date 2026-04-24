/* eslint-disable react/no-danger */
import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';

import { FIELD_IN_TABLE_NEED_FORMAT } from '@packages/constants/fields';
import { summaryTable } from '@packages/utils';
import { stringToFunc } from '@packages/utils/common';
import ParagraphContent from './components/Viewer/ParagraphContent';
import TableViewer from './components/Viewer/TableViewer';
import './styles.scss';
import { IPropsTable, ITableViewProps } from './type.table';
import { buildSubForm, formatFieldConfigToColumnTable } from './utils';

const FormTableView: React.FC<IPropsTable> = (props) => {
  const {
    columns, modeView, fieldKey, value = [], fieldName,
    stylesPropsParseFromJsonTree, isShowSummary,
    onChange, fields, fieldsInColumnIndex, extraDataSourceField, ...rest
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

  useEffect(() => {
    document.documentElement.style.setProperty('--table-cell-text-color', stylesPropsParseFromJsonTree?.textColor);
    document.documentElement.style.setProperty('--table-cell-text-size', `${stylesPropsParseFromJsonTree?.fontSize}px`);
  }, [stylesPropsParseFromJsonTree]);

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

    return _columns.map((item) => ({
      ...item,
      render: (values: string, record: AnyObject, index: any) => {
        if (item.transformDataColumn) {
          const stringFunc = _.get(item, 'transformDataColumn.props.defaultValue', '');

          try {
            const { func } = stringToFunc(stringFunc);

            if (func) {
              const result = func(values, record, index);
              if (result !== null) {
                return <div dangerouslySetInnerHTML={{ __html: result }} />;
              }
            }
          } catch (error) {
            console.error('transformDataColumn error', item, error);
          }
        }

        return (
          <ParagraphContent
            value={values}
            record={item}
            rowData={record}
          />
        );
      },
    }));
  }, [columns]);

  if ((renderColumns.length <= 0)) return <div>Columns Not Found!</div>;

  const onChangeValuesTable = (values: any) => {
    const total = summaryTable(values, renderColumns);
    const _valuesChange = isShowSummary ? [...values, total] : values;
    onChange?.(_valuesChange);
  };

  return (
    <div>
      <div className="form-table">
        <TableViewer
          {...rest}
          isShowSummary={isShowSummary}
          columns={renderColumns}
          value={value}
          fieldKey={fieldKey}
          onChange={isShowSummary ? onChangeValuesTable : onChange}
          modeView={modeView}
          subForm={subForm}
          fieldName={fieldName}
          subFormInExtraDataSource={subFormInExtraDataSource}
        />
      </div>
    </div>
  );
};

export type { ITableViewProps };
export default FormTableView;
