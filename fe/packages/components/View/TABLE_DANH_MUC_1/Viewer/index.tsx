import AsyncSupport from '@packages/components/AsyncSupport';
import { getAsyncProps } from '@packages/utils/common';
import '../styles.scss';
import WrapperTableDanhMuc from './TableDanhMucWrapper';
function TABLE_DANH_MUC_1Viewer(props: any) {
  return (
    <AsyncSupport
      {...getAsyncProps(props)}
    >
      <WrapperTableDanhMuc {...props}/>
    </AsyncSupport>
  );
};

export default TABLE_DANH_MUC_1Viewer;
