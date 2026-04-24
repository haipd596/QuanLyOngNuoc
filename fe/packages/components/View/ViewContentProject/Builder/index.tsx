import { Typography } from 'antd';
import { TAsyncViewContentProjectProps } from '../type';
import './style.scss';

const BuilderContentProject: React.FC<TAsyncViewContentProjectProps> = () => {
  return (
    <div className="builder-content-project">
      <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>
        Nội dung dự án
      </Typography.Title>
      <Typography.Paragraph style={{ marginBottom: 0 }}>
        Field này hiển thị danh sách nhiều nội dung dự án.
      </Typography.Paragraph>
    </div>
  );
};

export default BuilderContentProject;
