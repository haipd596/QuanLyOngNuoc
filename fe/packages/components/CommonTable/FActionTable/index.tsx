import IconWrapper from '@packages/components/IconWrapper';
import { isDetailsMode } from '@packages/utils/viewMode';
import { Button, Space } from 'antd';
import clsx from 'clsx';
import AddCircle from '../../../assets/icons/add_circle.svg';
import './styles.scss';

type FActionTableType = {
  modeView: string;
  onAdd: () => void
};

const FActionTable:React.FC<FActionTableType> = (props) => {
  const { modeView, onAdd } = props;

  return (
    <Space align="center" size={0}>
      <span> Thao tác</span>
      {!isDetailsMode(modeView) && (
        <Button
          icon={(
            <IconWrapper icon={(
              <span className={clsx('icon_global_dvc')}>
                <img src={AddCircle} alt="nút thêm mới" />
              </span>
              )}
            />
          )}
          onClick={onAdd}
          type="text"
        />
      )}
    </Space>
  );
};

export default FActionTable;
