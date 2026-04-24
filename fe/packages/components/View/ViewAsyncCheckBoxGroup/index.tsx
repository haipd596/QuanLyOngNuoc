import AsyncSupport, { TAsyncSupportProps } from '@packages/components/AsyncSupport';
import { TFetchBase } from '@packages/hooks/useFetchBase';
import { getAsyncProps } from '@packages/utils/common';
import React from 'react';
import { ViewCheckboxGroup, ViewCheckboxGroupProps } from '../ViewCheckboxGroup';

export type TViewAsyncCheckboxGroupProps = TAsyncSupportProps & TFetchBase & Omit<ViewCheckboxGroupProps, 'options'>;

function ViewAsyncCheckboxGroup(props: TViewAsyncCheckboxGroupProps) {
  return (
    <AsyncSupport
      {...getAsyncProps(props)}
    >
      <ViewCheckboxGroup {...props} />
    </AsyncSupport>
  );
}

export default ViewAsyncCheckboxGroup;
