import { SearchOutlined } from '@ant-design/icons';
import {
  Button, Col, DatePicker, Form, Input, message,
  Row,
} from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import dayjs from 'dayjs';
import { useState } from 'react';

export interface ViewButtonTraCuuProps {
  keyCode: string;
  keyDate: string;
  titleCode?: string;
  titleDate?: string;
  errorMessageCode?: string;
  errorMessageDate?: string;
}

const ViewButtonTraCuuGiayPhepViewer :React.FC<ViewButtonTraCuuProps> = ({
  keyCode,
  keyDate,
  titleCode,
  titleDate,
  errorMessageCode,
  errorMessageDate,
}) => {
  const [searchLoading, setSearchLoading] = useState(false);
  // const [form] = Form.useForm();
  const form = useFormInstance();

  const handleButtonTraCuuGiayPhep = async () => {
    try {
      setSearchLoading(true);
      const values = await form.validateFields([keyCode, keyDate]);

      const maGiayPhep = values[keyCode];
      const ngayCap = values[keyDate];
      const safeInput = maGiayPhep.replace(/'/g, "\\'");
      // const formattedNgayCap = ngayCap?.format('YYYY-MM-DD');
      const formattedNgayCap = dayjs.isDayjs(ngayCap)
        ? ngayCap.format('YYYY-MM-DD')
        : '';
      // eslint-disable-next-line no-eval
      eval(`callBackTraCuuGiayPhep('${safeInput}', '${formattedNgayCap}')`);
    } catch (err: any) {
      if (err?.errorFields) {
        message.warning('Vui lòng nhập đầy đủ mã tra cứu, ngày cấp!');
      } else {
        message.error('Tra cứu giấy phép không thành công. Vui lòng kiểm tra lại!');
        console.error(err);
      }
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <Row gutter={[16, 8]}>
      <Col span={12}>
        <Form.Item
          name={keyCode}
          label={titleCode}
          rules={[{ required: true, message: `${errorMessageCode}` }]}
          style={{ marginBottom: 0 }}
        >
          <Input
            placeholder="Nhập mã tra cứu số giấy phép"
          />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={keyDate}
          label={titleDate}
          rules={[{ required: true, message: `${errorMessageDate}` }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : null,
          })}
        >
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="Nhập ngày cấp"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>

      <Col span={4}>
        <Button
          icon={<SearchOutlined />}
          loading={searchLoading}
          onClick={handleButtonTraCuuGiayPhep}
          type="primary"
          style={{ width: '100%' }}
        >
          Tra cứu giấy phép
        </Button>
      </Col>
    </Row>
  );
};

export default ViewButtonTraCuuGiayPhepViewer;
