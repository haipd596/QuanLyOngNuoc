import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useValidate } from '@packages/hooks/useValidate';
import { Button, Col, Divider, Form, Input, InputNumber, Row } from 'antd';
import _get from 'lodash/get';
import { useEffect, useMemo } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveSchema } from '~/redux/slices/FormSlice';
import { formatNumber, numberToVietnamese, parseNumber } from '../helper/convertIndexToText';
import { TAsyncViewContentProjectProps } from '../type';

const DEFAULT_PROJECT = {
  Index: 1,
  IndexText: numberToVietnamese(1),
  TenDuAn: '',
  MucTieu: '',
  TongVonDauTu: null,
  QuyMoDuAn: '',
  DiaDiem: '',
  TienDo: '',
  ThoiHanDuAn: '',
};

const ViewerContentProject: React.FC<TAsyncViewContentProjectProps> = (props) => {
  const {
    fieldKey,
    onChange,
    value,
  } = props;

  const schema = useAppSelector(selectActiveSchema);
  const {
    RULE_REQUIRED,
    RULE_NO_HTML,
    RULES_256_NO_HTML,
  } = useValidate();

  useEffect(() => {
    if (!Array.isArray(value) || value.length === 0) {
      onChange([{ ...DEFAULT_PROJECT }]);
      return;
    }

    const normalizedValue = value.map((item: typeof DEFAULT_PROJECT, index: number) => ({
      ...item,
      Index: index + 1,
      IndexText: numberToVietnamese(index + 1),
    }));

    const isChanged = normalizedValue.some((item, index) => (
      item.Index !== value[index]?.Index
      || item.IndexText !== value[index]?.IndexText
    ));

    if (isChanged) {
      onChange(normalizedValue);
    }
  }, [value, onChange]);

  const curField = useMemo(
    () => schema?.fields?.find((item: any) => item?.key === fieldKey),
    [fieldKey, schema?.fields],
  );
  const serverKey = useMemo(
    () => _get(curField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', ''),
    [curField],
  );

  return (
    <Form.List name={serverKey}>
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field, index) => (
            <div key={field.key}>
              <Form.Item name={[field.name, 'Index']} hidden initialValue={index + 1}>
                <Input />
              </Form.Item>
              <Form.Item
                name={[field.name, 'IndexText']}
                hidden
                initialValue={numberToVietnamese(index + 1)}
              >
                <Input />
              </Form.Item>

              <Divider orientation="left">
                <span>{`${index + 1}. Dự án thứ ${numberToVietnamese(index + 1)}`}</span>
                {fields.length > 1 && (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => remove(field.name)}
                    icon={<DeleteOutlined />}
                    style={{ backgroundColor: 'var(--error)', marginLeft: 12 }}
                  />
                )}
              </Divider>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name={[field.name, 'TenDuAn']}
                    label="Tên dự án"
                    rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
                  >
                    <Input placeholder="Nhập tên dự án" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name={[field.name, 'MucTieu']}
                    label="Mục tiêu"
                    rules={[...RULE_REQUIRED, ...RULE_NO_HTML]}
                  >
                    <Input.TextArea
                      placeholder="Nhập mục tiêu dự án"
                      rows={3}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name={[field.name, 'TongVonDauTu']}
                    label="Tổng vốn đầu tư"
                    rules={RULE_REQUIRED}
                  >
                    <InputNumber
                      placeholder="Nhập tổng vốn đầu tư"
                      style={{ width: '100%' }}
                      min={0}
                      formatter={formatNumber}
                      parser={parseNumber}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name={[field.name, 'QuyMoDuAn']}
                    label="Quy mô dự án"
                    rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
                  >
                    <Input placeholder="Nhập quy mô dự án" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name={[field.name, 'DiaDiem']}
                    label="Địa điểm"
                    rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
                  >
                    <Input placeholder="Nhập địa điểm" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name={[field.name, 'TienDo']}
                    label="Tiến độ"
                    rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
                  >
                    <Input placeholder="Nhập tiến độ dự án" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name={[field.name, 'ThoiHanDuAn']}
                    label="Thời hạn dự án"
                    rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
                  >
                    <Input placeholder="Nhập thời hạn dự án" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          ))}

          <Divider />
          <Form.Item>
            <Button
              type="primary"
              onClick={() => add({ ...DEFAULT_PROJECT })}
              style={{ width: 220 }}
            >
              <PlusOutlined /> Thêm dự án tiếp theo
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  );
};

export default ViewerContentProject;
