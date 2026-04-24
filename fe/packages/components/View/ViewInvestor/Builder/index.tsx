import { getRawInvestorTypeFlags } from '@packages/utils/investorHelper';
import { Checkbox, Divider, Form, Radio, Space, Typography } from 'antd';
import { useAppDispatch } from '~/redux/hooks';
import { updateViewInfoKey } from '~/redux/slices/FormSlice';
import { TAsyncViewInvestorProps } from '../type';
import './style.scss';

const { Text } = Typography;

const BuilderInvestor: React.FC<TAsyncViewInvestorProps> = (props) => {
  const {
    fieldKey,
    listKeyValueInViewInfo = [],
  } = props;

  const dispatch = useAppDispatch();

  const currentRole = listKeyValueInViewInfo?.find(item => item.key === 'investorRole')?.value || 'Thuong';
  const { showCaNhan, showToChuc } = getRawInvestorTypeFlags(listKeyValueInViewInfo);

  const updateKey = (key: string, value: string) => {
    const updatedList = listKeyValueInViewInfo.filter(item => item.key !== key);
    updatedList.push({ key, value, id: `investor-${key}-config` });
    dispatch(updateViewInfoKey({ fieldKey, listKeyValueInViewInfo: updatedList }));
  };

  return (
    <div className="builder-investor">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item label="Vai trò nhà đầu tư">
          <Radio.Group value={currentRole} onChange={(e) => updateKey('investorRole', e.target.value)}>
            <Space direction="horizontal" wrap>
              <Radio value="Thuong"><Text strong>Nhà đầu tư</Text></Radio>
              <Radio value="GopVon"><Text strong>Nhà đầu tư góp vốn</Text></Radio>
              <Radio value="NhanGopVon"><Text strong>Nhà đầu tư nhận góp vốn</Text></Radio>
              <Radio value="ChuyenNhuong"><Text strong>Nhà đầu tư chuyển nhượng</Text></Radio>
              <Radio value="NhanChuyenNhuong"><Text strong>Nhà đầu tư nhận chuyển nhượng</Text></Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Divider style={{ margin: '4px 0' }} />

        <Form.Item label="Hiển thị loại nhà đầu tư">
          <Space direction="horizontal">
            <Checkbox
              checked={showCaNhan}
              onChange={(e) => updateKey('showCaNhan', String(e.target.checked))}
            >
              Nhà đầu tư cá nhân
            </Checkbox>
            <Checkbox
              checked={showToChuc}
              onChange={(e) => updateKey('showToChuc', String(e.target.checked))}
            >
              Nhà đầu tư tổ chức
            </Checkbox>
          </Space>
        </Form.Item>
      </Space>
    </div>
  );
};

export default BuilderInvestor;
