import { FIELD_NAME } from '@packages/constants/fields';
import { TPropsNotSupport } from '@packages/components/NotSupport';
import { Field } from '../fieldModel';

export const createNotSupportField = (message = '') => (
  new Field<TPropsNotSupport>({
    key: '',
    fieldName: FIELD_NAME.NOT_SUPPORT,
    version: 0,
    componentPropsReadOnly: {
      message,
    },
  })
);
