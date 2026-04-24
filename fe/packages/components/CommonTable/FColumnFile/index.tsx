import _get from 'lodash/get';
import _isArray from 'lodash/isArray';

import FileItem from '@packages/components/View/FileButtonGroup/FileList';
import { FIELD_NAME } from '@packages/constants/fields';
import { isDetailsMode } from '@packages/utils/viewMode';

type FColumnFileType = {
  modeView: string;
  fieldName: string;
  record: any;
  index: any;
  onDeleteFile?: (fileId: any, index: any) => void;
};

const FColumnFile:React.FC<FColumnFileType> = (props) => {
  const {
    fieldName, record, index, modeView, onDeleteFile,
  } = props;

  switch (fieldName) {
    case FIELD_NAME.FIELD_TABLE_SINGLE:
      // eslint-disable-next-line no-case-declarations
      const files = _get(record, 'file', []);

      return _isArray(files)
        ? files
          .map(({ FileName, NodeId }) => (
            <FileItem
              name={FileName}
              filedId={NodeId}
              onRemove={(fileId) => onDeleteFile && onDeleteFile(fileId, index)}
            />
          ))
        : <div />;

    case FIELD_NAME.ASYNC_TABLE:
      // eslint-disable-next-line no-case-declarations
      let file = _get(record, 'file', []);
      // eslint-disable-next-line no-case-declarations
      let previewFile: any = null;

      if (!_isArray(file) && record.isSubForm) {
        file = _get(file, 'fileNodeObject', []);
        previewFile = _get(record, 'file.previewFile', '');
      }

      if (_isArray(file)) {
        return file
          .map(({ FileName, NodeId }) => (
            <FileItem
              name={FileName}
              filedId={NodeId}
              onRemove={(fileId) => onDeleteFile && onDeleteFile(fileId, index)}
              isShowDownload={isDetailsMode(modeView) ? false : record.isSubForm}
              previewFile={previewFile}
              key={NodeId}
            />
          ));
      }
      return null;
    default:
      return null;
  }
};

export default FColumnFile;
