import { FIELD_NAME } from '@packages/constants/fields';
import { Field } from '@packages/schema/fields/fieldModel';
import { filterAllColumnsHasSameKey } from '@packages/schema/fields/TableField/configSchemaTable';
import { isDuplicate, isDuplicateKey } from '@packages/utils/common';
import { notification } from 'antd';
import _ from 'lodash';
import { Suspense, lazy } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import {
  replaceFields,
  selectActiveConfigFieldKey,
  selectActiveFields,
  selectModeView,
  updateField,
} from '~/redux/slices';
import { updateMultiColumnInTable } from './updateMultiColumnInTable';

const ConfigFieldSideBar = lazy(() => import('../index'));

// TODO: Using Config Page
function SideBarRight() {
  const dispatch = useAppDispatch();
  const [message, contextHolder] = notification.useNotification();
  const activeConfigFieldKey = useAppSelector(selectActiveConfigFieldKey);
  const modeView = useAppSelector(selectModeView);
  const fields = useAppSelector(selectActiveFields);

  const handleOnChange = (newData: Field) => {
    if (!activeConfigFieldKey) return;

    const newField = new Field(newData);
    const columns = _.get(newField, 'componentPropsAllowConfig.columns.props.defaultValue');

    if (newField.fieldName === FIELD_NAME.CHECKBOX_WITH_INPUT) {
      const isError = isDuplicateKey(newField);
      if (isError.status) {
        return message.error({
          message: 'Lỗi!',
          description: isError.message,
        });
      }
    }

    if ((
      newField.fieldName === FIELD_NAME.TABLE
      || newField.fieldName === FIELD_NAME.FIELD_TABLE_SINGLE
    )
      && _.isArray(columns)
    ) {
      const fieldNeedCheckKeyFromColumnTable = filterAllColumnsHasSameKey(columns);

      if (isDuplicate(fieldNeedCheckKeyFromColumnTable, 'dataIndex') || isDuplicate(fieldNeedCheckKeyFromColumnTable, 'key')) {
        return message.error({
          message: 'Lỗi!',
          description: 'Trùng key hoặc dataIndex',
        });
      }
      const updatedFields = updateMultiColumnInTable(
        fields,
        newField,
        activeConfigFieldKey,
      );

      dispatch(replaceFields(updatedFields));
      return;
    }

    dispatch(
      updateField({
        key: activeConfigFieldKey,
        newData: newField,
      }),
    );
  };

  return (
    <Suspense fallback={null}>
      {contextHolder}
      <ConfigFieldSideBar
        activeConfigFieldKey={activeConfigFieldKey}
        modeView={modeView}
        fields={fields}
        onChange={handleOnChange}
      />
    </Suspense>
  );
}

export default SideBarRight;
