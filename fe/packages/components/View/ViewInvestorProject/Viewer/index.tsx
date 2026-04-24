import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getInvestorLabelWithIndex, getInvestorRoleInfo } from '@packages/utils/investorHelper';
import { Button, Divider, Flex, Form } from "antd";
import _get from 'lodash/get';
import { useEffect } from "react";
import { useAppSelector } from '~/redux/hooks';
import { selectActiveSchema } from '~/redux/slices/FormSlice';
import { TAsyncViewInvestorProjectProps } from '../type';
import Org from './Org';

const ViewerInvestorProject: React.FC<TAsyncViewInvestorProjectProps> = (props) => {
  const {
    fieldKey,
    onChange,
    value,
    listKeyValueInViewInfo,
  } = props;

  const schema = useAppSelector(selectActiveSchema);

  useEffect(() => {
    if (!value) {
      onChange([{ Loai: 'ToChuc', LoaiNDD: 'VietNam' }]);
    }
  }, []);

  const curField = schema?.fields?.find((item: any) => item?.key === fieldKey);
  const _curServerKey = _get(curField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', '');

  const { role, label: investorLabel, addButtonText } = getInvestorRoleInfo(listKeyValueInViewInfo);

  return (
    <Form.List name={_curServerKey}>
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field, index) => (
            <div key={field.key}>
              {/* Hidden — lưu vai trò và loại cố định */}
              <Form.Item name={[field.name, 'VaiTro']} hidden initialValue={role}>
                <input />
              </Form.Item>
              <Form.Item name={[field.name, 'Loai']} hidden initialValue="ToChuc">
                <input />
              </Form.Item>

              <Divider>
                <Flex align="center" gap={12}>
                  {getInvestorLabelWithIndex(investorLabel, index)}
                  {fields.length > 1 && (
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => remove(field.name)}
                      icon={<DeleteOutlined />}
                      style={{ backgroundColor: 'var(--error)' }}
                    />
                  )}
                </Flex>
              </Divider>

              <Org
                index={field.name}
                curServerKey={_curServerKey}
                fieldName={field.name}
              />
            </div>
          ))}

          <Divider />
          <Form.Item>
            <Button
              type="primary"
              onClick={() => add({ Loai: 'ToChuc', LoaiNDD: 'VietNam' })}
              style={{ width: 240 }}
            >
              <PlusOutlined /> {addButtonText}
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  );
};

export default ViewerInvestorProject;
