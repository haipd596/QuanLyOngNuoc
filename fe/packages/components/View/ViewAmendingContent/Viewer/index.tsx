import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useValidate } from "@packages/hooks/useValidate";
import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import _get from 'lodash/get';
import { useEffect } from "react";
import { useAppSelector } from '~/redux/hooks';
import { selectActiveSchema } from '~/redux/slices/FormSlice';
import { TAsyncViewAmendingContentProps } from '../type';

const toIndexLabel = (i: number): string => {
  let label = '';
  let n = i;
  do {
    label = String.fromCharCode(97 + (n % 26)) + label;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return label;
};

const ViewerInvestor: React.FC<TAsyncViewAmendingContentProps> = (props) => {
  const { fieldKey, onChange, value } = props;

  const { RULE_REQUIRED, RULE_NO_HTML } = useValidate();

  const schema = useAppSelector(selectActiveSchema);

  useEffect(() => {
    if(!value) {
      onChange([{NoiDungDaQuyDinh: "", NoiDungHieuDinh: "", LyDoHieuDinh: ""}])
    }
  }, [value, onChange])

  const curField = schema?.fields?.find((item:any) => item?.key === fieldKey);
  const _curServerKey = _get(curField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', '');
  
  return (
    <Form.List name={_curServerKey}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider/>
                <Row>
                  <Flex align="center" justify="space-between" style={{width: '100%', marginBottom: 10}}>
                    <div style={{flex: 1, fontWeight: 600, textAlign: 'center', marginTop: -10}}>
                      {`Nội dung hiệu đính ${index + 1}`}
                    </div>
                    <div style={{marginTop: -16}}>
                      {
                        // fields.length > 1 ? (
                          <Button
                            type="primary"
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                            icon={<DeleteOutlined style={{color: 'white', fontSize: 18}}/>}
                            style={{backgroundColor: 'var(--error)'}}
                          />
                        // ) : null
                      }
                    </div>
                  </Flex>
                </Row>

                <Form.Item name={[index, "index"]} initialValue={index + 1} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={[index, "indexLabel"]} initialValue={toIndexLabel(index)} hidden>
                  <Input />
                </Form.Item>
                      
                <Row gutter={[16, 0]}>
                  <Col span={24}>
                    <Form.Item
                      name={[index, "NoiDungDaQuyDinh"]}
                      label="Nội dung đã quy định"
                      rules={[...RULE_REQUIRED, ...RULE_NO_HTML]}
                    >
                      <Input.TextArea placeholder="Nội dung đã quy định tại Giấy chứng nhận/Quyết định" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name={[index, "NoiDungHieuDinh"]}
                      label="Nội dung hiệu đính"
                      rules={[...RULE_REQUIRED, ...RULE_NO_HTML]}
                    >
                      <Input.TextArea placeholder="Nội dung đề nghị hiệu đính" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name={[index, "LyDoHieuDinh"]}
                      label="Lý do hiệu đính"
                      rules={[...RULE_REQUIRED, ...RULE_NO_HTML]}
                    >
                      <Input.TextArea placeholder="Lý do hiệu đính" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                type="primary"
                onClick={() => add({NoiDungDaQuyDinh: "", NoiDungHieuDinh: "", LyDoHieuDinh: ""})}
                style={{ width: 220}}
              >
                <PlusOutlined /> Thêm nội dung hiệu đính
              </Button>
            </Form.Item>
          </div>
        )
      }}
    </Form.List>
  )
}
export default ViewerInvestor;