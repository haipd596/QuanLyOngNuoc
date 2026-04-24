import DatePickerMask from "@packages/components/DatePickerMask";
import useValidate from "@packages/hooks/useValidate";
import { Col, Form, Input, Radio, Row } from "antd";
import dayjs from "dayjs";

// ─── NDD Việt Nam ─────────────────────────────────────────────────────────────
function NddVietNam({ index }: { index: number }) {
  const { RULE_REQUIRED, RULE_EMAIL, RULES_256_NO_HTML, RULE_FAX, RULE_PHONE, RULE_CCCD } = useValidate();
  return (
    <>
      <Col span={12}>
        <Form.Item
          name={[index, "HoTenNDD"]}
          label="Họ tên"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập họ tên người đại diện" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[index, "NgaySinhNDD"]}
          label="Ngày sinh"
          rules={[...RULE_REQUIRED]}
          getValueProps={(value) => ({ value: value ? dayjs(value, 'DD/MM/YYYY') : undefined })}
          getValueFromEvent={(date) => date ? date.format('DD/MM/YYYY') : null}
        >
          <DatePickerMask format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="DD/MM/YYYY" disabledDate={(current) => current.isAfter(dayjs(), 'day')} />
        </Form.Item>
      </Col>

      <Col span={16}>
        <Form.Item
          name={[index, "SoDinhDanhNDD"]}
          label="Số định danh cá nhân/Căn cước công dân"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML, ...RULE_CCCD]}
        >
          <Input placeholder="Nhập số định danh / CCCD" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "QuocTichNDD"]}
          label="Quốc tịch"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập quốc tịch" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "ChoOHienTaiNDD"]}
          label="Chỗ ở hiện tại"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập chỗ ở hiện tại" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "SoDienThoaiNDD"]}
          label="Điện thoại"
          rules={[...RULE_REQUIRED, ...RULE_PHONE]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "FaxNDD"]}
          label="Fax"
          rules={[...RULE_FAX]}
        >
          <Input placeholder="Nhập số Fax" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "EmailNDD"]}
          label="Email"
          rules={[...RULE_EMAIL]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
      </Col>
    </>
  );
}

// ─── NDD Nước ngoài ───────────────────────────────────────────────────────────
function NddNuocNgoai({ index }: { index: number }) {
  const { RULE_REQUIRED, RULE_EMAIL, RULES_256_NO_HTML, RULE_FAX, RULE_PHONE } = useValidate();
  return (
    <>
      <Col span={12}>
        <Form.Item
          name={[index, "HoTenNDD"]}
          label="Họ tên"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập họ tên người đại diện" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[index, "NgaySinhNDD"]}
          label="Ngày sinh"
          rules={[...RULE_REQUIRED]}
          getValueProps={(value) => ({ value: value ? dayjs(value, 'DD/MM/YYYY') : undefined })}
          getValueFromEvent={(date) => date ? date.format('DD/MM/YYYY') : null}
        >
          <DatePickerMask format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="DD/MM/YYYY" disabledDate={(current) => current.isAfter(dayjs(), 'day')} />
        </Form.Item>
      </Col>

      <Col span={16}>
        <Form.Item
          name={[index, "SoHoChieuNDD"]}
          label="Số Hộ chiếu"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập số hộ chiếu" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "QuocTichNDD"]}
          label="Quốc tịch"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập quốc tịch" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "ChoOHienTaiNDD"]}
          label="Chỗ ở hiện tại"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập chỗ ở hiện tại" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "SoDienThoaiNDD"]}
          label="Điện thoại"
          rules={[...RULE_REQUIRED, ...RULE_PHONE]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "FaxNDD"]}
          label="Fax"
          rules={[...RULE_FAX]}
        >
          <Input placeholder="Nhập số Fax" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "EmailNDD"]}
          label="Email"
          rules={[...RULE_EMAIL]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
      </Col>
    </>
  );
}

// ─── Org (main) ───────────────────────────────────────────────────────────────
export default function Org({
  index,
  curServerKey,
  fieldName,
}: {
  index: number;
  curServerKey: string;
  fieldName: number;
}) {
  const {
    RULE_REQUIRED,
    RULE_EMAIL,
    RULES_256_NO_HTML,
    RULE_FAX,
    RULE_PHONE,
    RULE_TAX_CODE,
    RULE_WEBSITE,
  } = useValidate();

  return (
    <Row gutter={[16, 0]}>
      {/* ========== THÔNG TIN TỔ CHỨC ========== */}
      <Col span={24}>
        <Form.Item
          name={[index, "TenNhaDauTu"]}
          label="Tên nhà đầu tư/tổ chức kinh tế thực hiện dự án"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập tên nhà đầu tư" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "SoGiayTo"]}
          label="Số giấy tờ (tài liệu về tư cách pháp lý)"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập số giấy tờ" />
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
          <DatePickerMask format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="DD/MM/YYYY" disabledDate={(current) => current.isAfter(dayjs(), 'day')} />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "CoQuanCap"]}
          label="Cơ quan cấp"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập cơ quan cấp" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "DiaChiTruSo"]}
          label="Địa chỉ trụ sở"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập địa chỉ trụ sở" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "MaSoThue"]}
          label="Mã số thuế (tại Việt Nam - nếu có)"
          rules={[...RULE_TAX_CODE]}
        >
          <Input placeholder="Nhập mã số thuế" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "SoDienThoai"]}
          label="Điện thoại"
          rules={[...RULE_REQUIRED, ...RULE_PHONE]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[index, "Fax"]}
          label="Fax"
          rules={[...RULE_FAX]}
        >
          <Input placeholder="Nhập số Fax" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[index, "Email"]}
          label="Email"
          rules={[...RULE_EMAIL]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[index, "Website"]}
          label="Website (nếu có)"
          rules={[...RULE_WEBSITE]}
        >
          <Input placeholder="https://example.com" />
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

      {/* ========== THÔNG TIN NGƯỜI ĐẠI DIỆN ========== */}
      <Col span={24}>
        <div style={{ fontWeight: 700, marginBottom: 8, marginTop: 8, fontSize: 14 }}>
          Thông tin về người đại diện theo pháp luật của doanh nghiệp/tổ chức kinh tế thực hiện dự án
        </div>
      </Col>

      {/* Radio chọn loại NDD — dùng shouldUpdate để switch form */}
      <Col span={24}>
        <Form.Item
          name={[index, "LoaiNDD"]}
          label="Đối với người đại diện theo pháp luật là"
          initialValue="VietNam"
          rules={[...RULE_REQUIRED]}
        >
          <Radio.Group>
            <Radio value="VietNam">Người Việt Nam</Radio>
            <Radio value="NuocNgoai">Người nước ngoài</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>

      {/* shouldUpdate chỉ re-render khi LoaiNDD thay đổi */}
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) =>
          prevValues[curServerKey]?.[fieldName]?.LoaiNDD !==
          curValues[curServerKey]?.[fieldName]?.LoaiNDD
        }
      >
        {(formInstance) => {
          const loaiNDD = formInstance.getFieldValue([curServerKey, fieldName, 'LoaiNDD']) || 'VietNam';
          return (
            <>
              {loaiNDD === 'VietNam' && <NddVietNam index={index} />}
              {loaiNDD === 'NuocNgoai' && <NddNuocNgoai index={index} />}
            </>
          );
        }}
      </Form.Item>
    </Row>
  );
}

