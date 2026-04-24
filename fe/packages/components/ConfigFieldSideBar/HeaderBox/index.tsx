import React, { FC } from 'react';
import './style.scss';

interface HeaderBoxProps {
  title: string;
  description: string | null;
  icon: string | any;
}

const HeaderBox: FC<HeaderBoxProps> = ({ title, description, icon }): React.JSX.Element => (
  <div className="config-editor--header">
    <div className="config-editor--header__icon">
      <img src={icon} alt="header-icon" />
    </div>
    <div className="config-editor--header__labels">
      <p className="header-type">{title}</p>
      <p className="header-label">{description ?? 'Form Field'}</p>
    </div>
  </div>
);

export default HeaderBox;
