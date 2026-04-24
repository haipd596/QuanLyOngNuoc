import { Suspense } from 'react';

export const withLazySupport = (Component: any) => (props: any) => (
  <Suspense>
    <Component {...props} />
  </Suspense>
);
