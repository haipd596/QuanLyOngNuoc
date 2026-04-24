import React from 'react';

type TPreviewPdfProps = {
  url: string
};

const PreviewPdf = ({ url }: TPreviewPdfProps) => {
  return <iframe src={url} style={{ width: '100%', height: 500 }} title="aaa" />;
};

export default PreviewPdf;
