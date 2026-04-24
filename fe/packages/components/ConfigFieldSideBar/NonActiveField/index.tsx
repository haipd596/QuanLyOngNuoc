import React, { FC } from 'react';
import './style.scss';
import { fieldSelectIcon } from '@packages/assets/icons';

interface Message {
  title?: string;
  description?: string;
  description2?: string;
}

const NonActiveField: FC<{ message: Message }> = ({
  message: { title, description, description2 },
}) => (
  <div className="non-active-field">
    <img src={fieldSelectIcon} alt="icon" />
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{description2}</p>
    </div>
  </div>
);

export default NonActiveField;
