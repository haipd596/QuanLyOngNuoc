import { useValidate } from "@packages/hooks/useValidate";
import DatePickerMask from "@packages/components/DatePickerMask";
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select } from "antd";
import dayjs from "dayjs";

export default function Org({field, index}:any) {
  const { 
    RULE_REQUIRED, 
    RULE_EMAIL, 
    RULE_WEBSITE, 
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
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML]}
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
          rules={[...RULE_TAX_CODE]}
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
          rules={[...RULE_FAX]}
        >
          <Input placeholder="Nhập số Fax"/>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item 
          name={[index, "Email"]} 
          label="Email"
          rules={[ ...RULE_EMAIL]}
        >
          <Input placeholder="Nhập email"/>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item 
          name={[index, "DiaChi"]} 
          label="Địa chỉ trụ sở"
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML]}
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

      <Form.List name={[field.name, 'tyLeGopVon']}>
        {(subFields, { add: addSub, remove: removeSub }) => (
          <>
            <Col span={24}>
              <Flex align="center" justify="space-between" style={{width: '100%'}}>
                <h4>Tỷ lệ góp vốn điều lệ của nhà đầu tư nước ngoài</h4>
                <Button
                  type="primary"
                  onClick={() => addSub()}
                >
                  + Thêm tỷ lệ
                </Button>
              </Flex>
            </Col>
            
                {subFields.map((subField, subIndex) => (
                  <Flex  
                    key={`subField-${subIndex}`} 
                    align="center" 
                    justify="space-between" 
                    style={{
                      width: '100%', 
                      paddingRight: 8, 
                      borderBottomColor: '#CCC', 
                      borderBottomWidth: 1, 
                      borderBottomStyle: "solid",
                      marginBottom: 16,
                      marginLeft: 10
                    }}
                  >
                    {/* <Col span={23}> */}
                      <div key={`subField-${subIndex}`} style={{ marginBottom: 8, flex: 1, marginRight: 10 }}>
                        <Row gutter={[16, 0]}>
                          <Col span={12}>
                            <Form.Item 
                              {...subField} 
                              label="Tên nhà đầu tư"
                              name={[subField.name, 'TenNDT']}
                              rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
                            >
                              <Input placeholder="Tên nhà đầu tư nước ngoài" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item 
                              {...subField} 
                              label="Quốc tịch"
                              name={[subField.name, 'QuocTich']}
                              rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
                            >
                              <Input placeholder="Quốc tịch" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item 
                              {...subField} 
                              label="VNĐ"
                              name={[subField.name, 'Vnd']}
                              rules={[...RULE_REQUIRED]}
                            >
                              <InputNumber placeholder="Số vốn góp VNĐ" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item 
                              {...subField} 
                              label="Tương đương USD"
                              name={[subField.name, 'Usd']}
                              rules={[...RULE_REQUIRED]}
                            >
                              <InputNumber placeholder="Só vốn góp tương đương USD" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item 
                              {...subField} 
                              label="Tỷ lệ"
                              name={[subField.name, 'TyLe']}
                              rules={[...RULE_REQUIRED]}
                            >
                              <InputNumber placeholder="%" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    {/* </Col> */}
                    <Button
                      danger
                      onClick={() => removeSub(subField.name)}
                    >
                      Xóa
                    </Button>
                  </Flex>
                ))}
          </>
        )}
      </Form.List>

      <Col span={24}>
          <h4>Thông tin người đại diện</h4>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "NguoiDaiDien"]}
          label="Họ tên người đại diện"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập họ tên người đại diện" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "ChucDanhNDD"]}
          label="Chức danh"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
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
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập quốc tịch"/>
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
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
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
          rules={[...RULE_FAX]}
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
          rules={[...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập địa chỉ thường trú người đại diện"/>
        </Form.Item>
      </Col>
    </Row>
  )
} 