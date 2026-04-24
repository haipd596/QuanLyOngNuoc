import { Checkbox, Form, Input } from 'antd';
import _get from 'lodash/get';
import { useEffect, useMemo } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveSchema } from '~/redux/slices/FormSlice';
import { TAsyncViewInvestorBaseV2Props } from '../type';
import Individual from './Individual';
import Org from './Org';

const DEFAULT_INVESTOR = {
  Loai: 'CaNhan',
  VaiTro: 'Thuong',
};

const normalizeInvestor = (item: Record<string, any> | undefined) => ({
  ...item,
  Loai: item?.Loai === 'ToChuc' ? 'ToChuc' : 'CaNhan',
  VaiTro: item?.VaiTro || 'Thuong',
});

const ViewerInvestorBaseV2: React.FC<TAsyncViewInvestorBaseV2Props> = (props) => {
  const {
    fieldKey,
    onChange,
    value,
  } = props;

  const form = Form.useFormInstance();
  const schema = useAppSelector(selectActiveSchema);

  useEffect(() => {
    if (!Array.isArray(value) || value.length === 0) {
      onChange([{ ...DEFAULT_INVESTOR }]);
      return;
    }

    const normalizedValue = [normalizeInvestor(value[0])];
    const currentFirstItem = value[0] || {};
    const isChanged = value.length !== 1
      || normalizedValue[0].Loai !== currentFirstItem.Loai
      || normalizedValue[0].VaiTro !== currentFirstItem.VaiTro;

    if (isChanged) {
      onChange(normalizedValue);
    }
  }, [onChange, value]);

  const curField = useMemo(
    () => schema?.fields?.find((item: any) => item?.key === fieldKey),
    [fieldKey, schema?.fields],
  );

  const serverKey = useMemo(() => {
    const payloadKey = _get(curField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', '');
    return typeof payloadKey === 'string' ? payloadKey : fieldKey;
  }, [curField, fieldKey]);

  return (
    <Form.List name={serverKey}>
      {(fields) => (
        <div>
          {fields.map((field) => {
            const currentType = form.getFieldValue([serverKey, field.name, 'Loai']) || 'CaNhan';

            return (
              <div key={field.key}>
                <Form.Item
                  name={[field.name, 'Loai']}
                  hidden
                  initialValue="CaNhan"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={[field.name, 'VaiTro']}
                  hidden
                  initialValue="Thuong"
                >
                  <Input />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    <Checkbox
                      checked={currentType === 'CaNhan'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          form.setFieldValue([serverKey, field.name, 'Loai'], 'CaNhan');
                        }
                      }}
                    >
                      Nhà đầu tư cá nhân
                    </Checkbox>

                    <Checkbox
                      checked={currentType === 'ToChuc'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          form.setFieldValue([serverKey, field.name, 'Loai'], 'ToChuc');
                        }
                      }}
                    >
                      Doanh nghiệp/tổ chức
                    </Checkbox>
                  </div>
                </div>

                {currentType === 'CaNhan' ? <Individual index={field.name} /> : null}
                {currentType === 'ToChuc' ? <Org index={field.name} /> : null}
              </div>
            );
          })}
        </div>
      )}
    </Form.List>
  );
};

export default ViewerInvestorBaseV2;
