import React, { FC } from 'react';

import { CaretDownOutlined, CaretUpFilled } from '@ant-design/icons';
import { CATEGORIES } from '@packages/utils/viewFields';
import './styles.scss';
import clsx from 'clsx';

type TProps = {
  title: string,
  children: any,
  isHidden?:boolean,
  categoryIndex?: number
};

const PropertiesGroup: FC<TProps> = ({
  title, // This has to be the title of the group
  children,
  isHidden,
  categoryIndex,
}) => {
  const [isOpen, setIsOpen] = React.useState(isHidden); // Default value: false

  const handleClickMenu = () => {
    setIsOpen(!isOpen);
  };

  const iconCollapse = (!isOpen ? <CaretUpFilled /> : <CaretDownOutlined />);

  // [x] Allow some Component Group to be collapsed by default on open, Add a "Favorite" field
  return (
    <div className={`properties-group ${title === CATEGORIES.FAVORITE ? 'fav' : ''} properties-group--${categoryIndex}`}>
      <p className="properties-group__title" onClick={handleClickMenu}>
        {title}
        {title !== CATEGORIES.FAVORITE
          ? iconCollapse
          : null}
      </p>
      <div
        className={
          clsx(!isOpen ? 'properties-group__content' : 'properties-group__content hide')
        }
      >
        {children}
      </div>
    </div>
  );
};

export default PropertiesGroup;
