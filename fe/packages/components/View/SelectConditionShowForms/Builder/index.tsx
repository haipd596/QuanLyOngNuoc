import React from 'react';
import BuilderCheckBoxToggle, { TBuilderCheckBoxToggleProps } from '../../CheckboxToggle/Builder';

type TBuilderSelectConditionShowFormProps = TBuilderCheckBoxToggleProps;

const BuilderSelectConditionShowForm = (props: TBuilderSelectConditionShowFormProps) => {
  return (
    <BuilderCheckBoxToggle {...props} />
  );
};

export default BuilderSelectConditionShowForm;
