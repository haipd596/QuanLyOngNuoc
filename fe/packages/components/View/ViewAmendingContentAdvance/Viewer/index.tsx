import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import { fetchNgoaiTe } from "@packages/components/View/ViewAmendingContentAdvance/service/api";
import { NgoaiTe } from "@packages/components/View/ViewAmendingContentAdvance/service/type";
import Table2 from "@packages/components/View/ViewAmendingContentAdvance/Viewer/Table2";
import Table3 from "@packages/components/View/ViewAmendingContentAdvance/Viewer/Table3";
import { useValidate } from "@packages/hooks/useValidate";
import type { InputNumberProps } from "antd";
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import _get from "lodash/get";
import { useEffect, useState } from "react";
import { useAppSelector } from "~/redux/hooks";
import { selectActiveSchema } from "~/redux/slices/FormSlice";
import TransformTableData from "./TransformTableData";
import { TAsyncViewAmendingContentProps } from "./type";

const toIndexLabel = (i: number): string => {
  let label = "";
  let n = i;
  do {
    label = String.fromCharCode(97 + (n % 26)) + label;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return label;
};

const ViewerInvestor: React.FC<TAsyncViewAmendingContentProps> = (props) => {
  const { fieldKey, onChange, value } = props;

  const { RULE_REQUIRED, RULE_NO_HTML, RULES_256_NO_HTML } = useValidate();

  const form = useFormInstance();
  const schema = useAppSelector(selectActiveSchema);
  const curField = schema?.fields?.find((item: any) => item?.key === fieldKey);
  const _curServerKey = _get(
    curField,
    "formItemPropsAllowConfig.serverPayloadKey.props.defaultValue",
    "",
  );
  const [listNgoaiTe, setListNgoaiTe] = useState<NgoaiTe[]>([]);

  useEffect(() => {
    if (!value) {
      onChange([
        {
          NoiDungDaQuyDinh: "",
          NoiDungDieuChinh: "",
          LyDoDieuChinh: "",
          LoaiNgoaiTe: "VND",
        },
      ]);
    }
  }, [value, onChange]);

  useEffect(() => {
    fetchNgoaiTe()
      .then((data: any) => {
        setListNgoaiTe(data); // data JSON từ API
      })
      .catch((_: any) => {});
  }, []);

  const formatter: InputNumberProps<number>["formatter"] = (value) => {
    const [start, end] = `${value}`.split(".") || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${end ? `${v}.${end}` : `${v}`}`;
  };

  return (
    <Form.List name={_curServerKey}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider />
                <Row>
                  <Flex
                    align="center"
                    justify="space-between"
                    style={{ width: "100%", marginBottom: 10 }}
                  >
                    <div
                      style={{
                        flex: 1,
                        fontWeight: 600,
                        textAlign: "center",
                        marginTop: -10,
                      }}
                    >
                      {`Nội dung điều chỉnh ${index + 1}`}
                    </div>
                    <div style={{ marginTop: -16 }}>
                      {fields.length > 1 ? (
                        <Button
                          type="primary"
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          icon={
                            <DeleteOutlined
                              style={{ color: "white", fontSize: 18 }}
                            />
                          }
                          style={{ backgroundColor: "var(--error)" }}
                        />
                      ) : null}
                    </div>
                  </Flex>
                </Row>

                <Form.Item
                  name={[index, "index"]}
                  initialValue={index + 1}
                  hidden
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[index, "indexLabel"]}
                  initialValue={toIndexLabel(index)}
                  hidden
                >
                  <Input />
                </Form.Item>

                <Row gutter={[16, 0]}>
                  <Col span={24}>
                    <Form.Item
                      name={[index, "NoiDungDaQuyDinh"]}
                      label="Nội dung đã quy định"
                      rules={[...RULE_REQUIRED, ...RULE_NO_HTML]}
                    >
                      <Input.TextArea placeholder="Nội dung đã quy định tại Giấy chứng nhận đầu tư/Giấy phép đầu tư" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name={[index, "NoiDungDieuChinh"]}
                      label="Nội dung điều chỉnh"
                      rules={[...RULE_REQUIRED, ...RULE_NO_HTML]}
                    >
                      <Input.TextArea placeholder="Nội dung đề nghị điều chỉnh" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name={[index, "LyDoDieuChinh"]}
                      label="Lý do điều chỉnh"
                      rules={[...RULE_REQUIRED, ...RULE_NO_HTML]}
                    >
                      <Input.TextArea placeholder="Lý do điều chỉnh" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={[index, "TaiLieuDinhKem"]}
                      label="Tài liệu chứng minh đính kèm"
                      rules={RULE_NO_HTML}
                    >
                      <Input.TextArea placeholder="Tài liệu chứng minh đính kèm (nếu có)" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[index, "TongVonDauTu"]}
                      label="Tổng vốn đầu tư ra nước ngoài"
                      rules={[...RULE_REQUIRED]}
                    >
                      <InputNumber<number>
                        // defaultValue={1000}
                        formatter={formatter}
                        parser={(value) =>
                          value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                        }
                        // onChange={onChangeVal}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[index, "LoaiNgoaiTe"]}
                      label="Loại ngoại tệ đầu tư"
                    >
                      <Select
                        options={listNgoaiTe.map((item) => ({
                          label: item.ma,
                          value: item.ma,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[index, "TuongDuongVND"]}
                      label="Tương đương VNĐ"
                      rules={[...RULE_REQUIRED]}
                    >
                      <InputNumber<number>
                        // defaultValue={1000}
                        formatter={formatter}
                        parser={(value) =>
                          value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                        }
                        // onChange={onChangeVal}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[index, "TuongDuongUSD"]}
                      label="Tương đương USD"
                      rules={[...RULE_REQUIRED]}
                    >
                      <InputNumber<number>
                        // defaultValue={1000}
                        formatter={formatter}
                        parser={(value) =>
                          value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                        }
                        // onChange={onChangeVal}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <span style={{ fontWeight: 600 }}>
                      (i) Hình thức của phần vốn đầu tư ra nước ngoài tăng thêm
                    </span>
                  </Col>

                  <Col span={24} style={{ marginTop: 10 }}>
                    <FormItem name={[index, "HinhThucVon"]}>
                      <TransformTableData
                        name={[
                          _curServerKey,
                          index,
                          "HinhThucVonSpecialHidden",
                        ]}
                      >
                        <Table2
                          loaiNgoaiTe={form.getFieldValue([
                            _curServerKey,
                            index,
                            "LoaiNgoaiTe",
                          ])}
                        />
                      </TransformTableData>
                    </FormItem>
                  </Col>

                  <Col span={24} style={{ marginBottom: 10 }}>
                    <span style={{ fontWeight: 600 }}>
                      (ii) Nguồn vốn đầu tư ra nước ngoài tăng thêm
                    </span>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={[index, "VonChuSoHuu"]}
                      label="Vốn chủ sở hữu"
                      rules={[...RULE_REQUIRED]}
                    >
                      <InputNumber<number>
                        formatter={formatter}
                        parser={(value) =>
                          value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[index, "VonVayTaiVnVND"]}
                      label="Vốn vay tại Việt Nam"
                      rules={[...RULE_REQUIRED]}
                    >
                      <InputNumber<number>
                        formatter={formatter}
                        parser={(value) =>
                          value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[index, "VonVayTaiVnUSD"]}
                      label="Tương đương USD"
                      rules={[...RULE_REQUIRED]}
                    >
                      <InputNumber<number>
                        formatter={formatter}
                        parser={(value) =>
                          value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[index, "ToChucTinDung"]}
                      label="Tổ chức tín dụng"
                      rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
                    >
                      <Input placeholder="Tổ chức tín dụng/Tổ chức/Cá nhân cho vay" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[index, "LoiNhauDauTu"]}
                      label="Lợi nhuận đầu tư"
                      rules={[...RULES_256_NO_HTML]}
                    >
                      <Input placeholder="Lợi nhuận đầu tư từ dự án đầu tư ra nước ngoài giữ lại để tái đầu tư" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name={[index, "TenNhaDauTu"]}
                      label="Tên nhà đầu tư"
                      rules={[...RULES_256_NO_HTML]}
                    >
                      <Input placeholder="Nhà đầu tư cam kết về tính hợp pháp của nguồn vốn đầu tư ra nước ngoài và cam kết tự chịu trách nhiệm về hiệu quả của dự án" />
                    </Form.Item>
                  </Col>

                  <Col span={24} style={{ marginBottom: 10 }}>
                    <span style={{ fontWeight: 600 }}>
                      (iii) Nhu cầu sử dụng vốn đầu tư ra nước ngoài tăng thêm
                    </span>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={[index, "VonCoDinh"]}
                      label="Vốn cố định"
                      rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
                    >
                      <Input placeholder="Vốn cố định" />
                    </Form.Item>
                  </Col>
                  <Form.List name={[field?.name, "HangMucVonCoDinh"]}>
                    {(subFields, { add, remove }) => {
                      return (
                        <>
                          <Flex style={{ marginBottom: 10, width: "100%" }}>
                            <div
                              style={{
                                fontWeight: 500,
                                marginLeft: 8,
                                flex: 1,
                              }}
                            >
                              Danh sách hạng mục vốn cố định
                            </div>
                            <Button
                              type="primary"
                              onClick={() => add()}
                              style={{ marginRight: 8 }}
                            >
                              + Thêm hạng mục
                            </Button>
                          </Flex>
                          {subFields.map((subField) => (
                            <Flex
                              key={`subFieldCD-${subField.key}`}
                              align="center"
                              justify="space-between"
                              style={{ width: "100%" }}
                            >
                              <div
                                key={`subFieldCD-${subField.key}`}
                                style={{ flex: 1, marginRight: 10 }}
                              >
                                <Row
                                  gutter={[16, 0]}
                                  style={{ paddingLeft: 8 }}
                                >
                                  <Col span={12}>
                                    <Form.Item
                                      {...subField}
                                      name={[subField.name, "TenHangMuc"]}
                                      label="Tên hạng mục"
                                      rules={[...RULES_256_NO_HTML]}
                                    >
                                      <Input />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12} style={{ display: "flex" }}>
                                    <Form.Item
                                      {...subField}
                                      name={[subField.name, "SoVon"]}
                                      label="Số vốn của hạng mục"
                                      style={{ flex: 1 }}
                                    >
                                      <InputNumber
                                        min={0}
                                        formatter={formatter}
                                        parser={(value) =>
                                          value?.replace(
                                            /\$\s?|(,*)/g,
                                            "",
                                          ) as unknown as number
                                        }
                                      />
                                    </Form.Item>
                                    <Button
                                      type="primary"
                                      className="dynamic-delete-button"
                                      onClick={() => remove(field.name)}
                                      icon={
                                        <DeleteOutlined
                                          style={{
                                            color: "white",
                                            fontSize: 18,
                                          }}
                                        />
                                      }
                                      style={{
                                        backgroundColor: "var(--error)",
                                        marginLeft: 10,
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </Flex>
                          ))}
                        </>
                      );
                    }}
                  </Form.List>

                  <Col span={24}>
                    <Form.Item
                      name={[index, "VonLuuDong"]}
                      label="Vốn lưu động"
                      rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
                    >
                      <Input placeholder="Vốn lưu động" />
                    </Form.Item>
                  </Col>

                  <Col span={24} style={{ marginBottom: 10 }}>
                    <span style={{ fontWeight: 600 }}>
                      (iv) Vốn cho tổ chức kinh tế ở nước ngoài vay/hoặc vảo
                      lãnh cho tổ chức kinh tế tại nước ngoài vay
                    </span>
                  </Col>
                  <Col span={24} style={{ marginTop: 10 }}>
                    <FormItem name={[index, "VonChoVay"]}>
                      <TransformTableData
                        name={[_curServerKey, index, "VonChoVaySpecialHidden"]}
                      >
                        <Table3
                          loaiNgoaiTe={form.getFieldValue([
                            _curServerKey,
                            index,
                            "LoaiNgoaiTe",
                          ])}
                        />
                      </TransformTableData>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                type="primary"
                onClick={() =>
                  add({
                    NoiDungDaQuyDinh: "",
                    NoiDungHieuDinh: "",
                    LyDoHieuDinh: "",
                    LoaiNgoaiTe: "VND",
                  })
                }
                style={{ width: 200 }}
              >
                <PlusOutlined /> Thêm nội dung hiệu đính
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};
export default ViewerInvestor;
