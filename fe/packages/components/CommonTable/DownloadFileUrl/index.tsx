import { getWebAbsoluteUrlPageContext } from '@packages/utils/common';
import { buildUrlDownload } from '@packages/utils/images';

type IProps = {
  fileId: string;
};

const DownloadFileUrl = ({ fileId }: IProps) => {
  const hiddenWebExtendUrl = getWebAbsoluteUrlPageContext();

  return <a href={buildUrlDownload({ url: hiddenWebExtendUrl, fileId })}>Tải tệp</a>;
};

export default DownloadFileUrl;
