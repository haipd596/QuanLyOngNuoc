import { LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  message,
  Spin,
} from 'antd';
import React, { useState } from 'react';
import './styles.scss';

type FieldType = {
  id: string;
  name?: string;
  dob?: string;
};

type TProps = {
  onFinish: FormProps<FieldType>['onFinish'];
  type: 1 | 0;
  initNumber?: string;
};

function FrmGetOrganizationInfoRequest(props: TProps) {
  const { onFinish, type, initNumber } = props;
  const [loading] = useState(false);

  const configPerson = [
    {
      label: 'Số CCCD',
      name: 'id',
      type: 'text',
      placeholder: 'Nhập số CCCD',
      rules: [
        {
          required: true,
          message: 'Nhập số CCCD',
        },
        {
          pattern: /^[0-9]{9,12}$/,
          message: 'Số CCCD chỉ nhập số',
        },
        {
          min: 9,
          message: 'Số CCCD không ít hơn 9 ký tự',
        },
        {
          max: 12,
          message: 'Số CCCD không nhiều hơn 12 ký tự',
        },
        {
          pattern: new RegExp(`^${initNumber}$`),
          message: 'Số CCCD không giống với số CCCD của bạn',
        },
      ],
    },
    {
      label: 'Họ và tên',
      name: 'fullName',
      type: 'text',
      placeholder: 'Nhập họ và tên',
      rules: [
        {
          required: true,
          message: 'Nhập họ và tên',
        },
        {
          pattern: /^[a-zA-Z\s]*$/,
          message: 'Họ và tên chỉ nhập chữ',
        },
      ],
    },
    {
      label: 'Ngày sinh',
      name: 'dob',
      type: 'date',
      placeholder: 'Chọn ngày tháng năm sinh',
      rules: [
        {
          required: true,
          message: 'Nhập ngày sinh',
        },
      ],
    },
  ];

  const configOrganization = [
    {
      label: 'Mã số doanh nghiệp',
      name: 'id',
      rules: [
        {
          required: true,
          message: 'Nhập mã số doanh nghiệp',
        },
        {
          pattern: new RegExp(`^${initNumber}$`),
          message:
            'Mã số doanh nghiệp không giống với mã số doanh nghiệp của bạn',
        },
      ],
    },
  ];

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    message.error(`Failed: ${errorInfo}`);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      onFinish={(values) => {
        if (onFinish) {
          onFinish(values);
          // setLoading(true);
        }
      }}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="frmGetOrganizationInfoRequest"
    >
      {type
        ? configPerson.map((item) => (
          <Form.Item
            label={item.label}
            labelAlign="left"
            name={item.name}
            rules={item.rules}
          >
            {item.type === 'date' ? (
              <DatePicker
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                placeholder={item.placeholder}
              />
            ) : (
              <Input placeholder={item.placeholder} />
            )}
          </Form.Item>
        ))
        : configOrganization.map((item) => (
          <Form.Item
            label={item.label}
            labelAlign="left"
            name={item.name}
            rules={item.rules}
          >
            <Input />
          </Form.Item>
        ))}
      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Lấy thông tin
        </Button>
        {loading && (
          <Spin
            indicator={<LoadingOutlined spin />}
            style={{ marginLeft: 10 }}
          />
        )}
      </Form.Item>
    </Form>
  );
}

export default FrmGetOrganizationInfoRequest;
