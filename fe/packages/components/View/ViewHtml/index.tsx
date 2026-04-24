import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import React from 'react';

export interface HTMLViewerEditorProps {
  initialContent: string;
}

const HTMLViewer: React.FC<HTMLViewerEditorProps> = ({ initialContent }) => {
  const cleanHTML = DOMPurify.sanitize(initialContent);
  const parseHTML = parse(cleanHTML);

  return (
    <div>
      <div className="html-viewer">{parseHTML}</div>
    </div>
  );
};

export default HTMLViewer;
