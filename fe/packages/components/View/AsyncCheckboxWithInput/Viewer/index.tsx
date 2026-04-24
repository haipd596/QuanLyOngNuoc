import AsyncSupport from '@packages/components/AsyncSupport';
import { getAsyncProps } from '@packages/utils/common';
import { TViewAsyncCheckboxGroupProps } from '../../ViewAsyncCheckBoxGroup';
import WrapperCardViewer from '../WrapperCardViewer';

const AsyncCheckboxWithInputViewer:React.FC<TViewAsyncCheckboxGroupProps> = (props) => {
  return (
    <AsyncSupport
      {...getAsyncProps(props)}
    >
      <WrapperCardViewer {...props} />
    </AsyncSupport>
  );
};

export default AsyncCheckboxWithInputViewer;
