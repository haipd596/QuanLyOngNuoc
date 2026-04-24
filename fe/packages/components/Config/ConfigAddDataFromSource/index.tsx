import { TAddDataFromExtraSource } from '@packages/components/View/ViewTable/type.table';
import { FIELD_NAME } from '@packages/constants/fields';
import { IField } from '@packages/main/Forms';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { Input, Switch } from 'antd';
import { InputProps } from 'antd/lib';
import _ from 'lodash';
import { useState } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { replaceFields } from '~/redux/slices';

type TConfigAddDataFromSourceProps = {
  defaultValue: TAddDataFromExtraSource,
  onChange: (value: any) => void,
  fields: IField[],
  fieldSchema: IField,
};

const ConfigAddDataFromSource = (props: TConfigAddDataFromSourceProps) => {
  const {
    defaultValue, onChange, fields, fieldSchema,
  } = props;
  const { isShow } = defaultValue;
  const [value, setValue] = useState(defaultValue);
  const { extraDataSourceField } = fieldSchema || {};
  const dispatch = useAppDispatch();

  const handleTextChange:InputProps['onChange'] = (e) => {
    setValue((_value) => {
      const newValue = {
        ..._value,
        text: e.target.value,
      };
      onChange(newValue);
      return newValue;
    });
  };

  const handleEnable = (_value: boolean) => {
    setValue((prev) => {
      let clonedField = _.cloneDeep(fields);
      const _extraDataSourceField = extraDataSourceField || [];
      if (_.isEmpty(_extraDataSourceField)) {
        const field = insertJsonToSchema(FIELD_NAME.ASYNC_TABLE, { isShowField: false });
        _extraDataSourceField.push({
          columnIndex: 0,
          fieldKeyCol: field.key,
        });
        clonedField.push(field);
      }

      const fieldIndex = clonedField.findIndex(({ key }: any) => key === fieldSchema.key);

      if (fieldIndex > -1 && clonedField[fieldIndex]?.componentPropsAllowConfig) {
        clonedField = _.set(clonedField, `${fieldIndex}.componentPropsAllowConfig.addDataFromExtraSource.props.defaultValue.isShow`, _value);

        clonedField[fieldIndex].configChanged = {
          ...clonedField[fieldIndex].configChanged,
          'componentPropsAllowConfig.addDataFromExtraSource.props.defaultValue.isShow': _value,
        };

        clonedField[fieldIndex].extraDataSourceField = _extraDataSourceField;
      }

      const newValue = {
        ...prev,
        isShow: _value,
      };

      dispatch(replaceFields(clonedField));

      return newValue;
    });
  };

  return (
    <div className="wrapper">
      <Switch value={value.isShow} onChange={handleEnable} />
      {
        isShow ? (
          <>
            {/* <Button onClick={() => setIsOpen(true)}>Config table field</Button> */}
            {/* <Modal
              open={isOpen}
              onCancel={() => setIsOpen(false)}
              width="900px"
            >
              <Row justify="space-between">
                <Col span={18} className="content-form-view">
                  <FormBuilder
                    schema={{ fields: fieldInForm as any }}
                    modeView={MODE_VIEW.EDIT}
                  />
                </Col>
                <Col span={6} className="config-editor">
                  <SideBarRight />
                </Col>
              </Row>
            </Modal> */}
            <Input value={value.text} onChange={handleTextChange} />
          </>
        ) : null
      }
    </div>
  );
};

export default ConfigAddDataFromSource;
