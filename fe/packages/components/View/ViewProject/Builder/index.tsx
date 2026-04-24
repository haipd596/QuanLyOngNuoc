import { Form, Radio, Space, Typography } from 'antd';
import { useAppDispatch } from '~/redux/hooks';
import { updateViewInfoKey } from '~/redux/slices/FormSlice';
import { TAsyncViewProjectProps } from '../type';
import './style.scss';

const { Text } = Typography;

const BuilderProject: React.FC<TAsyncViewProjectProps> = (props) => {
  const {
    fieldKey,
    listKeyValueInViewInfo = [],
  } = props;

  const dispatch = useAppDispatch();

  // Lấy giá trị projectType hiện tại
  const currentType = listKeyValueInViewInfo?.find(item => item.key === 'projectType')?.value || 'Thuong';

  const handleTypeChange = (value: string) => {
    // Cập nhật listKeyValueInViewInfo với projectType mới
    const updatedList = listKeyValueInViewInfo.filter(item => item.key !== 'projectType');
    updatedList.push({
      key: 'projectType',
      value,
      id: 'project-type-config'
    });

    dispatch(updateViewInfoKey({
      fieldKey,
      listKeyValueInViewInfo: updatedList,
    }));
  };

  return (
    <div className="builder-project">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item label="Loại dự án">
          <Radio.Group
            value={currentType}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <Space direction="horizontal">
              <Radio value="Thuong">
                <Space direction="vertical" size={0}>
                  <Text strong>Dự án thường</Text>
                </Space>
              </Radio>
              <Radio value="GopVon">
                <Space direction="vertical" size={0}>
                  <Text strong>Dự án góp vốn</Text>
                </Space>
              </Radio>
              <Radio value="ChuyenNhuong">
                <Space direction="vertical" size={0}>
                  <Text strong>Dự án chuyển nhượng</Text>
                </Space>
              </Radio>
              <Radio value="Khac">
                <Space direction="vertical" size={0}>
                  <Text strong>Dự án còn lại</Text>
                </Space>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Space>
    </div>
  );
};

export default BuilderProject;
