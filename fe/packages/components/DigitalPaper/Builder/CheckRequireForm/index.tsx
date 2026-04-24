import { Checkbox } from 'antd';
import _ from 'lodash';
import React from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { selectActiveSchema, setSchema } from '~/redux/slices';

type TCheckRequireFormProps = {
  currentRequired: any[],
  giayToId: any
};

const CheckRequireForm = ({ currentRequired, giayToId }: TCheckRequireFormProps) => {
  const activeSchema = useAppSelector(selectActiveSchema);
  const dispatch = useAppDispatch();

  const onChange = (target: number, checkedValue: boolean) => {
    const activeCLonedSchema = _.cloneDeep(activeSchema);
    const index = _.findIndex(activeCLonedSchema.requiredForm[giayToId], { value: target });

    if (index > -1) {
      activeCLonedSchema.requiredForm[giayToId][index].checked = checkedValue;
      dispatch(setSchema({ ...activeCLonedSchema }));
    }
  };

  return (
    currentRequired.map(({ label, checked, value }) => (
      <Checkbox
        defaultChecked={checked}
        value={checked}
        onChange={(e) => onChange(value, e.target.checked)}
      >
        {label}
      </Checkbox>
    ))
  );
};

export default CheckRequireForm;
