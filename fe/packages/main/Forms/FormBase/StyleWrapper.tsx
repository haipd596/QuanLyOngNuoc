import { AnyObject } from 'antd/es/_util/type';
import React, { Suspense } from 'react';

type TFormBaseProps = {
  fieldProps: AnyObject,
  children: any
};

const StyleProvider = ({ fieldProps, children }: TFormBaseProps) => {
  const transitionStyle = {
    transition: 'all 0.2s ease-in-out',
  };

  const _wrapperStyle = {
    ...fieldProps.styleWrapperParseFromJsonTree,
    ...transitionStyle,
  };
  // get className entered by user for components
  const _className = fieldProps.stylesPropsParseFromJsonTree?.className;
  // get id entered by user for components
  const _id = fieldProps.stylesPropsParseFromJsonTree?.id;

  return (
    <div
      style={_wrapperStyle}
      className={_className}
      id={_id}
    >
      <Suspense>
        {children}
      </Suspense>
    </div>
  );
};

export default StyleProvider;
