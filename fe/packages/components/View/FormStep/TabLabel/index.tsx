import { CheckOutlined } from '@ant-design/icons';
import React from 'react';
import './styles.scss';

type TTabLabelProps = {
  index: number,
  label: string | React.ReactNode
  hideLabel?: boolean,
  hideIcon?: boolean,
  stepOrderStyle?: object,
  visitedSteps?: number[],
};

const TabLabel = ({
  index,
  label,
  stepOrderStyle,
  hideLabel,
  hideIcon,
  visitedSteps = [],
}: TTabLabelProps) => (
  <div className="step-label">
    {!hideIcon && (
      <div
        style={stepOrderStyle}
        className="step-order hidden-in-details"
      >
        {index + 1}
      </div>
    )}
    {!hideLabel && (
      <div className="label">
        {visitedSteps.includes(index) && <CheckOutlined />}
        {label}
      </div>
    )}
  </div>
);
export default TabLabel;
