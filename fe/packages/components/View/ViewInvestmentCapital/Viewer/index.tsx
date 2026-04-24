import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form } from 'antd';
import _get from 'lodash/get';
import { useEffect } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveSchema } from '~/redux/slices/FormSlice';
import { TViewInvestmentCapitalProps } from '../type';
import InvestmentCapitalForm from './InvestmentCapitalForm';

const DEFAULT_INVESTOR = {
  TenNhaDauTu: '',
  VonChuSoHuu: null,
  VonVay: null,
  LoiNhuanTaiDauTu: null,
  GiaiTrinhCamKet: '',
};

const ViewerInvestmentCapital: React.FC<TViewInvestmentCapitalProps> = (props) => {
  const { fieldKey, onChange, value } = props;

  const schema = useAppSelector(selectActiveSchema);

  useEffect(() => {
    if (!value && typeof onChange === 'function') {
      onChange([{ ...DEFAULT_INVESTOR }]);
    }
  }, [value, onChange]);

  const curField = schema?.fields?.find((item: any) => item?.key === fieldKey);
  const serverKey = _get(curField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', '');

  return (
    <Form.List name={serverKey}>
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field, index) => (
            <div key={field.key}>
              <Divider>
                <span>
                  {`Nhà đầu tư thứ ${index + 1}`}
                </span>
                {fields.length > 1 && (
                  <Button
                    type="primary"
                    onClick={() => remove(field.name)}
                    icon={<DeleteOutlined style={{ color: 'white', fontSize: 18 }} />}
                    style={{ backgroundColor: 'var(--error)', marginLeft: 12 }}
                  />
                )}
              </Divider>
              <InvestmentCapitalForm index={index} />
            </div>
          ))}

          <Divider />
          <Form.Item>
            <Button
              type="primary"
              onClick={() => add({ ...DEFAULT_INVESTOR })}
              style={{ width: 120 }}
            >
              <PlusOutlined /> Thêm
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  );
};

export default ViewerInvestmentCapital;
