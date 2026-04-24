import ViewDate, { ViewDateProps } from '@packages/components/ViewDate';
import React from 'react';

const ViewDateTimePicker: React.FC<Omit<ViewDateProps, 'showTime'>> = (props) => (
  <ViewDate {...props} showTime />
);
export default ViewDateTimePicker;
