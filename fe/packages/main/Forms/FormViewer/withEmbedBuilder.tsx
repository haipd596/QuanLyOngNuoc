import { TJsonProperties } from '@packages/@types';
import React from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { updateMultiFieldByPath } from '~/redux/slices';
import { FormViewerCoreProps } from './FormViewerCore';

/**
 * When need to use the form viewer with redux
 * @param Component
 * @returns
 */
export const withEmbedBuilder = (
  Component: React.FC<FormViewerCoreProps>,
) => (props: FormViewerCoreProps) => {
  const dispatch = useAppDispatch();

  const updateJson = (jsonProperties: TJsonProperties[]) => {
    dispatch(updateMultiFieldByPath(jsonProperties));
  };

  return <Component {...props} onAutoRun={updateJson} />;
};
