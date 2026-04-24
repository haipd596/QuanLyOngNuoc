import { Select } from 'antd';
import React, { useMemo } from 'react';
import { THEME_NAMES } from '~/constants/themeColor';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { selectActiveSchema, setCurrentTheme } from '~/redux/slices';

const SwitchTheme = () => {
  const { currentTheme } = useAppSelector(selectActiveSchema);
  const dispatch = useAppDispatch();

  const options = useMemo(() => (
    Object.values(THEME_NAMES).map((themeName) => ({ label: themeName, value: themeName }))
  ), []);

  const handleChangeTheme = (value: string) => {
    dispatch(setCurrentTheme(value));
  };

  return (
    <Select
      options={options}
      value={currentTheme}
      onChange={handleChangeTheme}
    />
  );
};

export default SwitchTheme;
