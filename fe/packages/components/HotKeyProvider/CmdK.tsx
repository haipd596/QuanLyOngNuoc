import { useLanguage, type Translations } from '@packages/components/LanguageContext';
import { FIELD_NAME } from '@packages/constants/fields';
import { TEMPLATE_NAME } from '@packages/constants/template';
import { removeAccents } from '@packages/utils/common';
import { insertJsonBaseSchema } from '@packages/utils/insertJsonBaseSchema';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { FIELD_NAME_AND_CATEGORIES, FIELD_NAME_TO_ICON } from '@packages/utils/viewFields';
import { FC, useMemo } from 'react';
import {
  JsonStructure,
  JsonStructureItem,
} from 'react-cmdk';
import { useAppDispatch } from '~/redux/hooks';
import { addNewField, replaceFields } from '~/redux/slices';
import CMDK from '../CMDK';

const IconFC : React.FC<{ src: string }> = ({ src }) => {
  return (
    <img
      src={src}
      alt=""
      style={{
        width: 30,
        height: 30,
        // background: 'gray',
        padding: 5,
      }}
    />
  );
};

export const CmdKProvider = ({ children }: any) => {
  const { translateVNese, translateEN } = useLanguage();
  const dispatch = useAppDispatch();

  const addJsonElement = ({ id }: { id: string }) => {
    if (TEMPLATE_NAME[id]) {
      const baseSchema = insertJsonBaseSchema(id);

      dispatch(replaceFields(baseSchema.fields));

      return;
    }

    const fieldJson = insertJsonToSchema(id);
    dispatch(addNewField(fieldJson));
  };

  // #region CMDK Implementation
  const handleAddFieldToView = (FIELD_ID:keyof typeof FIELD_NAME): void => {
    const targetJSON = { id: FIELD_ID };

    addJsonElement(targetJSON);
  };

  const renderCMDKChildren = (key: keyof Translations) => {
    if (translateVNese(key) === translateEN(key)) {
      // If there's no translation, render the key instead
      return (
        <div className="cmdk-custom-item">
          <p className="code">{translateEN(key)}</p>
        </div>
      );
    }

    return (
      <div className="cmdk-custom-item">
        <p className="translation">
          {translateVNese(key)}
        </p>
        <p className="code">{translateEN(key)}</p>
      </div>
    );
  };

  const produceCMDKItem = (
    key: keyof Translations,
    customIcon?: FC | React.ReactNode | string,
  ): JsonStructureItem => {
    return {
      id: key,
      children: renderCMDKChildren(key),
      icon: customIcon as any || 'ArrowRightCircleIcon',
      keywords: [key, removeAccents(translateVNese(key)), translateVNese(key)],
      showType: false,
      onClick: () => {
        handleAddFieldToView(key as any);
      },
    };
  };

  const itemList: JsonStructure = useMemo(() => {
    return Object.keys(FIELD_NAME_AND_CATEGORIES).reduce((acc: any, categoryKey) => {
      // Remove Favourite Category
      if (categoryKey === 'FAVORITE_CAT') {
        return acc;
      }
      const FieldArray = FIELD_NAME_AND_CATEGORIES[categoryKey];

      acc.push({
        id: categoryKey,
        heading: categoryKey,
        items: FieldArray.map((item) => {
          return produceCMDKItem(
            item,
            item ? () => <IconFC src={FIELD_NAME_TO_ICON[item]} /> : undefined,
          );
        }),
      });

      return acc;
    }, []);
  }, []);

  // #endregion

  return (
    <>
      <CMDK itemList={itemList} />
      {children}
    </>
  );
};
