import React from 'react';

interface RequiredLabelProps {
  children: React.ReactNode;
  required?: boolean;
}

export const RequiredLabel: React.FC<RequiredLabelProps> = ({ 
  children, 
  required = true 
}) => (
  <span>
    {children}
    {required && <span style={{ color: '#ff4d4f', marginLeft: '4px' }}>*</span>}
  </span>
);

export default RequiredLabel;