import IconWrapper from '@packages/components/IconWrapper';
import ViewDate, { ViewDateProps } from '@packages/components/ViewDate';
// import { disabledDatedFromCurrentDay, disabledDatedLessFromCurrentDay } from '@packages/utils';
import React from 'react';

const ViewDatePicker: React.FC<Omit<ViewDateProps, 'showTime'>> = (props) => {
  return (
    <ViewDate
      {...props}
      showTime={false}
      rootClassName="theme-dvc"
      suffixIcon={(
        <IconWrapper icon={<i className="fa-sharp fa-solid fa-calendar-days" />} />
      )}
      allowClear={{
        clearIcon: (
          <IconWrapper icon={<i className="fa-solid fa-xmark" />} />
        ),
      }}
      // disabledDate={(current) => {
      //   if (isDisabledFromCurrentDay) {
      //     return disabledDatedFromCurrentDay(current);
      //   } if (isDisabledGreaterThanCurrentDay) {
      //     return disabledDatedGreaterThanFromCurrentDay(current);
      //   }
      //   return false;
      // }}
    />
  );
};

export default ViewDatePicker;
