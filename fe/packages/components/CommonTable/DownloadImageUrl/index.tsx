import { getWebAbsoluteUrlPageContext } from '@packages/utils/common';
import { buildUrlDownload } from '@packages/utils/images';

type IProps = {
  fileId: string;
  children: React.ReactNode;
};

const DownloadImageUrl = ({ fileId, children }: IProps) => {
  const hiddenWebExtendUrl = getWebAbsoluteUrlPageContext();

  return (
    <a
      href={buildUrlDownload({ url: hiddenWebExtendUrl, fileId })}
      download
      style={{ textDecoration: 'none', color: '#1890ff' }}
    >
      {children}
    </a>
  );
};

export default DownloadImageUrl;
