import clsx from 'clsx';
import React, { useMemo } from 'react';
import { THEME_NAMES, THEMES } from '~/constants/themeColor';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveSchema } from '~/redux/slices';
import './styles.scss';

type TIconWrapperProps = {
  icon: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>;

function IconWrapper(props: TIconWrapperProps) {
  const { icon, ...rest } = props;
  const activeSchema = useAppSelector(selectActiveSchema);

  const themeObject = THEMES[activeSchema?.currentTheme || THEME_NAMES.GREEN];

  const style = useMemo(() => {
    const _styles = rest.style || {};

    return {
      ..._styles,
      color: themeObject.PRIMARY(),
    };
  }, [activeSchema?.currentTheme, rest.style]);

  return (
    <div {...rest} style={style} className={clsx('form-builder-icon-wrapper', rest.className)}>
      <div className="form-builder-icon-inner">
        {icon}
      </div>
    </div>
  );
}

export default IconWrapper;
