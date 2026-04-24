import DatePickerMask from "@packages/components/DatePickerMask";
import { useValidate } from "@packages/hooks/useValidate";
import { Col, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";

export default function Individual({index}:any){
  const { 
    RULE_REQUIRED, 
    RULE_EMAIL, 
    RULES_256_NO_HTML,
    RULE_FAX,
    RULE_PHONE,
    RULE_TAX_CODE,
    RULE_CCCD_OR_PASSPORT
  } = useValidate();

  return (
    <Row gutter={[16, 0]}>
      <Col span={24}>
        <Form.Item
          name={[index, "TenNhaDauTu"]}
          label="Tên nhà đầu tư"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập tên nhà đầu tư" />
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
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập quốc tịch"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="CCCD/Hộ chiếu"
          name={[index, "GiayToPhapLy"]}
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML, ...RULE_CCCD_OR_PASSPORT]}
        >
          <Input placeholder="Nhập CCCD/Hộ chiếu"/>
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
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập nơi cấp"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Mã số thuế (Việt Nam)"
          name={[index, "MaSoThue"]}
          rules={[...RULE_TAX_CODE]}
        >
          <Input placeholder="Nhập mã số thuế"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "SoDienThoai"]} 
          label="Số điện thoại"
          rules={[...RULE_REQUIRED, ...RULE_PHONE]}
        >
          <Input placeholder="Nhập mã số điện thoại"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "Fax"]} 
          label="Fax"
          rules={[...RULE_FAX]}
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
          label="Nơi ở hiện tại"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập chỗ ở hiện tại"/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item 
          name={[index, "DiaChiThuongTru"]} 
          label="Địa chỉ thường trú"
          rules={[...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập địa chỉ thường trú"/>
        </Form.Item>
      </Col>
    </Row>
  )
}