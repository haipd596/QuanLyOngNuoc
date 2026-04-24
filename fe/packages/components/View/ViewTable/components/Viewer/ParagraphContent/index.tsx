import _get from 'lodash/get';

import DownloadImageUrl from '@packages/components/CommonTable/DownloadImageUrl';
import { FIELD_NAME } from '@packages/constants/fields';
// import { isUrlString } from '@packages/utils/common';
import { Checkbox } from 'antd';
import { IParagraph } from '../../../type.table';
import { renderContent } from '../../../utils';

/**
 * @description - Nó là 1 function component dùng để convert data của TABLE.
 * - Ko liên quan gì đến data lúc submit mà chỉ xử lí về mặt hiện thị của TABLE.
 * @param props Là Object Data từng Row của table.
 * @returns Trả về value là dạng string.
 */

const ParagraphContent: React.FC<IParagraph> = (props) => {
  const { value, record } = props;
  const fieldName = _get(record, 'columnDataType.props.defaultValue');

  if (fieldName === FIELD_NAME.UPLOAD) {
    return (value as unknown as any[])?.map((href) => {
      const comma = <br />;

      return (
        <a href={href} target="_blank" rel="noreferrer">
          {`${href.FileName}`}
          {comma}
        </a>
      );
    });
  }

  if (fieldName === FIELD_NAME.CHECK_BOX) {
    return (
      <Checkbox style={{ cursor: 'text' }} checked={value as any} />
    );
  }

  if (fieldName === FIELD_NAME.INPUT_WITH_UPLOAD) {
    if (typeof value === 'string') {
      return value;
    }

    if (
      !value
      || typeof value !== 'object'
      || (!(value as any).text && (!(value as any).fileRes || !(value as any).fileRes.NodeId))
    ) {
      return null;
    }

    const { text, fileRes } = value;

    return (
      <div>
        {text && <p>{text}</p>}

        {(fileRes as any)?.FileName && (
          <span style={{ display: 'block', marginBottom: '8px' }}>
            <DownloadImageUrl fileId={(fileRes as any).NodeId}>
              {(fileRes as any).FileName}
            </DownloadImageUrl>
          </span>
        )}
      </div>
    );
  }

  if(fieldName === FIELD_NAME.ASYNC_SELECT && value.length > 1){

    const _value: any = value;

    return(
      <div>
      {_value.map((item: any, index: any) => (
        <div key={index}>- {item}</div>
      ))}
    </div>
    )
  }

  return renderContent(props);
};

export default ParagraphContent;
