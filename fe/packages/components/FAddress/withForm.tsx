import { FORM_CONFIG } from '@packages/constants/commons';
import { Form } from 'antd';

export const withForm = (Component: any) => function (props: any) {
  const [form] = Form.useForm();

  return (
    <Form form={form} {...FORM_CONFIG}>
      <Component {...props} form={form} />
    </Form>
  );
};
