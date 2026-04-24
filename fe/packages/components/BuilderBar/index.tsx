import PropertiesGroup from '@packages/components/PropertiesGroup';
import {
  CATEGORIES,
  FIELD_NAME_AND_CATEGORIES,
  ICONS_FOR_BUILDER,
  IS_FIELD_AVAILABLE,
} from '@packages/utils/viewFields';
import { isViewMode } from '@packages/utils/viewMode';
import { Tooltip } from 'antd';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectModeView, selectSearchValue } from '~/redux/slices/FormSlice';
import BaseIcon from './BaseIcon';

import { useLanguage } from '../LanguageContext';
import './styles.scss';

interface BuilderBarProps {
  onAddField?: (fieldKey: string) => void;
}

export const BuilderBar: React.FC<BuilderBarProps> = ({ onAddField }) => {
  const modeView = useAppSelector(selectModeView);
  const searchKey = useAppSelector(selectSearchValue);
  const { translate } = useLanguage();
  // Filter field base on searchKey (optimized by useMemo)
  const cachedFilteredFields = useMemo(() => (
    ICONS_FOR_BUILDER.filter((item) => item.title.toLowerCase().includes(searchKey.toLowerCase()))
  ), [searchKey, modeView]);

  if (isViewMode(modeView)) return null;

  // [Helper Function] Get icon by category field
  const getIconByCategory = (category: string) => {
    const fieldName = FIELD_NAME_AND_CATEGORIES[category];

    return cachedFilteredFields.filter((item) => fieldName.includes(item.componentName));
  };

  // [Helper Function] Decide if field is available or not
  const isFieldAvailable = (item: any) => {
    const result = IS_FIELD_AVAILABLE[item.componentName];

    return result;
  };

  return (
    <div className="builder-bar">
      {Object.keys(FIELD_NAME_AND_CATEGORIES).map((categoryKey, categoryIndex) => (
        <PropertiesGroup
          title={translate(categoryKey as any)}
          key={categoryKey}
          isHidden={false}
          categoryIndex={categoryIndex}
        >
          <div
            className={
              clsx('builder-bar-wrapper', { fav: categoryKey === CATEGORIES.FAVORITE })
            }
          >
            {getIconByCategory(categoryKey).map((item, iconIndex) => (
              <Tooltip placement="topLeft" key={item.componentName} title={translate(item.title as any)}>
                <BaseIcon
                  {...item}
                  className={
                    clsx({ 'non-available': !isFieldAvailable(item) })
                  }
                  // Display tooltip if field is not available
                  tooltip={
                    !isFieldAvailable(item) ? 'under development state' : null
                  }
                  key={item.componentName}
                  onAddField={() => {
                    if (onAddField) {
                      onAddField(item.componentName);
                    }
                  }}
                  iconIndex={iconIndex}
                />
              </Tooltip>
            ))}
          </div>
        </PropertiesGroup>
      ))}
    </div>
  );
};
