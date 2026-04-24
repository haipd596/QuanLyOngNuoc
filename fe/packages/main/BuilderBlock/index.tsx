import React, { FC, JSX } from 'react';
import './styles.scss';

interface BuilderBlockProps {
  title: string;
  toolBar?: JSX.Element | null;
  children?: JSX.Element | null;
  isHavingRef?: boolean
}

const BuilderBlock: FC<BuilderBlockProps> = ({
  title,
  toolBar,
  children,
  isHavingRef,
}) => (isHavingRef ? (
  <div className={`builder-block--inner ${title.toLowerCase()}`}>
    <div className="div--form-block__tab-label">
      <label>{title}</label>
      {toolBar}
    </div>
    {children}
  </div>
)
  : (
    <div className="builder-block">
      <div className={`builder-block--inner ${title.toLowerCase()}`}>
        <div className="div--form-block__tab-label">
          <label>{title}</label>
          {toolBar}
        </div>
        {children}
      </div>
    </div>
  ));

export default BuilderBlock;
