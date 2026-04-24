import React, { FC } from 'react';
import './styles.scss';
import { wrenchIcon } from '@packages/assets/images';

interface CircularTextIconProps {

}

const CircularTextIcon: FC<CircularTextIconProps> = () : React.JSX.Element => (
  <div className="circular-text-icon">
    <svg width={70} height={70} className="circular-icon">
      <path id="curve" d="M 7 35 A 28 28 0 1 1 7 36" />
      <text className="text">
        <textPath href="#curve">FINT Form Builder</textPath>
      </text>
    </svg>

    <img src={wrenchIcon} alt="" />
  </div>
);

export default CircularTextIcon;
