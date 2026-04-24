import { FORM_CONFIG } from '@packages/constants/commons';
import {
  Button, Form, Input, Modal,
} from 'antd';
import { useCallback } from 'react';
import { IPropsFormModal, IPropsValue } from '../../type';

const FormModalValue: React.FC<IPropsFormModal> = (props) => {
  const {
    open, form, onCancel, 
    onSubmit,
    // onClose, 
  } = props;

  const handleSubmit = useCallback(async () => {
    try {
      const values: IPropsValue = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  // const handleClose = () => {
  //   onClose();
  //   form.resetFields();
  // };

  return (
    <div style={{ marginTop: 25 }}>
      <Modal
        open={open}
        onCancel={handleCancel}
        // onClose={handleClose}
        footer={null}
        className="modal-view-info"
        title="Thêm thông tin"
        
      >
        <Form
          onFinish={handleSubmit}
          form={form}
          labelCol={{ span: 5 }}
          {...FORM_CONFIG}
        >
          <Form.Item
            label="Key"
            name="key"
            rules={[{ required: true, message: 'Nhập tên key!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Value"
            name="value"
            rules={[{ required: true, message: 'Nhập tên value!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="id"
            style={{ display: 'none' }}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Lưu</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FormModalValue;
