import AsyncSupport, { TAsyncSupportProps } from '@packages/components/AsyncSupport';
import { TFetchBase } from '@packages/hooks/useFetchBase';
import { getAsyncProps } from '@packages/utils/common';
import React from 'react';
import ViewRadioGroup, { ViewRadioGroupProps } from '../ViewRadioGroup';
// import { ViewRadioGroup, ViewRadioGroupProps } from '../ViewRadioGroup';

interface _RadioGroupProps extends Omit<ViewRadioGroupProps, 'dataSource'> {}

export type TViewAsyncRadioGroupProps = TAsyncSupportProps & TFetchBase & _RadioGroupProps;

function ViewAsyncRadioGroup(props: TViewAsyncRadioGroupProps) {
  return (
    <AsyncSupport
      {...getAsyncProps(props)}
    >
      <ViewRadioGroup {...props} />
    </AsyncSupport>
  );
}

export default ViewAsyncRadioGroup;
