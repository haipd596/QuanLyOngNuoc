import { MODE_VIEW } from '@packages/constants/modeView';
import { FormBuilder, JsonSchema } from '@packages/main/Forms';
import '../../styles.scss';

type TProps = {
  subForm: JsonSchema | undefined,
  isModeEditModal?: boolean;
};

export function BuilderFieldSide({ subForm, isModeEditModal }: TProps) {
  if (!subForm) return <p>Can not find the sub form</p>;

  return (
    <div className="wrapper-builder-field-table">
      <FormBuilder schema={subForm} isModeEditModal={isModeEditModal} modeView={MODE_VIEW.EDIT} />
    </div>
  );
}
