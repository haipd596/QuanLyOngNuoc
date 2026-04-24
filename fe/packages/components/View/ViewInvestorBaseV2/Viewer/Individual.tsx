import DatePickerMask from "@packages/components/DatePickerMask";
import { useValidate } from "@packages/hooks/useValidate";
import { Col, Form, Input, Radio, Row, Typography } from "antd";
import dayjs from "dayjs";

type TProps = {
  index: number;
};

const DATE_FORMAT = "DD/MM/YYYY";

const Individual = ({ index }: TProps) => {
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
          Đối với nhà đầu tư là cá nhân:
        </Typography.Title>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[index, "HoTen"]}
          label="Họ tên"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[index, "GioiTinh"]}
          label="Giới tính"
          rules={RULE_REQUIRED}
        >
          <Radio.Group>
            <Radio value="Nam">Nam</Radio>
            <Radio value="Nữ">Nữ</Radio>
            <Radio value="Khác">Khác</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[index, "NgaySinh"]}
          label="Ngày sinh"
          rules={RULE_REQUIRED}
          getValueProps={(value) => ({
            value: value ? dayjs(value, DATE_FORMAT) : undefined,
          })}
          getValueFromEvent={(date) => (date ? date.format(DATE_FORMAT) : null)}
        >
          <DatePickerMask
            disabledDate={(current) => current.isAfter(dayjs(), "day")}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[index, "QuocTich"]}
          label="Quốc tịch"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập quốc tịch" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "TaiLieuTuCachPhapLyCaNhan"]}
          label="(Tài liệu về tư cách pháp lý của cá nhân)"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập tên tài liệu pháp lý của cá nhân" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "SoGiayToPhapLy"]}
          label="Số"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập số giấy tờ" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "NgayCapGiayToPhapLy"]}
          label="Ngày cấp"
          rules={RULE_REQUIRED}
          getValueProps={(value) => ({
            value: value ? dayjs(value, DATE_FORMAT) : undefined,
          })}
          getValueFromEvent={(date) => (date ? date.format(DATE_FORMAT) : null)}
        >
          <DatePickerMask
            disabledDate={(current) => current.isAfter(dayjs(), "day")}
          />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "NoiCapGiayToPhapLy"]}
          label="Nơi cấp"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập nơi cấp" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "DiaChiThuongTru"]}
          label="Địa chỉ thường trú"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập địa chỉ thường trú" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "ChoOHienTai"]}
          label="Chỗ ở hiện tại"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập chỗ ở hiện tại" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "MaSoThue"]}
          label="Mã số thuế (tại Việt Nam - nếu có)"
          rules={RULE_TAX_CODE}
        >
          <Input placeholder="Nhập mã số thuế (nếu có)" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "DienThoai"]}
          label="Điện thoại"
          rules={[...RULE_REQUIRED, ...RULE_PHONE]}
        >
          <Input placeholder="Nhập điện thoại" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item name={[index, "Fax"]} label="Fax" rules={RULE_FAX}>
          <Input placeholder="Nhập fax" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item name={[index, "Email"]} label="Email" rules={RULE_EMAIL}>
          <Input placeholder="Nhập email" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Individual;
