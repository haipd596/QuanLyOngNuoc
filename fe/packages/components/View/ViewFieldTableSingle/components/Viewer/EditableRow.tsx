import { Form } from 'antd';
import React from 'react';
import { EditableContext } from '../../type.table.single';

const EditableRow: React.FC<any> = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableRow;
