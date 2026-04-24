import React from 'react';
import './styles.scss';

type TTabLabelProps = {
  index: number,
  label: string | React.ReactNode
  hideLabel?: boolean,
  hideIcon?: boolean,
  stepOrderStyle?: object
};

const TabTitle: React.FC<TTabLabelProps> = (props) => {
  const { label, hideLabel } = props;

  return (
    <div className="step-label-title">
      {!hideLabel && (
        <div className="f-label_tabs">
          {label}
        </div>
      )}
    </div>
  );
};
export default TabTitle;
