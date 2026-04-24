import type { FormProps } from 'antd';
import {
  Button, DatePicker, Form, Input,
} from 'antd';
// import { DatePickerProps } from 'antd/lib';
import { FORM_CONFIG } from '@packages/constants/commons';
import React from 'react';
import './styles.scss';

type FieldType = {
  [name: string]: string | boolean;
  // repeat?: boolean;
};

const { TextArea } = Input;
function FormCustomFill(props:FieldType) {
  const {
    repeat = false,
  } = props;

  const onFinish: FormProps<FieldType>['onFinish'] = () => {
    // console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    // console.log('Failed:', errorInfo);
  };

  const onOkDatepicker = () => {
    // console.log('onOk: ', value);
  };

  return (
    <div className="f-form-custom-fill">
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          repeat: [''],
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ padding: 10 }}
        {...FORM_CONFIG}
      >
        <Form.List name="repeat">
          {(fields, { add, remove }) => (
            <>
              <div className="f-form-custom-fill__title">
                <p>Thông tin chủ sử dụng:</p>
                {repeat ? (
                  <Form.Item className="f-btn-add">
                    <Button type="dashed" onClick={() => add()} block>+</Button>
                  </Form.Item>
                ) : null}
              </div>
              {fields.map(({ key, name, ...restField }) => (
                <div className="f-form-custom-fill__content">
                  <ul className="f-list f-list-padding-litter">
                    <li>
                      <Form.Item<FieldType>
                        {...restField}
                        label="Họ và tên"
                        name={`${name}.fullname`}
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                      >
                        <Input className="f-input f-border-dashed f-only-bottom f-bg-none" />
                      </Form.Item>
                    </li>
                    <li>
                      <Form.Item<FieldType>
                        label="Ngày sinh"
                        name="dob"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
                      >
                        <DatePicker onOk={onOkDatepicker} placeholder="DD/MM/YYYY" format="DD/MM/YYYY" className="f-input f-border-dashed f-only-bottom f-bg-none f-width-full" />
                      </Form.Item>
                    </li>
                    <li>
                      <Form.Item<FieldType>
                        label="Số CMND/CCCD:"
                        name="vneid"
                        rules={[{ required: true, message: 'Vui lòng nhập CMND/CCCD' }]}
                      >
                        <Input className="f-input f-border-dashed f-only-bottom f-bg-none" placeholder="Số CMND được tự động điền" />
                      </Form.Item>
                    </li>
                    <li>
                      <Form.Item<FieldType>
                        label="Địa chỉ:"
                        name="address"
                      >
                        <TextArea className="f-input f-border-dashed f-only-bottom f-bg-none" disabled placeholder="Địa chỉ được tự động điền" />
                      </Form.Item>
                    </li>
                  </ul>
                  {repeat ? (
                    <div className="f-form-custom-fill__content__control">
                      <Button className="f-btn-remove" type="dashed" onClick={() => remove(name)} block>
                        X
                      </Button>
                    </div>
                  ) : null}
                </div>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
}

export default FormCustomFill;
