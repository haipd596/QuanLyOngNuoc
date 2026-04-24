import DatePickerMask from '@packages/components/DatePickerMask';
import { useValidate } from '@packages/hooks/useValidate';
import { Col, Form, Input, Row, Typography } from 'antd';
import dayjs from 'dayjs';

type TProps = {
  index: number;
};

const DATE_FORMAT = 'DD/MM/YYYY';

const Org = ({ index }: TProps) => {
  const {
    RULE_REQUIRED,
    RULE_EMAIL,
    RULES_256_NO_HTML,
    RULE_FAX,
    RULE_PHONE,
    RULE_TAX_CODE,
  } = useValidate();

  return (
    <Row gutter={[16, 0]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ marginBottom: 16 }}>
          Đối với nhà đầu tư là doanh nghiệp/tổ chức:
        </Typography.Title>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, 'TenDoanhNghiepToChuc']}
          label="Tên doanh nghiệp/tổ chức"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập tên doanh nghiệp/tổ chức" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, 'TaiLieuTuCachPhapLyToChuc']}
          label="(Tài liệu về tư cách pháp lý của tổ chức)"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập tên tài liệu pháp lý của tổ chức" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, 'SoGiayToPhapLyToChuc']}
          label="Số"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập số giấy tờ" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, 'NgayCapGiayToPhapLyToChuc']}
          label="Ngày cấp"
          rules={RULE_REQUIRED}
          getValueProps={(value) => ({ value: value ? dayjs(value, DATE_FORMAT) : undefined })}
          getValueFromEvent={(date) => (date ? date.format(DATE_FORMAT) : null)}
        >
          <DatePickerMask disabledDate={(current) => current.isAfter(dayjs(), 'day')} />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, 'CoQuanCap']}
          label="Cơ quan cấp"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập cơ quan cấp" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, 'DiaChiTruSo']}
          label="Địa chỉ trụ sở"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập địa chỉ trụ sở" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, 'MaSoThue']}
          label="Mã số thuế (tại Việt Nam - nếu có)"
          rules={RULE_TAX_CODE}
        >
          <Input placeholder="Nhập mã số thuế (nếu có)" />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name={[index, 'DienThoai']}
          label="Điện thoại"
          rules={[...RULE_REQUIRED, ...RULE_PHONE]}
        >
          <Input placeholder="Nhập điện thoại" />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name={[index, 'Fax']}
          label="Fax"
          rules={RULE_FAX}
        >
          <Input placeholder="Nhập fax" />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name={[index, 'Email']}
          label="Email"
          rules={RULE_EMAIL}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name={[index, 'Website']}
          label="Website (nếu có)"
          rules={RULES_256_NO_HTML}
        >
          <Input placeholder="Nhập website" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, 'DiaChiVanPhongDaiDienTaiVietNam']}
          label="Địa chỉ văn phòng đại diện tại Việt Nam (nếu có)"
          rules={RULES_256_NO_HTML}
        >
          <Input placeholder="Nhập địa chỉ văn phòng đại diện tại Việt Nam" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Org;
