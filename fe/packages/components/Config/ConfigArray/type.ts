import { TCommonConfigArray } from '@packages/@types';
import { FIELD_NAME } from '@packages/constants/fields';
import { Field } from '@packages/schema/fields/fieldModel';
import { AnyObject } from 'antd/es/_util/type';

export const GROUP_TABLE_FIELD = [
  FIELD_NAME.TABLE,
  FIELD_NAME.FIELD_TABLE_SINGLE,
  FIELD_NAME.ASYNC_TABLE,
];

export type ConfigArrayProps = {
  defaultValue: AnyObject[],
  onSave: (value: AnyObject[]) => void,
  fieldSchema: Field,
} & TCommonConfigArray;

export const canDeleteOption = (data: AnyObject[], filedName: string) => {
  if (
    (data?.length === 1)
    || (
      ([
        FIELD_NAME.TABLE,
        FIELD_NAME.FIELD_TABLE_SINGLE,
      ].includes(filedName) && data?.length === 2)
    )
  ) {
    return true;
  }
  return false;
};
