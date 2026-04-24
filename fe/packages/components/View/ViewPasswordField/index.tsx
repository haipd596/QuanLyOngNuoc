import { stringToFunc } from '@packages/utils/common';
import { PasswordProps } from 'antd/es/input';
import { Input } from 'antd/lib';
import React from 'react';

function ViewPasswordField({
  iconRender,
  ...rest
}: Omit<PasswordProps, 'iconRender'> & { iconRender: string }) {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  let iconRenderFunc = new Function();

  try {
    const { func } = stringToFunc(iconRender);
    if (func instanceof Function) {
      iconRenderFunc = func;
    }
  } catch (error) {
    console.error(error, 'error');
  }

  return <Input.Password {...rest} iconRender={iconRenderFunc as PasswordProps['iconRender']} />;
}

export default ViewPasswordField;
