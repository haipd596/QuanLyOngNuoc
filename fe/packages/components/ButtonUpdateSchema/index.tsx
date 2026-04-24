import { apiPostSaveEform } from '@packages/dvc-service/apiPostSaveEform';
import { Schema } from '@packages/main/Forms';
import { Button, message } from 'antd';
import { ButtonProps } from 'antd/lib';
import { useAppSelector } from '~/redux/hooks';
import { useUpdateSchemaMutation } from '~/redux/services/schemaApi';
import { selectActiveSchema, selectSltTthc } from '~/redux/slices';
import { useLanguage } from '../LanguageContext';

const ButtonSaveSchema = (props: ButtonProps) => {
  const [update] = useUpdateSchemaMutation();
  const schema = useAppSelector(selectActiveSchema);
  const { translate } = useLanguage();
  const tthc = useAppSelector(selectSltTthc);
  const handleUpdateFormKey = async () => {
    update({ body: Schema.output(schema), schemaKey: schema?.schemaKey });
    const body = {
      id: tthc?.Id ?? 0,
      schemaEform: schema
    }
    const rs = await apiPostSaveEform(body)
    if(rs)
      message.success('Saved!');
  };

  return (
    <Button {...props} onClick={handleUpdateFormKey}>{translate('save')}</Button>
  );
};

export default ButtonSaveSchema;
