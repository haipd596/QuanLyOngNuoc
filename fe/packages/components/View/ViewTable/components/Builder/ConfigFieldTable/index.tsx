import ConfigFieldSideBar from '@packages/components/ConfigFieldSideBar';
import { MODE_VIEW } from '@packages/constants/modeView';
import { IField } from '@packages/main/Forms';
import { Field } from '@packages/schema/fields/fieldModel';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import {
  selectActiveConfigFieldKey, setActiveFieldKey, updateField,
} from '~/redux/slices';
import '../../styles.scss';

type TProps = {
  subForm: IField['subForm']
  fieldKey: string;
};

// TODO: Using config table modal
export function ConfigFieldTable({ subForm }: TProps) {
  const dispatch = useAppDispatch();
  const activeConfigFieldKey = useAppSelector(selectActiveConfigFieldKey);

  if (!subForm) return <div>Schema Not Support</div>;

  const handleOnChange = (newData: Field) => {
    const newField = new Field(newData);

    newField.isShowField = false;

    dispatch(
      updateField({
        key: activeConfigFieldKey ?? 'key',
        newData: newField,
      }),
    );
  };

  const handleFieldKeyChange = (value: string) => {
    dispatch(setActiveFieldKey(value));
  };

  return (
    <div className="wrapper-config-field-table">
      <ConfigFieldSideBar
        activeConfigFieldKey={activeConfigFieldKey}
        modeView={MODE_VIEW.EDIT}
        fields={subForm.fields}
        onChange={handleOnChange}
        onFieldKeyChange={handleFieldKeyChange}
      />
    </div>
  );
}
