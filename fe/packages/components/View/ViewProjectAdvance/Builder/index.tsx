import { TAsyncViewProjectAdvanceProps } from '../type';
import './style.scss';

const BuilderProjectAdvance: React.FC<TAsyncViewProjectAdvanceProps> = (_:any) => {
  return (
    <div className="builder-project-advance">
      <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Danh sách hồ sơ giấy tờ dự án</strong>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>
          Bảng này cho phép người dùng nhập thông tin về các giấy tờ liên quan đến dự án
        </p>
      </div>
    </div>
  );
};

export default BuilderProjectAdvance;
