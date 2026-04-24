import { DIGITALPAPER_TOOLTIP } from '@packages/components/DigitalPaper/constant';
import IconWrapper from '@packages/components/IconWrapper';
import FileButtonGroup from '@packages/components/View/FileButtonGroup';
import { TUploadColumns } from '@packages/components/View/ViewTable/type.table';
import { isDetailsMode } from '@packages/utils/viewMode';
import { Button, Tooltip } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import clsx from 'clsx';
import _get from 'lodash/get';
import DownloadFileUrl from '../DownloadFileUrl';
import SaveFileToStorage from '../SaveFileToStorage';

type FActionTableSingleType = {
  modeView: string;
  record: AnyObject;
  uploadColumns: TUploadColumns;
  value: any;
  index: number;
  onUploadFile: (value: any, index: number) => void;
  onDeleteFile: (record: any, index: number, key: any) => void;
  targetFieldKey?: string;
};

const FActionTableSingle:React.FC<FActionTableSingleType> = (props) => {
  const {
    modeView, record, uploadColumns, index, onUploadFile, onDeleteFile, targetFieldKey
  } = props;

  const id = _get(record, 'file.0.NodeId', '');

  if (isDetailsMode(modeView)) {
    if (id) {
      return (
        <div>
          <DownloadFileUrl fileId={id} />
          <br />
          <SaveFileToStorage file={record.file} />
        </div>
      );
    }

    return null;
  }

  return (
    <FileButtonGroup
      uploadColumns={uploadColumns}
      onChange={(_values) => onUploadFile(_values, index)}
      value={_get(record, 'file', {})}
      key={id}
      extraActions={[
        <Tooltip title={DIGITALPAPER_TOOLTIP.REMOVE}>
          <Button
            icon={
              <IconWrapper icon={(<i className={clsx('fa-solid fa-trash fa-lg', 'icon_global_dvc')} />)} />
            }
            onClick={() => onDeleteFile(id, index, record?.key)}
          />
        </Tooltip>,
      ]}
      targetFieldKey={targetFieldKey}
      indexEachLine={index}
    />
  );
};

export default FActionTableSingle;
