import { fileIcon } from '@packages/assets/icons';
import { dataURLtoFile, imageReg, toDataURL } from '@packages/utils/images';
import React, { useEffect, useState } from 'react';

type TFileItemProps = {
  url: string,
  fileName: string,
};

const FileItem = ({ url, fileName }: TFileItemProps) => {
  const [file, setFile] = useState<{
    fileObj: File | null,
    dataUrl: unknown
  } | null>(null);

  useEffect(() => {
    toDataURL(url).then((dataUrl) => {
      const _file = dataURLtoFile(dataUrl, fileName);
      setFile({
        fileObj: _file,
        dataUrl,
      });
    });
  }, [url]);

  if (!file?.fileObj) return null;

  return (
    imageReg.test(file?.fileObj.type)
      ? <img src={file.dataUrl as string} alt="thumb" />
      : <img src={fileIcon} style={{ width: 50, height: 50 }} alt="file icon" />
  );
};

export default FileItem;
