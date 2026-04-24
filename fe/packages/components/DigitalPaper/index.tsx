import { isDetailsMode, isEditMode, isViewMode } from '@packages/utils/viewMode';
import React from 'react';
import DigitalPaperBuilder from './Builder';
import DigitalPaperViewer from './Viewer';

const DigitalPaper = (props: any) => {
  const { modeView } = props;

  if (isEditMode(modeView)) {
    return <DigitalPaperBuilder {...props} />;
  }

  if (isViewMode(modeView) || isDetailsMode(modeView)) {
    return <DigitalPaperViewer {...props} />;
  }

  return (
    <div className="wrapper">DigitalPaper</div>
  );
};

export default DigitalPaper;
