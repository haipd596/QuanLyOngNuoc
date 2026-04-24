import React from 'react';
import './style.scss';

const Header: React.FC<{ title: string, description: string }> = ({ title, description }) => (
  <div className="header">
    {title}
    <p>{description}</p>
  </div>
);

export default Header;
