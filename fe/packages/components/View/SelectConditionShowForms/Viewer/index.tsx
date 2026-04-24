import DelayRender from '@packages/components/DelayRender';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { Field, IField } from '@packages/schema/fields/fieldModel';
import { getFieldsByColumnIndex } from '@packages/utils/fields';
import { Row, Select } from 'antd';
import _get from 'lodash/get';
import React, { useMemo } from 'react';

type TViewSelectConditionShowToggleProps = {
  fieldsInColumnIndex: IField['fieldsInColumnIndex'],
  fields: Field[],
  fieldKey: string,
  modeView: string,
  value: string,
};

const ViewSelectConditionShowToggle = (props: TViewSelectConditionShowToggleProps) => {
  const {
    fields, fieldsInColumnIndex, modeView, fieldKey, value, ...rest
  } = props;
  const fieldInToggle = useMemo(() => {
    return getFieldsByColumnIndex(fields, fieldsInColumnIndex);
  }, [fields, fieldsInColumnIndex]);

  const options = useMemo(() => {
    return fieldInToggle.map((field, index) => {
      const label = _get(field, 'componentPropsAllowConfig.labelCheckBox.props.defaultValue', '');

      return ({
        label,
        value: field?.key,
        component: (
          <FieldItem
            field={field as any}
            fieldIndex={index}
            modeView={modeView}
            key={field?.key}
          />
        ),
      });
    });
  }, [fieldInToggle, modeView]);

  const foundChildren = options.find(({ value: _value }) => value === _value)?.component;

  return (
    <DelayRender>
      <Select {...rest} value={value} style={{ width: '100%' }} options={options} />
      {foundChildren ? (
        <Row justify="start" style={{ gap: 8 }}>
          {foundChildren}
        </Row>
      ) : null}
    </DelayRender>
  );
};

export default ViewSelectConditionShowToggle;
