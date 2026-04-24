import {
  Button, ButtonProps,
  Form,
  Input,
  Modal,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { useUpdateSchemaMutation } from '~/redux/services/schemaApi';
import { selectActiveSchema, setSchema } from '~/redux/slices';

// const options = [
//   {
//     label: 'Vertical',
//     value: 'vertical',
//   },
//   {
//     label: 'Horizontal',
//     value: 'horizontal',
//   },
// ];

const ButtonEditSchema = (props: ButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeSchema = useAppSelector(selectActiveSchema);
  const [handleUpdateSchema] = useUpdateSchemaMutation();
  const dispatch = useAppDispatch();
  const [form] = useForm();

  const handleEditForm = () => {
    if (activeSchema) {
      setIsOpen(true);
    }
  };

  const handleSave = async (value: any) => {
    const {
      title,
      layout,
    } = value;
    const data = {
      ...activeSchema,
      title,
      layout,
    };
    const { error } = await handleUpdateSchema({
      body: data,
      schemaKey: activeSchema?.schemaKey,
    });

    if (error) return;

    setIsOpen(false);
    form.resetFields();
    dispatch(setSchema(data));
  };

  return (
    <>
      <Button {...props} onClick={handleEditForm}>Edit</Button>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <Form
          labelCol={{ span: 6 }}
          onFinish={handleSave}
          initialValues={activeSchema}
          form={form}
          labelAlign="left"
          style={{ padding: '8px 16px' }}
        >
          <Form.Item
            rules={[{ required: true }]}
            label="Title"
            name="title"
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            rules={[{ required: true }]}
            label="Select layout"
            name="layout"
          >
            <Select options={options} style={{ width: '100%' }} />
          </Form.Item> */}
          <Button htmlType="submit" type="primary">Save</Button>
        </Form>
      </Modal>
    </>
  );
};

export default ButtonEditSchema;
