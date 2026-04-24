import { TConfigOptionSelectProps } from '@packages/components/Config/ConfigOptionSelect';
import { GROUP_SELECT_TEN_KHOANGSAN } from '@packages/components/GroupSelect/constants';
import { DIVIDER_HIDDEN, FE_KEY } from '@packages/constants/commons';
import { Schema } from '@packages/main/Forms';
import { transformLabelReference } from '@packages/utils';
import { stringToFunc } from '@packages/utils/common';
import { flattenFieldsInSchema } from '@packages/utils/fields';
import { formManagers } from '@packages/utils/formManager';
import { omitRedundantAsyncFieldProps, omitRedundantFieldProps } from '@packages/utils/omitProps';
import {
  Form, Input, Select, SelectProps, Spin,
} from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { LabeledValue } from 'antd/es/select';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveGiayToId, selectActiveSchema } from '~/redux/slices';
import schemaTabKhoangSan from '../../../../schemaTemplates/base.schema.table.khoangsan.json';
import schemaTabKhoangSan2 from '../../../../schemaTemplates/base.schema.table.khoangsan2.json';
import { SPECIFIC_HIDDEN_KEYS_ADDRESS } from '../ButtonSyncDataToKhai/Viewer/transform.helper';
import { isTabKhoangSanKeys } from '../TableTabKhoangSan/Viewer/utils';
import { isTabKhoangSanKeys2 } from '../TableTabKhoangSan_2/Viewer/utils';
import { isInputTypeInColumn, recursiveGetData } from './recursiveGetData';

export type ViewSelectProps = Omit<SelectProps, 'onSelect'> & { onSelect: string } & {
  options: TConfigOptionSelectProps['defaultValue'],
  fieldKey: string,
  name: string;
  isModeMultiple?: boolean; 
};

function ViewSelect({
  onSelect,
  options,
  onChange,
  fieldKey,
  name,
  isModeMultiple,
  ...rest
}: ViewSelectProps) {
  const {
    dataSource, isGetFromOtherField, staticOption,
  } = options;
  // const { formChildren } = useContext(FormContext);
  const form = useFormInstance();
  const activeSchema = useAppSelector(selectActiveSchema);
  const activeGiayToId = useAppSelector(selectActiveGiayToId);

  const [isParsing, setIsParsing] = useState(false);
  const [selectOptions, setSelectOptions] = useState<LabeledValue[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  let onSelectFunc = new Function();

  try {
    const { func } = stringToFunc(onSelect);
    if (func instanceof Function) {
      onSelectFunc = func;
    }
  } catch (error) {
    console.error(error, 'error');
  }

  const fieldNameHidden = useMemo(() => {
    const referenceKey = _get(dataSource, 'dataIndex');
    if (referenceKey === GROUP_SELECT_TEN_KHOANGSAN.NAME_KEY_TEN_KHOANG_SAN) return 'TenKhoangSanHidden';
    if (referenceKey) return `${referenceKey}${DIVIDER_HIDDEN}`;
    return `${name}${DIVIDER_HIDDEN}`;
  }, [dataSource]);

  const handleChange: SelectProps['onChange'] = (...args) => {
    if (onChange) onChange(...args);

    
    const [value, option] = args;
    if (isModeMultiple) {
      const str = Array.isArray(value) ? value.join(', ') : value;
      form.setFieldValue(fieldNameHidden, str);
      return;
    }
    form.setFieldValue(
      fieldNameHidden,
      JSON.stringify({ ...option, fieldId: name }),
    );
  };

  useEffect(() => {
    if (isGetFromOtherField && activeGiayToId) {
      const { dataIndex, fieldKey: dataSourceFieldKey } = dataSource;
      const _form = formManagers.getItem(activeGiayToId) || form;
      const data = _form.getFieldsValue();

      setIsParsing(true);

      const { fields } = isTabKhoangSanKeys(fieldKey) || isTabKhoangSanKeys2(fieldKey)
        ? Schema.reconcile(
          {
            fields: schemaTabKhoangSan2.fields.concat(schemaTabKhoangSan.fields as any),
          } as any,
        )
        : Schema.reconcile(activeSchema);
      const _flattenFields = flattenFieldsInSchema(fields);
      const targetField = _flattenFields.find(({ key }) => key === dataSourceFieldKey);
      if (targetField) {
        const serverPayloadKey = _get(targetField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', '');
        const columns = _get(targetField, 'componentPropsAllowConfig.columns.props.defaultValue', []);

        const source = recursiveGetData(data, serverPayloadKey);

        const _filteredSource = source?.filter((item: any) => {
          return Object.entries(item).some(([key, value]) => {
            if (SPECIFIC_HIDDEN_KEYS_ADDRESS.includes(key)) return false;

            let parsedValue = value;
            if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
              try {
                parsedValue = JSON.parse(value);
              } catch (e) {
                console.error(e);
              }
            }

            if (typeof parsedValue === 'object' && parsedValue !== null) {
              return Object.values(parsedValue).some((v) => v !== '' && v !== 0);
            }

            return value !== '';
          });
        });

        if (_isArray(source)) {
          const _options = _filteredSource.map((item: any) => ({
            label: isInputTypeInColumn(columns, dataIndex)
              ? _get(item, dataIndex, '')
              : transformLabelReference(fieldNameHidden, item),
            value: _get(item, dataIndex, ''),
            serverPayloadKey,
            feKey: _get(item, FE_KEY, ''),
          }));
          setSelectOptions(_options);
        }
      }
    } else {
      setSelectOptions(staticOption);
    }
    setIsParsing(false);
  }, [options, activeGiayToId]);

  return (
    <>
      <Select
        {...omitRedundantFieldProps(omitRedundantAsyncFieldProps(rest))}
        onSelect={onSelectFunc as SelectProps['onSelect']}
        options={selectOptions}
        suffixIcon={isParsing && <Spin size="small" />}
        onChange={handleChange}
        mode={isModeMultiple ? 'multiple' : undefined}
      />
      <Form.Item name={fieldNameHidden} hidden>
        <Input />
      </Form.Item>
    </>
  );
}

export default ViewSelect;
