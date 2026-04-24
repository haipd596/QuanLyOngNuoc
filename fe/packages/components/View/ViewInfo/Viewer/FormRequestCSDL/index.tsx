import { LoadingOutlined } from '@ant-design/icons';
import { FORM_CONFIG } from '@packages/constants/commons';
import { disabledDatedFromCurrentDay } from '@packages/utils';
import {
  Button,
  DatePicker,
  Form,
  // FormProps,
  Input,
  message,
  Spin,
} from 'antd';
import React, { useState } from 'react';
import { formatNgayThangNamSinh } from './isNgayThangNamSinh';
import './styles.scss';

// type FieldType = {
//   id: string;
//   name?: string;
//   dob?: string;
// };

type TProps = {
  onFinish: (values: any) => Promise<void>;
  initNumber?: string;
  isPerson?: boolean,
  isOrganization?: boolean,
  currentUser: any,
};

function FormRequestCSDL(props: TProps) {
  const {
    onFinish,
    isPerson,
    isOrganization,
    currentUser,
  } = props;
  const [loading, setLoading] = useState(false);

  const configPerson = [
    {
      label: 'Số CCCD',
      name: 'id',
      type: 'number',
      placeholder: 'Nhập số CCCD',
      rules: [
        {
          required: true,
          message: 'Nhập số CCCD',
        },
        {
          pattern: /^[0-9]{9,12}$/,
          message: 'Số CCCD nằm trong khoảng 9 đến 12 số',
        },
        // {
        //   min: 9,
        //   message: 'Số CCCD không ít hơn 9 ký tự',
        // },
        // {
        //   max: 12,
        //   message: 'Số CCCD không nhiều hơn 12 ký tự',
        // },
        {
          pattern: new RegExp(`^${currentUser.customMaDinhDanh}$`),
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
          pattern: /^[^!@#$%^&*()<>0-9]*$/,
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
          pattern: new RegExp(`^${currentUser.customMaDinhDanh}$`),
          message:
            'Mã số doanh nghiệp không giống với mã số doanh nghiệp của bạn',
        },
      ],
    },
  ];

  // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
  //   errorInfo,
  // ) => {
  //   message.error(`Failed: ${errorInfo}`);
  // };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{
        id: currentUser.customMaDinhDanh,
        fullName: currentUser.Title,
        dob: formatNgayThangNamSinh(currentUser.NgayThangNamSinh),
      }}
      onFinish={async (values) => {
        if (onFinish) {
          setLoading(true);
          onFinish(values)
            .catch(() => {
              message.error('Đã có lỗi xảy ra');
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="frmGetOrganizationInfoRequest"
      {...FORM_CONFIG}
    >
      {isPerson
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
                disabledDate={disabledDatedFromCurrentDay}
              />
            ) : (
              <Input placeholder={item.placeholder} />
            )}
          </Form.Item>
        )) : null}
      {
          isOrganization ? (
            configOrganization.map((item) => (
              <Form.Item
                label={item.label}
                labelAlign="left"
                name={item.name}
                rules={item.rules}
              >
                <Input />
              </Form.Item>
            ))
          ) : null
        }
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

export default FormRequestCSDL;
