import { FIELD_NAME } from '@packages/constants/fields';
import React from 'react';

export type TComponentName = keyof typeof FIELD_NAME;

export type DefinedComponent = React.JSX.Element | (() => React.JSX.Element);

export type TItemBuilderBar = {
  title: string,
  [index: string]: any;
  icon?: React.JSX.Element | null | any,
  componentName: string,
  tooltip?: string | null,
  onAddField?: () => void
};
