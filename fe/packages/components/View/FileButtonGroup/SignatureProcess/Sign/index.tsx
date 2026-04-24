import PreviewPdf from '@packages/components/PreviewPdf';
import { FORM_CONFIG } from '@packages/constants/commons';
import { getBaseDvcViewPdf } from '@packages/dvc-service/getBaseUrl';
import {
  Button,
  Flex,
  Form, Select,
} from 'antd';
import { TGetCertProps } from '../GetCert';

type TSignProps = {
  serial_number: Array<any>,
  urlPreview: string
} & TGetCertProps;

const Sign = ({
  serial_number, onFinish, onClose, urlPreview,
}: TSignProps) => {
  const certificateOptions = serial_number?.map((value) => ({
    label: value,
    value,
  }));

  return (
    <Form
      {...FORM_CONFIG}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="serialNumber"
        label="Chọn chứng thư số"
        rules={[{
          required: true,
          message: 'Chưa nhập dữ liệu',
        }]}
      >
        <Select options={certificateOptions} />
      </Form.Item>
      {urlPreview && (
        <PreviewPdf url={`${getBaseDvcViewPdf()}${urlPreview}`} />
      )}
      <Flex justify="end" gap={8}>
        <Button onClick={onClose}>
          Đóng
        </Button>
        <Button type="primary" htmlType="submit">
          Ký số
        </Button>
      </Flex>
    </Form>
  );
};

export default Sign;
