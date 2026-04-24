import { Typography } from 'antd';
import { TAsyncViewInvestorBaseV2Props } from '../type';
import './style.scss';

const BuilderInvestorBaseV2: React.FC<TAsyncViewInvestorBaseV2Props> = () => {
  return (
    <div className="builder-investor-base-v2">
      <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>
        Thông tin nhà đầu tư cơ bản
      </Typography.Title>
      <Typography.Paragraph style={{ marginBottom: 0 }}>
        Người dùng chọn loại nhà đầu tư là cá nhân hoặc doanh nghiệp/tổ chức để hiển thị biểu mẫu tương ứng.
      </Typography.Paragraph>
    </div>
  );
};

export default BuilderInvestorBaseV2;
