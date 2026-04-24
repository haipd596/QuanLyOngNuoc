import DatePickerMask from "@packages/components/DatePickerMask";
import useValidate from '@packages/hooks/useValidate';
import { Checkbox, Col, Form, Input, InputNumber, Row, Space } from "antd";
import { useWatch } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import dayjs from "dayjs";
import { useEffect } from "react";

const CB_ARR = {
  CHECKBOX_1: 'DnNhaNuoc',
  CHECKBOX_2: 'VonNuocNgoai',
  CHECKBOX_3: 'ToChucKhac',
}

export default function Org({field, _curServerKey, index}:any) {
  const { name } = field;
  const form = useFormInstance();
  const valueRealValue = useWatch([_curServerKey, name, 'LoaiToChuc', 'checkboxArr'], form);

  const { 
    RULE_REQUIRED, 
    RULE_EMAIL, 
    RULES_256_NO_HTML,
    RULE_FAX,
    RULE_PHONE,
    RULE_TAX_CODE,
    RULE_CCCD_OR_PASSPORT
  } = useValidate();

  const checkboxName = [name, 'LoaiToChuc', 'checkboxArr'];
  const options = [
    { label: 'Doanh nghiệp Nhà nước/Doanh nghiệp có vốn nhà nước', value: 'DnNhaNuoc' },
    { label: 'Tổ chức kinh tế có vốn đầu tư nước ngoài', value: 'VonNuocNgoai' },
    { label: 'Tổ chức kinh tế khác', value: 'ToChucKhac' },
  ];

  const customizeOutput = (newSubstances: string[]) => {
    const output: Record<string, boolean> = {};
    Object.values(CB_ARR).forEach((fieldName) => {
      output[fieldName] = false;
    });

    newSubstances?.forEach((results) => {
      if (results in output) {
        output[results] = true;
      }
    });

    return output;
  };

  useEffect(() => {
    const updatedSubstances = form.getFieldValue([_curServerKey, name, 'LoaiToChuc', 'checkboxArr']);
    if(!updatedSubstances) return ;
    const customizedSubstances = customizeOutput(updatedSubstances);
    form.setFieldValue([_curServerKey, name, 'LoaiToChuc', 'checkbox'], customizedSubstances);
  }, [valueRealValue])

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
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML ]}
        >
          <Input placeholder="Nhập nơi cấp"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Mã số thuế (Việt Nam)"
          name={[index, "MaSoThue"]}
          rules={[ ...RULE_TAX_CODE ]}
        >
          <Input placeholder="Nhập mã số thuế"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "SoDienThoai"]} 
          label="Số điện thoại"
          rules={[ ...RULE_REQUIRED, ...RULE_PHONE ]}
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
          rules={[ ...RULE_EMAIL ]}
        >
          <Input placeholder="Nhập email"/>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item 
          name={[index, "DiaChi"]} 
          label="Địa chỉ trụ sở"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập địa chỉ trụ sở"/>
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
          label="CCCD/Hộ chiếu"
          name={[index, "GiayToPhapLyNDD"]}
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML, ...RULE_CCCD_OR_PASSPORT]}
        >
          <Input placeholder="Nhập CCCD/ Hộ chiếu"/>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          {...field}
          name={checkboxName}
        >
          <Checkbox.Group options={options} />
        </Form.Item>
        <FormItem name={[name, 'LoaiToChuc', 'checkbox']} hidden />
      </Col> 

      <Form.Item noStyle shouldUpdate>
        {(values:any) => {
          const selected: string[] = values.getFieldValue([_curServerKey, name, 'LoaiToChuc', 'checkboxArr']) || [];
          return (
            <Space direction="vertical" style={{ width: '100%' }}>
              {/* 1. Doanh nghiệp Nhà nước / có vốn nhà nước */}
              {selected.includes('DnNhaNuoc') && (
                <>
                  <div style={{ marginTop: 4, fontWeight: 600,  marginLeft: 8  }}>
                    Doanh nghiệp nhà nước/Doanh nghiệp có vốn nhà nước
                  </div>
                  <Row gutter={[16, 0]} style={{paddingRight: 8, paddingLeft: 8}}>
                    <Col span={12}>
                      <Form.Item
                        {...field}
                        name={[name, 'LoaiToChuc', 'TenCoQuanDaiDien']}
                        label="Tên cơ quan đại diện"
                        rules={[...RULES_256_NO_HTML]}
                      >
                        <Input placeholder="Tên cơ quan đại diện chủ sở hữu"/>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        {...field}
                        name={[name, 'LoaiToChuc', 'TiLeVonNhaNuoc']}
                        label="Tỉ lệ % vốn nhà nước"
                      >
                        <InputNumber placeholder="%" min={0} max={100} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              {/* 2. Tổ chức kinh tế có vốn nước ngoài */}
              {selected.includes('VonNuocNgoai') && (
                <>
                  <div style={{ fontWeight: 600, marginBottom: 4, marginLeft: 8 }}>
                    Tổ chức kinh tế có vốn đầu tư nước ngoài
                  </div>
                  <Col span={12}>
                    <Form.Item
                      {...field}
                      name={[name, 'LoaiToChuc', 'TiLeVonNuocNgoai']}
                      label="Tỉ lệ % vốn nước ngoài"
                    >
                      <InputNumber placeholder="%" min={0} max={100} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </>
              )}
            </Space>
          );
        }}
      </Form.Item>
    </Row>
  )
} 