export const imageReg = /[/.](gif|jpg|jpeg|tiff|png)$/i;

export const toDataURL = (url: string): Promise<string> => fetch(url)
  .then((response) => response.blob())
  .then((blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  }));

export function dataURLtoFile(dataUrl: string, filename: string) {
  const arr = dataUrl.split(',');
  const match = arr[0].match(/:(.*?);/);
  if (match) {
    const mime = match[1];
    const bstr = atob(arr[1]); let n = bstr.length; const
      u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  return null;
}

export const buildUrlDownload = ({ url, fileId }: any) => {
  return `${url}/_vti_bin/dvcm/CommonServices.svc/download?objectKey=${fileId}`;
};

export const buildPreviewFile = ({ url, fileId }: any) => {
  return `${url}/api/dellecs/viewfile?attackmentId=${fileId}`;
};
