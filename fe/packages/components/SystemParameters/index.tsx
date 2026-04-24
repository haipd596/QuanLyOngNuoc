import { apiGetSystemParameterAll } from '@packages/dvc-service/apiGetSystemParameterAll';
import React, { useEffect } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { setSystemParameter } from '~/redux/slices';

type TSystemParametersProps = {
  children: React.ReactNode
};

const SystemParameters = ({ children }: TSystemParametersProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const systemData = await apiGetSystemParameterAll();
      dispatch(setSystemParameter(systemData));
    })();
  }, []);

  return children;
};

export default SystemParameters;
