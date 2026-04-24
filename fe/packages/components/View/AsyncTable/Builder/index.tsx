import { useAppDispatch } from '~/redux/hooks';
import { replaceSubForm } from '~/redux/slices';
import AsyncTableViewer from '../Viewer';
import { TAsyncTableProps } from '../type';

const AsyncTableBuilder = ({ value, ...props }: TAsyncTableProps) => {
  const dispatch = useAppDispatch();

  const handleSaveSubForm = (_subForm: any, index: any) => {
    dispatch(replaceSubForm({
      parentFieldKey: props.fieldKey,
      subSchema: {
        ...props.subForm,
        [index]: _subForm,
      } as any,
    }));
  };

  return <AsyncTableViewer {...props} onSaveSubForm={handleSaveSubForm} />;
};

export default AsyncTableBuilder;
