import DatePickerMask from "@packages/components/DatePickerMask";
import useValidate from "@packages/hooks/useValidate";
import { Col, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";

export default function Org({index}:any) {
  const { 
    RULE_REQUIRED, 
    RULE_EMAIL, 
    RULES_256_NO_HTML,
    RULE_FAX,
    RULE_PHONE,
    RULE_TAX_CODE,
    RULE_WEBSITE,
    RULE_CCCD_OR_PASSPORT
  } = useValidate();
  return (
    <Row gutter={[16, 0]}>
      <Col span={24}>
        <Form.Item
          name={[index, "TenNhaDauTu"]}
          label="Tên nhà đầu tư"
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML ]}
        >
          <Input placeholder="Nhập tên nhà đầu tư" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Số giấy tờ"
          name={[index, "GiayToPhapLy"]}
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập số giấy tờ pháp lý"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "NgayCap"]}
          label="Ngày cấp"
          rules={[...RULE_REQUIRED]}
          getValueProps={(value) => ({ value: value ? dayjs(value, 'DD/MM/YYYY') : undefined })}
          getValueFromEvent={(date) => date ? date.format('DD/MM/YYYY') : null}
        >
          <DatePickerMask disabledDate={(current) => current.isAfter(dayjs(), 'day')} />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "NoiCap"]} 
          label="Nơi cấp"
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập nơi cấp"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Mã số thuế (Việt Nam)"
          name={[index, "MaSoThue"]}
          rules={[ ...RULE_TAX_CODE]}
        >
          <Input placeholder="Nhập mã số thuế"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "SoDienThoai"]} 
          label="Số điện thoại"
          rules={[ ...RULE_REQUIRED, ...RULE_PHONE]}
        >
          <Input placeholder="Nhập mã số điện thoại"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "Fax"]} 
          label="Fax"
          rules={[ ...RULE_FAX ]}
        >
          <Input placeholder="Nhập số Fax"/>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item 
          name={[index, "Email"]} 
          label="Email"
          rules={[...RULE_EMAIL]}
        >
          <Input placeholder="Nhập email"/>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item 
          name={[index, "DiaChi"]} 
          label="Địa chỉ trụ sở"
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML ]}
        >
          <Input placeholder="Nhập địa chỉ trụ sở"/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item 
          name={[index, "Website"]} 
          label="Website"
          rules={[...RULE_WEBSITE]}
        >
          <Input placeholder="https://example.com"/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item 
          name={[index, "DiaChiGiaoDich"]} 
          label="Địa chỉ liên hệ/giao dịch"
          rules={[...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập địa chỉ"/>
        </Form.Item>
      </Col>

      <Col span={24}>
          <div style={{fontWeight: 800, marginBottom: 10}}>Thông tin người đại diện</div>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "NguoiDaiDien"]}
          label="Họ tên người đại diện"
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML ]}
        >
          <Input placeholder="Nhập họ tên người đại diện" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "ChucDanhNDD"]}
          label="Chức danh"
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML ]}
        >
          <Input placeholder="Nhập chức danh người đại diện" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Ngày sinh"
          name={[index, "NgaySinh"]}
          rules={[...RULE_REQUIRED]}
          getValueProps={(value) => ({ value: value ? dayjs(value, 'DD/MM/YYYY') : undefined })}
          getValueFromEvent={(date) => date ? date.format('DD/MM/YYYY') : null}
        >
          <DatePickerMask disabledDate={(current) => current.isAfter(dayjs(), 'day')} />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "GioiTinh"]}
          label="Giới tính"
          rules={[...RULE_REQUIRED]}
        >
          <Select placeholder="Chọn giới tính" options={[
            { label: 'Nam', value: 'Nam' },
            { label: 'Nữ', value: 'Nữ' },
          ]} />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "QuocTich"]} 
          label="Quốc tịch"
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập quốc tịch"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="CCCD/Hộ chiếu"
          name={[index, "GiayToPhapLyNDD"]}
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML, ...RULE_CCCD_OR_PASSPORT ]}
        >
          <Input placeholder="Nhập CCCD/ Hộ chiếu"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "NgayCapGTNDD"]}
          label="Ngày cấp"
          rules={[...RULE_REQUIRED]}
          getValueProps={(value) => ({ value: value ? dayjs(value, 'DD/MM/YYYY') : undefined })}
          getValueFromEvent={(date) => date ? date.format('DD/MM/YYYY') : null}
        >
          <DatePickerMask disabledDate={(current) => current.isAfter(dayjs(), 'day')} />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "NoiCapGTNDD"]} 
          label="Nơi cấp"
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập nơi cấp"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "SoDienThoaiNDD"]} 
          label="Số điện thoại"
          rules={[...RULE_REQUIRED, ...RULE_PHONE]}
        >
          <Input placeholder="Nhập mã số điện thoại người đại diện"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "FaxNDD"]} 
          label="Fax"
          rules={[ ...RULE_FAX]}
        >
          <Input placeholder="Nhập số Fax"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "EmailNDD"]} 
          label="Email"
          rules={[...RULE_EMAIL]}
        >
          <Input placeholder="Nhập email"/>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item 
          name={[index, "DiaChiNDD"]} 
          label="Địa chỉ"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập địa chỉ"/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item 
          name={[index, "DiaChiTTNDD"]} 
          label="Địa chỉ thường trú"
          rules={[ ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập địa chỉ thường trú người đại diện"/>
        </Form.Item>
      </Col>
    </Row>
  )
} 