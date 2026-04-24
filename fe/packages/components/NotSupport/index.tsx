import React from 'react';
import './styles.scss';

export type TPropsNotSupport = {
  message?: string
};

function NotSupport({ message }: TPropsNotSupport) {
  return (
    <div>
      <h3>This field un-support</h3>
      {message && (
        <div className="error-not-support">
          {message}
        </div>
      )}
    </div>
  );
}

export default NotSupport;
