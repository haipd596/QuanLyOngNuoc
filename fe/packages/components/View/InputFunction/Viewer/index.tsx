import { FIELD_NAME } from '@packages/constants/fields';
import { Form, Input } from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { useEffect } from 'react';

const InputFunctionViewer:React.FC<any> = (props) => {
  const { transformDataOption } = props;
  const formBase = useFormInstance();

  useEffect(() => {
    formBase.setFieldValue(FIELD_NAME.INPUT_FUNCTION, transformDataOption);
  }, [transformDataOption]);

  return (
    <div>
      <Form.Item name={FIELD_NAME.INPUT_FUNCTION} hidden>
        <Input />
      </Form.Item>
    </div>
  );
};

export default InputFunctionViewer;
