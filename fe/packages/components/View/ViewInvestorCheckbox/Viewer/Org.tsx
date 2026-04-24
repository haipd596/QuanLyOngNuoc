import { DeleteOutlined } from '@ant-design/icons';
import useValidate from '@packages/hooks/useValidate';
import { Button, Checkbox, Col, DatePicker, Flex, Form, Input, InputNumber, Row, Select, Space } from "antd";
import dayjs from "dayjs";
import { useWatch } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
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
    RULE_WEBSITE,
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
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="DD/MM/YYYY" />
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
          name={[index, "Website"]} 
          label="Website"
          rules={[ ...RULE_WEBSITE ]}
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
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="DD/MM/YYYY" />
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
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML ]}
        >
          <Input placeholder="Nhập quốc tịch"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="CCCD/Hộ chiếu"
          name={[index, "GiayToPhapLyNDD"]}
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML, ...RULE_CCCD_OR_PASSPORT ]}
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
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="DD/MM/YYYY" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "NoiCapGTNDD"]} 
          label="Nơi cấp"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML ]}
        >
          <Input placeholder="Nhập nơi cấp"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "SoDienThoaiNDD"]} 
          label="Số điện thoại"
          rules={[...RULE_REQUIRED, ...RULE_PHONE ]}
        >
          <Input placeholder="Nhập mã số điện thoại người đại diện"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "FaxNDD"]} 
          label="Fax"
          rules={[ ...RULE_FAX ]}
        >
          <Input placeholder="Nhập số Fax"/>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item 
          name={[index, "EmailNDD"]} 
          label="Email"
          rules={[ ...RULE_EMAIL ]}
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
          rules={[...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập địa chỉ thường trú người đại diện"/>
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
                  
                  <Form.List name={[name, 'LoaiToChuc', 'DsCoDongNhaNuoc']}>
                  {(subFields, { add, remove }) => (
                    <>
                      <Flex style={{marginBottom: 10}}>
                        <div style={{ fontWeight: 600,  marginLeft: 8, flex: 1  }}>
                          Danh sách cổ đông nhà nước (nếu có)
                        </div>
                        <Button type="primary" onClick={() => add()} style={{marginRight: 8}}>
                          + Thêm cổ đông nhà nước
                        </Button>
                      </Flex>
                      
                      {subFields.map((subField) => (
                        <Flex  
                          key={`subFieldCD-${subField.key}`} 
                          align="center" 
                          justify="space-between" 
                          style={{width: '100%'}}
                        >
                          <div key={`subFieldCD-${subField.key}`} style={{flex: 1, marginRight: 10 }}>
                            <Row gutter={[16, 0]} style={{paddingLeft: 8}}>
                              <Col span={12}>
                                <Form.Item
                                  {...subField}
                                  name={[subField.name, 'TenCoDong']}
                                  label="Tên cổ đông"
                                  rules={[...RULES_256_NO_HTML]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={12} style={{display: 'flex'}}>
                                <Form.Item
                                  {...subField}
                                  name={[subField.name, 'TyLeGopVon']}
                                  label="Tỉ lệ % góp vốn"
                                  style={{flex: 1}}
                                >
                                  <InputNumber min={0} max={100} />
                                </Form.Item>
                                <Button
                                  type="primary"
                                  className="dynamic-delete-button"
                                  onClick={() => remove(field.name)}
                                  icon={<DeleteOutlined style={{color: 'white', fontSize: 18}}/>}
                                  style={{backgroundColor: 'var(--error)', marginLeft: 10}}
                                />
                              </Col>
                            </Row>
                          </div>
                        </Flex>
                      ))}
                    </>
                  )}
                </Form.List>
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