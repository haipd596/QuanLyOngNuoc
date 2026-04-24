import Loading from '@packages/components/Loading';
import { FORM_CONFIG } from '@packages/constants/commons';
import { apiGetProviderCert } from '@packages/dvc-service/apiGetProviderCert';
import {
  Button,
  Flex,
  Form,
  Input, Select,
} from 'antd';
import { useEffect, useState } from 'react';

export type TGetCertProps = {
  onFinish: (values: any) => void,
  onClose: () => void
};

const GetCert = ({ onFinish, onClose }: TGetCertProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [providerOptions, setProviderOptions] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    apiGetProviderCert().then((data) => {
      setProviderOptions(
        data.map(({ Name, Description }: any) => ({ label: Description, value: Name })),
      );
      setIsLoading(false);
    });
  }, []);

  return (
    <Loading isLoading={isLoading}>
      <Form
        {...FORM_CONFIG}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="provider"
          label="Nhà cung cấp CA"
          rules={[{
            required: true,
            message: 'Chưa nhập dữ liệu',
          }]}
        >
          <Select options={providerOptions} />
        </Form.Item>
        <Form.Item
          name="userId"
          label="UserId (được cấp bởi nhà cung cấp CA)"
          rules={[{
            required: true,
            message: 'Chưa nhập dữ liệu',
          }]}
        >
          <Input />
        </Form.Item>
        <Flex justify="end" gap={8}>
          <Button onClick={onClose}>
            Đóng
          </Button>
          <Button type="primary" htmlType="submit">
            Lấy chứng thư số
          </Button>
        </Flex>
      </Form>
    </Loading>
  );
};

export default GetCert;
