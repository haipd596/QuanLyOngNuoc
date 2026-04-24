import { ArrowLeftOutlined, ArrowRightOutlined, SaveOutlined } from '@ant-design/icons';
import { FORM_CONFIG } from '@packages/constants/commons';
import {
  Button, Flex, Form, message,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { useForm } from 'antd/es/form/Form';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import React from 'react';
import ViewButton from '../../ViewButton';

type TViewerProps = {
  value: AnyObject,
  onNext?: (values: any) => void,
  onBack?: () => void,
  children: React.ReactNode,
  onChange: (values: any) => void,
  isLast: boolean
};

const FormWrapperEachStep = (props: TViewerProps) => {
  const {
    value, onNext, children, onBack, onChange, isLast,
  } = props;
  const [form] = useForm();
  const formInstance = useFormInstance();

  const handleSaveTemp = async () => {
    try {
      const results = await formInstance.validateFields();
      // eslint-disable-next-line no-eval
      eval(`callbackLuuHoSo(${JSON.stringify(results)})`);
    } catch (error: any) {
      console.error(error);
      message.error(error?.message || 'Đã có lỗi xảy ra');
    }
  };

  return (
    <Form
      initialValues={value}
      form={form}
      onValuesChange={(_test, _values) => onChange(_values)}
      {...FORM_CONFIG}
    >
      {children}
      <Flex align="center" justify="center" gap={4} className="hidden-in-details">
        {onBack && (
        <Form.Item>
          <Button onClick={onBack} type="primary" icon={<ArrowLeftOutlined />}>
            Quay lại
          </Button>
        </Form.Item>
        )}
        {isLast && (
        <Form.Item>
          <ViewButton
            icon={<SaveOutlined />}
            buttonType="primary"
            iconPosition="end"
            htmlType="submit"
            buttonContent="Lưu hồ sơ"
            onClick={handleSaveTemp}
          />
        </Form.Item>
        )}
        {onNext && (
          <Form.Item>
            <ViewButton
              icon={<ArrowRightOutlined />}
              buttonType="primary"
              iconPosition="end"
              onClick={onNext}
              htmlType="submit"
              buttonContent={isLast ? 'Nộp hồ sơ' : 'Tiếp tục'}
            />
          </Form.Item>
        )}
      </Flex>
    </Form>
  );
};

export default FormWrapperEachStep;
