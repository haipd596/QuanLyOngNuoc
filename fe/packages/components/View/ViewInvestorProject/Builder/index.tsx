import { Form, Radio, Space, Typography } from 'antd';
import { useAppDispatch } from '~/redux/hooks';
import { updateViewInfoKey } from '~/redux/slices/FormSlice';
import { TAsyncViewInvestorProjectProps } from '../type';
import './style.scss';

const { Text } = Typography;

const BuilderInvestorProject: React.FC<TAsyncViewInvestorProjectProps> = (props) => {
  const {
    fieldKey,
    listKeyValueInViewInfo = [],
  } = props;

  const dispatch = useAppDispatch();

  const currentRole = listKeyValueInViewInfo?.find(item => item.key === 'investorRole')?.value || 'Thuong';

  const handleRoleChange = (value: string) => {
    const updatedList = listKeyValueInViewInfo.filter(item => item.key !== 'investorRole');
    updatedList.push({
      key: 'investorRole',
      value,
      id: 'investor-role-config'
    });
    dispatch(updateViewInfoKey({
      fieldKey,
      listKeyValueInViewInfo: updatedList,
    }));
  };

  return (
    <div className="builder-investor">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item label="Vai trò nhà đầu tư">
          <Radio.Group
            value={currentRole}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <Space direction="horizontal" wrap>
              <Radio value="Thuong">
                <Text strong>Nhà đầu tư</Text>
              </Radio>
              {/* <Radio value="GopVon">
                <Text strong>Nhà đầu tư góp vốn</Text>
              </Radio>
              <Radio value="NhanGopVon">
                <Text strong>Nhà đầu tư nhận góp vốn</Text>
              </Radio>
              <Radio value="ChuyenNhuong">
                <Text strong>Nhà đầu tư chuyển nhượng</Text>
              </Radio>
              <Radio value="NhanChuyenNhuong">
                <Text strong>Nhà đầu tư nhận chuyển nhượng</Text>
              </Radio> */}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Space>
    </div>
  );
};

export default BuilderInvestorProject;
