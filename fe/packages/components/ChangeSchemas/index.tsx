import { useAppSelector } from '~/redux/hooks';
import { useLazyGetSchemaDetailQuery } from '~/redux/services/schemaApi';
import { selectActiveSchema } from '~/redux/slices/FormSlice';
import './styles.scss';
import SelectSchema from '../SelectSchema';

function ChangeSchemas() {
  const [handleGet] = useLazyGetSchemaDetailQuery();
  const schema = useAppSelector(selectActiveSchema);

  const selectFormChange = (schemaKey: string) => {
    handleGet(schemaKey);
  };

  return (
    <div className="change-schema-wrapper">
      <SelectSchema schemaKey={schema?.schemaKey} onChange={selectFormChange} />
    </div>
  );
}

export default ChangeSchemas;
