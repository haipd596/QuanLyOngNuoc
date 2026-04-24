import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getInvestorLabelWithIndex, getInvestorRoleInfo, getInvestorTypeConfig } from '@packages/utils/investorHelper';
import { Button, Divider, Flex, Form, Radio, Row } from "antd";
import _get from 'lodash/get';
import { useEffect } from "react";
import { useAppSelector } from '~/redux/hooks';
import { selectActiveSchema } from '~/redux/slices/FormSlice';
import { TAsyncViewInvestorProps } from '../type';
import Individual from './Individual';
import Org from './Org';

const ViewerInvestor: React.FC<TAsyncViewInvestorProps> = (props) => {
  const {
    fieldKey,
    onChange,
    value,
    listKeyValueInViewInfo
  } = props;

  const schema = useAppSelector(selectActiveSchema);
  const { showCaNhan, showToChuc, defaultLoai } = getInvestorTypeConfig(listKeyValueInViewInfo);

  useEffect(() => {
    if(!value) {
      onChange([{Loai: defaultLoai}])
    }
  }, [value, onChange])

  const curField = schema?.fields?.find((item:any) => item?.key === fieldKey);
  const _curServerKey = _get(curField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', '');

  const { role, label: investorLabel, addButtonText } = getInvestorRoleInfo(listKeyValueInViewInfo);

  return (
    <Form.List name={_curServerKey}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                {/* Hidden input để lưu vai trò nhà đầu tư */}
                <Form.Item
                  {...field}
                  name={[field.name, 'VaiTro']}
                  hidden
                  initialValue={role}
                >
                  <input />
                </Form.Item>

                <Divider>{getInvestorLabelWithIndex(investorLabel, index)}</Divider>
                <Row>
                  <Flex align="center" justify="space-between" style={{width: '100%'}}>
                    {showCaNhan && showToChuc && (
                      <Form.Item
                        {...field}
                        name={[field.name, 'Loai']}
                        label="Loại nhà đầu tư"
                      >
                        <Radio.Group>
                          <Radio value="CaNhan">Nhà đầu tư cá nhân</Radio>
                          <Radio value="ToChuc">Nhà đầu tư tổ chức</Radio>
                        </Radio.Group>
                      </Form.Item>
                    )}
                    <div style={{marginTop: -16}}>
                      {
                        fields.length > 1 ? (
                          <Button
                            type="primary"
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                            icon={<DeleteOutlined style={{color: 'white', fontSize: 18}}/>}
                            style={{backgroundColor: 'var(--error)'}}
                          />
                        ) : null
                      }
                    </div>
                  </Flex>
                </Row>

                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues[_curServerKey]?.[field.name]?.Loai !==
                    curValues[_curServerKey]?.[field.name]?.Loai
                  }
                >
                  {(values:any) => {
                    const type = values.getFieldValue([_curServerKey, field.name, 'Loai'])
                    return (
                      <>
                        {showCaNhan && type === "CaNhan" && <Individual index={index} />}
                        {showToChuc && type === 'ToChuc' && <Org index={index}/>}
                        {/* Fallback khi chỉ hiện 1 loại — render trực tiếp không qua Radio */}
                        {!showToChuc && showCaNhan && !type && <Individual index={index} />}
                        {!showCaNhan && showToChuc && !type && <Org index={index}/>}
                      </>
                    )
                  }}
                </Form.Item>
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                type="primary"
                onClick={() => add({Loai: defaultLoai})}
                style={{ width: 240}}
              >
                <PlusOutlined /> {addButtonText}
              </Button>
            </Form.Item>
          </div>
        )
      }}
    </Form.List>
  )
}
export default ViewerInvestor;